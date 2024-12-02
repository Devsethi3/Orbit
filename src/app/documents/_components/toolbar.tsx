"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  LucideIcon,
  Redo2Icon,
  Undo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  SparklesIcon,
  Globe2Icon,
  Globe,
} from "lucide-react";
import FontFamilyButton from "./font-family-button";
import HeadingLevelButton from "./heading-level-button";
import TextColorButton from "./text-color-button";
import HighlightColorButton from "./highlight-color-button";
import LinkButton from "./link-button";
import ImageButton from "./image-button";
import AlignButton from "./align-button";
import ListButton from "./list-button";
import FontSizeButton from "./font-size-button";
import LineHeightButton from "./line-height-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TbWorld } from "react-icons/tb";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Input } from "@/components/ui/input";

interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  label: string;
}

const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive,
  label,
}: ToolbarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "text-sm h-7 min-w-7 items-center flex justify-center rounded-sm hover:bg-neutral-200/80",
              isActive && "bg-neutral-200/80"
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();
  const [isPublished, setIsPublished] = useState(false);
  const [copied, setIsCopied] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string>("");

  const handlePublish = () => {
    setIsPublished(true);
    console.log("Document published");
  };

  const handleUnpublish = () => {
    setIsPublished(false);
    console.log("Document unpublished");
  };

  const handleShare = () => {
    console.log("Document shared");
    // Implement share functionality here
  };

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
      [
        {
          label: "Undo",
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
        },
        {
          label: "Print",
          icon: PrinterIcon,
          onClick: () => window.print(),
        },
        {
          label: "Spell Check",
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck");
            editor?.view.dom.setAttribute(
              "spellcheck",
              current === "true" ? "false" : "true"
            );
          },
        },
      ],
      [
        {
          label: "Bold",
          icon: BoldIcon,
          isActive: editor?.isActive("bold"),
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: ItalicIcon,
          isActive: editor?.isActive("italic"),
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          label: "Underline",
          icon: UnderlineIcon,
          isActive: editor?.isActive("underline"),
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
      ],
      [
        {
          label: "Comment",
          icon: MessageSquarePlusIcon,
          onClick: () => {
            editor?.chain().focus().addPendingComment().run();
            console.log("Comment");
          },
          isActive: editor?.isActive("liveblocksCommentMarked"),
        },
        {
          label: "List Todo",
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive("taskList"),
        },
        {
          label: "Remove Formatting",
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
          isActive: false,
        },
      ],
    ];
  return (
    <div className="overflow-x-auto bg-[#f1f4f9] px-4 py-3 min-h-[40px] flex items-center gap-x-6 justify-between rounded-full">
      <div className="flex items-center gap-x-3">
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <FontSizeButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <LinkButton />
        <ImageButton />
        <AlignButton />
        <LineHeightButton />
        <ListButton />
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="mr-14 lg:mr-0">{isPublished ? "Published" : "Publish"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 lg:m-2 m-0 shadow-xl">
            <div className="flex items-center flex-col px-4 py-3">
              <TbWorld size={30} className="opacity-80" />
              <h3 className="text-xl font-bold text-center mt-2 opacity-80">
                {isPublished ? "Manage publication" : "Publish this note"}
              </h3>
              <p className="text-sm text-center mt-1">
                {isPublished
                  ? "Your note is live on the web"
                  : "Share your work with others"}
              </p>
              {isPublished ? (
                <div className="w-full mt-4 space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      value={`${window.location.origin}${publishedUrl}`}
                      readOnly
                      className="text-sm pr-12 bg-transparent border rounded-md"
                    />
                    <div
                      className="absolute inset-y-0 right-0 hover:bg-secondary rounded-r-md flex items-center px-3 cursor-pointer"
                      onClick={() => { }}
                    >
                      {copied ? (
                        <FiCheck className="h-5 w-5 text-green-500" />
                      ) : (
                        <FiCopy className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-2"
                    onClick={handleUnpublish}
                  >
                    Unpublish
                  </Button>
                </div>
              ) : (
                <Button onClick={handlePublish} className="w-full mt-4">
                  Publish
                </Button>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Toolbar;
