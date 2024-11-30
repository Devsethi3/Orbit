import React from "react";
import { Editor } from "../_components/editor";
import Toolbar from "../_components/toolbar";

const DocumentIdPage = () => {
  return (
    <>
      <div className="min-h-screen bg-[#f9fbfd]">
        <Toolbar />
        <Editor />
      </div>
    </>
  );
};

export default DocumentIdPage;
