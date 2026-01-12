import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// Type for shared access that handles both old and new formats
type SharedAccess = {
  userId: string;
  email?: string;
  accessLevel: "view" | "edit";
  sharedAt?: number;
};

// Helper function to normalize shared access data
const normalizeSharedAccess = (share: SharedAccess) => ({
  userId: share.userId,
  email: share.email || share.userId, // Fallback to userId if email not present
  accessLevel: share.accessLevel,
  sharedAt: share.sharedAt || Date.now(),
});

// Helper function to check document access
const checkDocumentAccess = async (
  ctx: any,
  documentId: any,
  requiredLevel: "view" | "edit" = "view"
) => {
  const user = await ctx.auth.getUserIdentity();
  const document = await ctx.db.get(documentId);

  if (!document) {
    return { hasAccess: false, document: null, user, accessLevel: null };
  }

  // Check if user is owner
  if (user && document.ownerId === user.subject) {
    return { hasAccess: true, document, user, accessLevel: "owner" as const };
  }

  // Check organization access
  const organizationId = user?.organization_id as string | undefined;
  if (organizationId && document.organizationId === organizationId) {
    return {
      hasAccess: true,
      document,
      user,
      accessLevel: "organization" as const,
    };
  }

  // Check if shared with user (handle both old and new formats)
  if (user && document.sharedWith) {
    const sharedAccess = document.sharedWith.find(
      (share: SharedAccess) =>
        share.userId === user.subject ||
        share.email === user.email ||
        share.userId === user.email // For old format where userId was email
    );
    if (sharedAccess) {
      const hasRequiredAccess =
        requiredLevel === "view" || sharedAccess.accessLevel === "edit";
      return {
        hasAccess: hasRequiredAccess,
        document,
        user,
        accessLevel: sharedAccess.accessLevel,
      };
    }
  }

  // Check public access
  if (document.isPublic) {
    const hasRequiredAccess =
      requiredLevel === "view" || document.publicAccessLevel === "edit";
    return {
      hasAccess: hasRequiredAccess,
      document,
      user,
      accessLevel: document.publicAccessLevel || "view",
    };
  }

  return { hasAccess: false, document, user, accessLevel: null };
};

export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },
  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);

      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: "Deleted Document" });
      }
    }

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

// Get documents shared with the current user
export const getSharedWithMe = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const allDocs = await ctx.db.query("documents").collect();

    const sharedDocs = allDocs.filter((doc) => {
      if (!doc.sharedWith) return false;
      return doc.sharedWith.some(
        (share: SharedAccess) =>
          share.userId === user.subject ||
          share.email === user.email ||
          share.userId === user.email
      );
    });

    const startIndex = 0;
    const endIndex = paginationOpts.numItems;
    const paginatedDocs = sharedDocs.slice(startIndex, endIndex);

    return {
      page: paginatedDocs,
      isDone: endIndex >= sharedDocs.length,
      continueCursor: endIndex < sharedDocs.length ? String(endIndex) : null,
    };
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;

    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember)
      throw new ConvexError("Unauthorized");

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const { hasAccess } = await checkDocumentAccess(ctx, args.id, "edit");

    if (!hasAccess) throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const updateContent = mutation({
  args: { id: v.id("documents"), content: v.string() },
  handler: async (ctx, args) => {
    const { hasAccess } = await checkDocumentAccess(ctx, args.id, "edit");

    if (!hasAccess) throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.id, {
      initialContent: args.content,
    });
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);

    if (!document) throw new ConvexError("Document not found");

    const user = await ctx.auth.getUserIdentity();

    let accessLevel: "owner" | "edit" | "view" | null = null;
    let canEdit = false;

    if (user) {
      if (document.ownerId === user.subject) {
        accessLevel = "owner";
        canEdit = true;
      } else {
        const organizationId = user.organization_id as string | undefined;
        if (organizationId && document.organizationId === organizationId) {
          accessLevel = "edit";
          canEdit = true;
        } else if (document.sharedWith) {
          const sharedAccess = document.sharedWith.find(
            (share: SharedAccess) =>
              share.userId === user.subject ||
              share.email === user.email ||
              share.userId === user.email
          );
          if (sharedAccess) {
            accessLevel = sharedAccess.accessLevel;
            canEdit = sharedAccess.accessLevel === "edit";
          }
        }
      }
    }

    if (!accessLevel && document.isPublic) {
      accessLevel = document.publicAccessLevel || "view";
      canEdit = document.publicAccessLevel === "edit";
    }

    return {
      ...document,
      accessLevel,
      canEdit,
    };
  },
});

