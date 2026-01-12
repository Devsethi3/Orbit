"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { Id } from "../../../../../../../convex/_generated/dataModel";

interface PublicRoomProps {
  children: ReactNode;
  accessToken: string;
  documentId: Id<"documents">;
}

export function PublicRoom({
  children,
  accessToken,
  documentId,
}: PublicRoomProps) {
  // Use document ID as room ID for consistency
  const roomId = documentId;

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const response = await fetch("/api/liveblocks-public-auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room: roomId,
            accessToken,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }

        return response.json();
      }}
    >
      <RoomProvider
        id={roomId}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense fallback={<FullScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
