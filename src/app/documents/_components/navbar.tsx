import { FileIcon, MountainIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import DocumentInput from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

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
            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <FileIcon className="w-4 h-4 mr-2" />
                      <span>Save</span>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
