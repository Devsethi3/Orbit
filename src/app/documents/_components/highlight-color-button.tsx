import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#ffff";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 rounded-sm shrink-0 flex items-center flex-col justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <HighlighterIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SketchPicker color={value} onChange={onChange} />
          {/* <CirclePicker
            color={value}
            onChange={onChange}
            colors={[
              "#FFD700", // yellow
              "#90EE90", // light green
              "#87CEEB", // sky blue
              "#FFB6C1", // light pink
              "#DDA0DD", // plum
              "#F0E68C", // khaki
            ]}
          /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HighlightColorButton;
