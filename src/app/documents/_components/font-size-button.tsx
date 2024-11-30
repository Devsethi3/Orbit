import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor
        ?.chain()
        .focus()
        .setFontSize({ size: `${size}px` })
        .run();

      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <>
      <div className="flex items-center gap-x.0.5">
        <button
          onClick={decrement}
          className="h-7 w-7 rounded-sm shrink-0 flex items-center flex-col justify-center hover:bg-neutral-200/80"
        >
          <MinusIcon className="size-4" />
        </button>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setFontSize(currentFontSize);
            }}
            className="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent cursor-text"
          >
            {currentFontSize}
          </button>
        )}
        <button
          onClick={increment}
          className="h-7 w-7 rounded-sm shrink-0 flex items-center flex-col justify-center hover:bg-neutral-200/80"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>
    </>
  );
};

export default FontSizeButton;