export const shareDocument = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    accessLevel: v.union(v.literal("view"), v.literal("edit")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can share this document");
    }

    const existingShares = (document.sharedWith || []).map(
      normalizeSharedAccess
    );

    const existingShareIndex = existingShares.findIndex(
      (share) => share.email.toLowerCase() === args.email.toLowerCase()
    );

    let updatedShares;
    if (existingShareIndex >= 0) {
      updatedShares = [...existingShares];
      updatedShares[existingShareIndex] = {
        userId: existingShares[existingShareIndex].userId,
        email: args.email.toLowerCase(),
        accessLevel: args.accessLevel,
        sharedAt: Date.now(),
      };
    } else {
      updatedShares = [
        ...existingShares,
        {
          userId: args.email.toLowerCase(),
          email: args.email.toLowerCase(),
          accessLevel: args.accessLevel,
          sharedAt: Date.now(),
        },
      ];
    }

    await ctx.db.patch(args.documentId, {
      sharedWith: updatedShares,
    });

    return { success: true };
  },
});

export const removeShare = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can modify sharing settings");
    }

    const existingShares = (document.sharedWith || []).map(
      normalizeSharedAccess
    );
    const updatedShares = existingShares.filter(
      (share) =>
        share.email?.toLowerCase() !== args.email.toLowerCase() &&
        share.userId.toLowerCase() !== args.email.toLowerCase()
    );

    await ctx.db.patch(args.documentId, {
      sharedWith: updatedShares,
    });

    return { success: true };
  },
});

export const updateShareAccess = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    accessLevel: v.union(v.literal("view"), v.literal("edit")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can modify sharing settings");
    }

    const existingShares = (document.sharedWith || []).map(
      normalizeSharedAccess
    );
    const updatedShares = existingShares.map((share) =>
      share.email?.toLowerCase() === args.email.toLowerCase() ||
      share.userId.toLowerCase() === args.email.toLowerCase()
        ? { ...share, accessLevel: args.accessLevel, sharedAt: Date.now() }
        : share
    );

    await ctx.db.patch(args.documentId, {
      sharedWith: updatedShares,
    });

    return { success: true };
  },
});

export const createPublicLink = mutation({
  args: {
    documentId: v.id("documents"),
    accessLevel: v.optional(v.union(v.literal("view"), v.literal("edit"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can create public links");
    }

    const publicAccessToken = `pub_${args.documentId}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

    await ctx.db.patch(args.documentId, {
      isPublic: true,
      publicAccessToken,
      publicAccessLevel: args.accessLevel || "view",
    });

    return { publicAccessToken };
  },
});

export const updatePublicAccess = mutation({
  args: {
    documentId: v.id("documents"),
    accessLevel: v.union(v.literal("view"), v.literal("edit")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can modify public access");
    }

    await ctx.db.patch(args.documentId, {
      publicAccessLevel: args.accessLevel,
    });

    return { success: true };
  },
});

export const removePublicLink = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    if (document.ownerId !== identity.subject) {
      throw new ConvexError("Only the owner can remove public links");
    }

    await ctx.db.patch(args.documentId, {
      isPublic: false,
      publicAccessToken: undefined,
      publicAccessLevel: undefined,
    });

    return { success: true };
  },
});

export const getByPublicToken = query({
  args: {
    accessToken: v.string(),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("publicAccessToken"), args.accessToken))
      .collect();

    const document = documents[0];

    if (!document || !document.isPublic) {
      return null;
    }

    return {
      _id: document._id,
      title: document.title,
      initialContent: document.initialContent,
      ownerId: document.ownerId,
      accessLevel: document.publicAccessLevel || "view",
      canEdit: document.publicAccessLevel === "edit",
      isPublic: true,
    };
  },
});

export const getDocumentShareInfo = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");

    // Check if user is owner
    const isOwner = document.ownerId === identity.subject;

    // Check if user is organization member
    const organizationId = (identity.organization_id ?? undefined) as
      | string
      | undefined;
    const isOrganizationMember = !!(
      organizationId && document.organizationId === organizationId
    );

    // Only owner or org members can view sharing settings
    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError(
        "Only the owner or organization members can view sharing settings"
      );
    }

    // Normalize shared data for consistent display
    const normalizedShares = (document.sharedWith || []).map((share: any) => ({
      userId: share.userId,
      email: share.email || share.userId,
      accessLevel: share.accessLevel,
      sharedAt: share.sharedAt || Date.now(),
    }));

    return {
      sharedWith: normalizedShares,
      isPublic: document.isPublic || false,
      publicAccessToken: document.publicAccessToken,
      publicAccessLevel: document.publicAccessLevel,
      isOwner, // Include this so UI can show/hide certain controls
      canManageSharing: isOwner, // Only owner can add/remove shares
    };
  },
});
