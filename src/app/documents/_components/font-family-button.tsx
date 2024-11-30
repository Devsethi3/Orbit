import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <span className="truncate">
              {editor?.getAttributes("textStyle")?.fontFamily || "Arial"}
            </span>
            <ChevronDownIcon className="size-4 ml-2 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          className="p-1 flex flex-col gap-y-1"
        >
          {fonts.map(({ label, value }) => (
            <button
              key={value}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle")?.fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
              onClick={() => {
                editor?.chain().focus().setFontFamily(value).run();
              }}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FontFamilyButton;
