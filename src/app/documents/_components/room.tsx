"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { getDocuments, getUser } from "@/lib/actions";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type UserInfo = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};

interface RoomProps {
  children: ReactNode;
  isPublic?: boolean;
}

export function Room({ children, isPublic = false }: RoomProps) {
  const params = useParams();
  const [users, setUsers] = useState<UserInfo[]>([]);

  const roomId = isPublic
    ? (params.accessToken as string)
    : (params.documentId as string);

  const fetchUsers = useMemo(
    () => async () => {
      if (isPublic) return; // Skip fetching users for public access

      try {
        const list = await getUser();
        setUsers(list);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.log(error);
      }
    },
    [isPublic]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        // For public access, use a simplified auth endpoint
        if (isPublic) {
          const endpoint = "/api/liveblocks-public-auth";
          const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({ room: roomId }),
          });
          return response.json();
        }

        // Regular auth flow
        const endpoint = "/api/liveblocks-auth";
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room: roomId }),
        });
        return response.json();
      }}
      resolveUsers={
        isPublic
          ? undefined
          : ({ userIds }) => {
              return userIds.map(
                (userId) =>
                  users.find((user) => user.id === userId) ?? undefined
              );
            }
      }
      resolveMentionSuggestions={
        isPublic
          ? undefined
          : ({ text }) => {
              let filterUsers = users;
              if (text) {
                filterUsers = users.filter((user) =>
                  user.name.toLowerCase().includes(text.toLowerCase())
                );
              }
              return filterUsers.map((user) => user.id);
            }
      }
      resolveRoomsInfo={
        isPublic
          ? undefined
          : async ({ roomIds }) => {
              const documents = await getDocuments(
                roomIds as Id<"documents">[]
              );
              return documents.map((document) => ({
                id: document.id,
                name: document.name,
              }));
            }
      }
    >
      <RoomProvider
        id={roomId}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
        initialPresence={isPublic ? {} : undefined}
      >
        <ClientSideSuspense fallback={<FullScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
