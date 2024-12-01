"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParam } from "@/hooks/use-search-param";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [search, setSearch] = useSearchParam();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
    setSearch("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[620px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search (ctrl+k)"
          className="pl-12 bg-secondary/50 rounded-full"
        />
        <Button
          variant="ghost"
          type="submit"
          size="icon"
          className="absolute left-1.5 top-1/2 rounded-full -translate-y-1/2 h-8 w-8"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            variant="ghost"
            type="button"
            size="icon"
            className="absolute right-1.5 top-1/2 rounded-full -translate-y-1/2 h-8 w-8"
          >
            <XIcon className="w-4 h-4 text-muted-foreground" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
