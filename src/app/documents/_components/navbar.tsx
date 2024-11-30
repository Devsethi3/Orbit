import { MountainIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import DocumentInput from "./document-input";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <MountainIcon className="w-6 h-6 text-blue-500" />
          </Link>
          <div className="flex flex-col">
            {/* Document Input */}
            <DocumentInput />
            {/* MenuBar */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
