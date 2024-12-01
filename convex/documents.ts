import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

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

    // Search documents by title in the organization
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // Search documents by title in the personal space
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    // Search documents by organization
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // Search documents by owner
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

// 7:17

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;

    // Check if the document is in the user's organization
    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (!isOwner) throw new ConvexError("Unauthorized");

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);

    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});