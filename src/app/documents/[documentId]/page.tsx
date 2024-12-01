import React from "react";
import { Editor } from "../_components/editor";
import Toolbar from "../_components/toolbar";
import Navbar from "../_components/navbar";
import { Room } from "../_components/room";

const DocumentIdPage = () => {
  return (
    <>
      <Room>
        <div className="min-h-screen bg-[#fafbfd]">
          <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 z-10 right-0 bg-[#fafbfd] print:hidden">
            <Navbar />
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

export default DocumentIdPage;
