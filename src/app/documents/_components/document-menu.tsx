import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RemoveDialog from "@/components/RemoveDialog";
import RenameDialog from "@/components/RenameDialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onNewTab(documentId)}
        >
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in new tab
        </DropdownMenuItem>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer"
          >
            <Trash2Icon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            className="cursor-pointer"
          >
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
