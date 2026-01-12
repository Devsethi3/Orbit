import { NextRequest } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { room, accessToken } = await req.json();

    if (!room || !accessToken) {
      return new Response("Missing room or accessToken", { status: 400 });
    }

    // Verify the public access token
    const document = await convex.query(api.documents.getByPublicToken, {
      accessToken,
    });

    if (!document) {
      return new Response("Invalid or expired access token", { status: 403 });
    }

    // Verify room matches document
    if (document._id !== room) {
      return new Response("Room mismatch", { status: 403 });
    }

    // Generate anonymous user ID
    const anonymousUserId = `anonymous_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Generate random color for anonymous user
    const colors = [
      "#E57373",
      "#F06292",
      "#BA68C8",
      "#9575CD",
      "#7986CB",
      "#64B5F6",
      "#4FC3F7",
      "#4DD0E1",
      "#4DB6AC",
      "#81C784",
      "#AED581",
      "#DCE775",
      "#FFF176",
      "#FFD54F",
      "#FFB74D",
      "#FF8A65",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create Liveblocks session for anonymous user
    const session = liveblocks.prepareSession(anonymousUserId, {
      userInfo: {
        name: "Anonymous Viewer",
        avatar: "",
        color,
      },
    });

    // Grant access based on document's public access level
    if (document.canEdit) {
      session.allow(room, session.FULL_ACCESS);
    } else {
      session.allow(room, session.READ_ACCESS);
    }

    const { body, status } = await session.authorize();

    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks public auth error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
