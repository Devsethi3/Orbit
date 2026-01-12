"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import {
  Check,
  Copy,
  Mail,
  Trash2,
  Users,
  Globe,
  Eye,
  Edit,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  documentId: Id<"documents">;
  documentTitle?: string;
}

export const ShareDialog = ({
  isOpen,
  onClose,
  documentId,
  documentTitle = "Document",
}: ShareDialogProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [accessLevel, setAccessLevel] = useState<"view" | "edit">("view");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shareInfo = useQuery(api.documents.getDocumentShareInfo, {
    documentId,
  });

  const shareDocument = useMutation(api.documents.shareDocument);
  const removeShare = useMutation(api.documents.removeShare);
  const updateShareAccess = useMutation(api.documents.updateShareAccess);
  const createPublicLink = useMutation(api.documents.createPublicLink);
  const updatePublicAccess = useMutation(api.documents.updatePublicAccess);
  const removePublicLink = useMutation(api.documents.removePublicLink);

  const publicLink = shareInfo?.publicAccessToken
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/documents/public/${shareInfo.publicAccessToken}`
    : "";

  // Check if current user can manage sharing (only owner)
  const canManageSharing = shareInfo?.canManageSharing ?? false;

  const handleShare = async () => {
    if (!canManageSharing) {
      toast.error("Only the document owner can share this document");
      return;
    }

    if (!emailInput.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      await shareDocument({
        documentId,
        email: emailInput.trim(),
        accessLevel,
      });
      toast.success(`Shared with ${emailInput} (${accessLevel} access)`);
      setEmailInput("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to share document";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveShare = async (email: string) => {
    if (!canManageSharing) {
      toast.error("Only the document owner can modify sharing");
      return;
    }

    try {
      setIsLoading(true);
      await removeShare({ documentId, email });
      toast.success(`Removed access for ${email}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to remove share";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateShareAccess = async (
    email: string,
    newAccessLevel: "view" | "edit"
  ) => {
    if (!canManageSharing) {
      toast.error("Only the document owner can modify sharing");
      return;
    }

    try {
      await updateShareAccess({
        documentId,
        email,
        accessLevel: newAccessLevel,
      });
      toast.success(`Updated access level for ${email}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update access";

      toast.error(message);
    }
  };

  const handleTogglePublicLink = async () => {
    if (!canManageSharing) {
      toast.error("Only the document owner can manage public links");
      return;
    }

    try {
      setIsLoading(true);
      if (shareInfo?.isPublic) {
        await removePublicLink({ documentId });
        toast.success("Public link removed");
      } else {
        await createPublicLink({ documentId, accessLevel: "view" });
        toast.success("Public link created");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update public link";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePublicAccess = async (newAccessLevel: "view" | "edit") => {
    if (!canManageSharing) {
      toast.error("Only the document owner can modify public access");
      return;
    }

    try {
      await updatePublicAccess({
        documentId,
        accessLevel: newAccessLevel,
      });
      toast.success("Public access level updated");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update public access";

      toast.error(message);
    }
  };

  const handleCopyLink = async () => {
    if (!publicLink) return;

    try {
      await navigator.clipboard.writeText(publicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  if (!shareInfo) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Share &quot;{documentTitle}&quot;
          </DialogTitle>
          <DialogDescription>
            {canManageSharing
              ? "Invite people to view or edit this document"
              : "View sharing settings for this document"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Show info banner for non-owners */}
          {!canManageSharing && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You can view sharing settings, but only the document owner can
                modify them.
              </AlertDescription>
            </Alert>
          )}

          {/* Share with people section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Share with people</Label>
            </div>

            {canManageSharing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleShare()}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Select
                  value={accessLevel}
                  onValueChange={(value: "view" | "edit") =>
                    setAccessLevel(value)
                  }
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        View
                      </div>
                    </SelectItem>
                    <SelectItem value="edit">
                      <div className="flex items-center gap-2">
                        <Edit className="h-3 w-3" />
                        Edit
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleShare} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Share"
                  )}
                </Button>
              </div>
            )}

            {/* Shared users list */}
            {shareInfo.sharedWith && shareInfo.sharedWith.length > 0 ? (
              <ScrollArea className="max-h-40">
                <div className="space-y-2">
                  {shareInfo.sharedWith.map((share) => (
                    <div
                      key={share.email}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(share.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {share.email}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Shared{" "}
                            {new Date(share.sharedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {canManageSharing ? (
                          <>
                            <Select
                              value={share.accessLevel}
                              onValueChange={(value: "view" | "edit") =>
                                handleUpdateShareAccess(share.email, value)
                              }
                            >
                              <SelectTrigger className="w-24 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="view">View</SelectItem>
                                <SelectItem value="edit">Edit</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleRemoveShare(share.email)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        ) : (
                          <Badge variant="secondary">
                            {share.accessLevel === "edit"
                              ? "Can edit"
                              : "Can view"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                Not shared with anyone yet
              </p>
            )}
          </div>

          <Separator />

          {/* Public link section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Public link</Label>
                {shareInfo.isPublic && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
              {canManageSharing && (
                <Switch
                  checked={shareInfo.isPublic}
                  onCheckedChange={handleTogglePublicLink}
                  disabled={isLoading}
                />
              )}
            </div>

            {shareInfo.isPublic && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={publicLink}
                    className="flex-1 text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyLink}
                    disabled={isLoading}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Anyone with the link can:
                  </span>
                  {canManageSharing ? (
                    <Select
                      value={shareInfo.publicAccessLevel || "view"}
                      onValueChange={(value: "view" | "edit") =>
                        handleUpdatePublicAccess(value)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">
                          <div className="flex items-center gap-2">
                            <Eye className="h-3 w-3" />
                            View
                          </div>
                        </SelectItem>
                        <SelectItem value="edit">
                          <div className="flex items-center gap-2">
                            <Edit className="h-3 w-3" />
                            Edit
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="secondary">
                      {shareInfo.publicAccessLevel === "edit"
                        ? "Edit"
                        : "View only"}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {!shareInfo.isPublic && (
              <p className="text-sm text-muted-foreground">
                {canManageSharing
                  ? "Enable to create a shareable link that anyone can use to access this document."
                  : "Public sharing is not enabled for this document."}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
