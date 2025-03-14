import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

function generateUserColor(name: string): string {
  const nameToNumber = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber % 360);
  return `hsl(${hue}, 80%, 60%)`;
}

export async function POST(request: NextRequest) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try { 
    const { room } = await request.json();
    if (!room) {
      return new Response("Room ID is required", { status: 400 });
    }

    // Get user display name, fallback to email or "Anonymous"
    const name =
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";

    // Create a session for
    const sessionId = `public-${Math.random().toString(36).slice(2)}`;
    const session = liveblocks.prepareSession(sessionId, {
    //   groupIds: [], // No 
      userInfo: {
        name,
        avatar: user.imageUrl,
        color: generateUserColor(name),
      },
    });

    // Add permission to access the room
    session.allow(room, session.FULL_ACCESS);

    // Authorize the session
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Error in Liveblocks authentication:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
