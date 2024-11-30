import { useEditorStore } from "@/store/use-editor-store";
import React, { useState, ChangeEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    if (href && !href.startsWith('http://') && !href.startsWith('https://')) {
      href = `https://${href}`;
    }
    
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(value);
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 rounded-sm shrink-0 flex items-center flex-col justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2.5">
        <Input
          type="url"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().unsetLink().run()}
        >
          Remove
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkButton;
