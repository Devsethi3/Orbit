"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Check, Copy, Link as LinkIcon, Mail } from "lucide-react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  documentId: Id<"documents">;
}

export const ShareDialog = ({
  isOpen,
  onClose,
  documentId,
}: ShareDialogProps) => {
  const [emailInput, setEmailInput] = useState(() => {
    return localStorage.getItem("emailInput") || "";
  });

  const [publicLink, setPublicLink] = useState(() => {
    return localStorage.getItem(`publicLink-${documentId}`) || "";
  });

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shareDocument = useMutation(api.documents.shareDocument);
  const createPublicLink = useMutation(api.documents.createPublicLink);

  // Save email input to 
  useEffect(() => {
    localStorage.setItem("emailInput", emailInput);
  }, [emailInput]);

  // Save public link to localStorage whenever it changes
  useEffect(() => {
    if (publicLink) {
      localStorage.setItem(`publicLink-${documentId}`, publicLink);
    }
  }, [publicLink, documentId]);

  const handleShare = async (accessLevel: "view" | "edit") => {
    if (!emailInput) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      setIsLoading(true);
      await shareDocument({
        documentId,
        userId: emailInput,
        accessLevel,
      });
      toast.success(`Share ${accessLevel} access granted to ${emailInput}`);
      setEmailInput("");
    } catch (error) {
      toast.error("Failed to share document");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePublicLink = async () => {
    try {
      setIsLoading(true);
      const result = await createPublicLink({ documentId });
      const link = `${window.location.origin}/documents/public/${result.publicAccessToken}`;
      setPublicLink(link);
      toast.success("Public link created successfully");
    } catch (error) {
      toast.error("Failed to create public link");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm font-medium">Share with people</h3>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter email address"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleShare("view")}
                disabled={isLoading}
                className="flex-1"
              >
                View Access
              </Button>
              <Button
                onClick={() => handleShare("edit")}
                disabled={isLoading}
                className="flex-1"
              >
                Edit Access
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm font-medium">Public link</h3>
            </div>
            {publicLink ? (
              <div className="flex items-center space-x-2">
                <Input readOnly value={publicLink} className="flex-1" />
                <Button
                  size="icon"
                  onClick={handleCopyLink}
                  disabled={isLoading}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleCreatePublicLink}
                disabled={isLoading}
                className="w-full"
              >
                Create Public Link
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
