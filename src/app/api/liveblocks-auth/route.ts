import { NextRequest } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();

  // Fetch document
  let document;
  try {
    document = await convex.query(api.documents.getById, {
      id: room,
    });
  } catch (error) {
    console.error("Failed to fetch document:", error);
    return new Response("Document not found", { status: 404 });
  }

  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  // Check access permissions
  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === sessionClaims.org_id
  );

  // Check if document is shared with this user
  const userEmail = user.primaryEmailAddress?.emailAddress?.toLowerCase();
  const sharedAccess = document.sharedWith?.find(
    (share: { userId: string; email?: string; accessLevel: "view" | "edit" }) =>
      share.userId === user.id ||
      share.userId.toLowerCase() === userEmail ||
      share.email?.toLowerCase() === userEmail
  );

  const isSharedWithUser = !!sharedAccess;
  const isPublic = document.isPublic;

  // Determine if user has any access
  const hasAccess =
    isOwner || isOrganizationMember || isSharedWithUser || isPublic;

  if (!hasAccess) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Determine access level (full access vs read-only)
  let canEdit = false;

  if (isOwner || isOrganizationMember) {
    canEdit = true;
  } else if (sharedAccess) {
    canEdit = sharedAccess.accessLevel === "edit";
  } else if (isPublic) {
    canEdit = document.publicAccessLevel === "edit";
  }

  // Generate user color from name
  const name =
    user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
  const nameToNumber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber % 360);
  const color = `hsl(${hue}, 80%, 60%)`;

  // Create Liveblocks session
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });

  // Grant appropriate access level
  if (canEdit) {
    session.allow(room, session.FULL_ACCESS);
  } else {
    session.allow(room, session.READ_ACCESS);
  }

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
