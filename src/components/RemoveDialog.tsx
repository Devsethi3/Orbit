"use client";

import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);

    if (!documentId) {
      toast.error("Invalid document ID!");
      setIsRemoving(false);
      return;
    }

    try {
      await remove({ id: documentId });
      toast.success("Document deleted!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } catch (error) {
      // Type guard
      if (error && typeof error === "object" && "message" in error) {
        const errorMessage = (error as { message: string }).message;
        if (errorMessage.includes("Document not found")) {
          toast.error("Document not found. It may have already been deleted.");
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={isRemoving} onClick={handleDelete}>
              {isRemoving ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveDialog;
