import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 rounded-sm shrink-0 flex items-center flex-col justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <span className="text-xs">A</span>
            <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SketchPicker color={value} onChange={onChange} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TextColorButton;
