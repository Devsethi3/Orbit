"use client";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

interface NavigationProps {
  documentTitle: string;
}

export const Navigation = ({ documentTitle }: NavigationProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "w-full px-6 py-2 bg-background border-b",
        "flex items-center justify-between gap-x-4"
      )}
    >
      <div className="font-semibold text-xl">{documentTitle}</div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
