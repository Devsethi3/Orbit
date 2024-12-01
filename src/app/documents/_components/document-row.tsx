import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import DocumentMenu from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
  document: Doc<"documents">;
}
 
const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell className="w-[50px] py-3">
        <SiGoogledocs className="size-5 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium w-[45%] py-3">
        {document.title}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell py-3">
        <div className="flex items-center gap-2">
          {document.organizationId ? (
            <Building2Icon className="size-4" />
          ) : (
            <CircleUserIcon className="size-4" />
          )}
          {document.organizationId ? "Organization" : "Personal"}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell py-3">
        {format(new Date(document._creationTime), "MMM d, yyyy")}
      </TableCell>
      <TableCell className="text-right py-3">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
