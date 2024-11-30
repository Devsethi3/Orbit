import React from "react";
import { BsCloudCheck } from "react-icons/bs";

const DocumentInput = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-lg px-1.5 cursor-pointer truncate">
          Untitled Document
        </span>
        <BsCloudCheck className="w-4 h-4" />
      </div>
    </>
  );
};

export default DocumentInput;
