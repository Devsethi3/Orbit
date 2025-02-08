"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Editor } from "@/app/documents/_components/editor";
import { Navigation } from "./navigation";
import { Room } from "@/app/documents/_components/room";

interface PublicDocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getPublicDocument>;
}

export const PublicDocument = ({ preloadedDocument }: PublicDocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  if (!document) {
    return null;
  }

  return (
    <Room isPublic>
      <div className="min-h-screen bg-[#fafbfd]">
        <Navigation documentTitle={document.title} />
        <div className="h-full flex-1 flex-col">
          <div className="max-w-[850px] mx-auto pb-40">
            <div className="h-full w-full">
              <Editor
                key={document.title}
                initialContent={document.content}
                editable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Room>
  );
};
