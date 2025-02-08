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
import { useMutation, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { ShareDialog } from "@/components/ShareDialog";
import { Doc } from "../../../../convex/_generated/dataModel";

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

interface ToolbarProps {
  data: Doc<"documents">;
}

const Toolbar = ({ data }: ToolbarProps) => {
  const { editor } = useEditorStore();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const shareDocument = useMutation(api.documents.shareDocument);

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
        <Button onClick={() => setShowShareDialog(true)}>Share</Button>
      </div>
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        documentId={data._id}
      />
    </div>
  );
};

export default Toolbar;
