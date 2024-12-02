"use client";

import { Editor } from "../_components/editor";
import Toolbar from "../_components/toolbar";
import Navbar from "../_components/navbar";
import { Room } from "../_components/room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <>
      <Room>
        <div className="min-h-screen bg-[#fafbfd]">
          <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 z-10 right-0 bg-[#fafbfd] print:hidden">
            <Navbar data={document} />
            <Toolbar />
          </div>
          <div className="pt-[114px] print:pt-0">
            <Editor />
          </div>
        </div>
      </Room>
    </>
  );
};
