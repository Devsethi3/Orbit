import { PaginationStatus } from "convex/react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentRow from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
        {documents === undefined ? (
          <div className="flex items-center justify-center h-24">
            <LoaderIcon className="animate-spin text-muted-foreground size-5" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-none">
                <TableHead>Name</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead className="hidden md:table-cell">Shared</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length === 0 ? (
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No documents found
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((document) => (
                  <DocumentRow key={document._id} document={document} />
                ))
              )}
            </TableBody>
          </Table>
        )}

        {documents && documents.length > 0 && (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadMore(5)}
              disabled={status === "Exhausted"}
              className="min-w-[100px]"
            >
              {status === "LoadingMore" && (
                <LoaderIcon className="size-4 animate-spin mr-2" />
              )}
              {status === "Exhausted" 
                ? "No more results" 
                : status === "LoadingMore"
                ? "Loading..."
                : "Load more"
              }
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsTable;
