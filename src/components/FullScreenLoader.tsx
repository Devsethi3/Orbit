import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  label?: string;
  classname?: string;
}

export const FullScreenLoader = ({
  label,
  classname,
}: FullScreenLoaderProps) => {
  return (
    <>
      <div
        className={cn(
          classname,
          "min-h-screen flex flex-col items-center justify-center gap-3"
        )}
      >
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
      </div>
    </>
  );
};
