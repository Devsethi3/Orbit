"use client";

import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense
      fallback={
        <div className="flex items-center">
          <div className="flex mr-4">
            <div className="flex">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                  className="animate-pulse -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-200"
                />
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="h-6" />
        </div>
      }
    >
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar
              src={currentUser.info.avatar}
              name={`${currentUser.info.name} (You)`}
            />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => {

            return (
              <Avatar key={connectionId} src={info.avatar} name={info.name} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <>
      <div
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
        className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.3 z-10 bg-black whitespace-nowrap">
          {name}
        </div>
        <img src={src} alt={name} className="rounded-full size-full" />
      </div>
    </>
  );
};

export default Avatar;
