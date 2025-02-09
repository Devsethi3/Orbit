"use client";

import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  Underline,
  Undo2Icon,
} from "lucide-react";
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
import Image from "next/image";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import Inbox from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RenameDialog from "@/components/RenameDialog";
import RemoveDialog from "@/components/RemoveDialog";

interface NavbarProps {
  data: Doc<"documents">;
}

const Navbar = ({ data }: NavbarProps) => {
  const { editor } = useEditorStore();
  const mutation = useMutation(api.documents.create);
  const router = useRouter();

  const onNewDocument = () => {
    mutation({ title: "Untitled Document", initialContent: "" })
      .catch(() => toast.error("Failed to create new document!"))
      .then((id) => {
        toast.success("New document created!");
        router.push(`/documents/${id}`);
      });
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTMl = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <>
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/dashboard">
            <Image src="/logo.svg" width={50} height={50} alt="logo" />
          </Link>
          <div className="flex flex-col">
            <DocumentInput title={data.title} id={data._id} />
            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="w-4 h-4 mr-2" />
                        <span>Save</span>
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={onSaveJson}>
                          <FileJsonIcon className="size-4 mr-2" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTMl}>
                          <GlobeIcon className="size-4 mr-2" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()}>
                          <BsFilePdf className="size-4 mr-2" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveText}>
                          <FileTextIcon className="size-4 mr-2" />
                          Text
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={onNewDocument}>
                      <FilePlusIcon className="mr-2 size-4" />
                      New Document
                    </MenubarItem>
                    <MenubarSeparator />
                    <RenameDialog
                      documentId={data._id}
                      initialTitle={data.title}
                    >
                      <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <FilePenIcon className="size-4 mr-2" />
                        Rename
                      </MenubarItem>
                    </RenameDialog>
                    <RemoveDialog documentId={data._id}>
                      <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <TrashIcon className="size-4 mr-2" />
                        Remove
                      </MenubarItem>
                    </RemoveDialog>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <PrinterIcon className="size-4 mr-2" />
                      Print <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().undo().run()}
                    >
                      <Undo2Icon className="mr-2 size-4" />
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().redo().run()}
                    >
                      <Redo2Icon className="mr-2 size-4" />
                      Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Insert
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <TableIcon className="size-4 mr-2" />
                        <span>Table</span>
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 1, cols: 1 })}
                        >
                          1 x 1
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 2, cols: 2 })}
                        >
                          2 x 2
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 3, cols: 3 })}
                        >
                          3 x 3
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 4, cols: 4 })}
                        >
                          4 x 4
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 5, cols: 5 })}
                        >
                          5 x 5
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Format
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <TextIcon className="size-4 mr-2" />
                        <span>Text</span>
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        >
                          <BoldIcon className="size-4 mr-2" />
                          Bold <MenubarShortcut>⌘B</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <ItalicIcon className="size-4 mr-2" />
                          Italic <MenubarShortcut>⌘I</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        >
                          <Underline className="size-4 mr-2" />
                          Underline <MenubarShortcut>⌘U</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        >
                          <StrikethroughIcon className="size-4 mr-2" />
                          Strikethrough&nbsp;&nbsp;&nbsp;{" "}
                          <MenubarShortcut>⌘S</MenubarShortcut>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
                      <RemoveFormattingIcon className="mr-2 size-4" />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Avatars />
          <Inbox />
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/dashboard"
            afterLeaveOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
            afterSelectPersonalUrl="/dashboard"
            appearance={{
              elements: {
                organizationSwitcherPopoverFooter: "hidden"
              }
            }}
          />
          <UserButton appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8",
              userButtonPopoverFooter: "hidden"
            }
          }} afterSignOutUrl="/" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
