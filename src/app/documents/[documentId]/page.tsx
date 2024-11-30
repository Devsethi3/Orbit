import React from "react";
import { Editor } from "../_components/editor";
import Toolbar from "../_components/toolbar";
import Navbar from "../_components/navbar";

const DocumentIdPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9fbfd]">
        <Toolbar />
        <Editor />
      </div>
    </>
  );
};

export default DocumentIdPage;
