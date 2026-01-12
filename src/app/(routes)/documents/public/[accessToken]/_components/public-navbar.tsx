"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, LogIn } from "lucide-react";

interface PublicNavbarProps {
  title: string;
  canEdit: boolean;
  accessLevel: string;
}

export const PublicNavbar = ({
  title,
  canEdit,
  // accessLevel,
}: PublicNavbarProps) => {
  return (
    <nav className="flex items-center justify-between py-2">
      <div className="flex gap-3 items-center">
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold truncate max-w-[300px]">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge
              variant={canEdit ? "default" : "secondary"}
              className="text-xs"
            >
              {canEdit ? (
                <>
                  <Edit className="h-3 w-3 mr-1" />
                  Can Edit
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  View Only
                </>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Shared document
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/sign-in">
          <Button variant="outline" size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Sign in for more features
          </Button>
        </Link>
      </div>
    </nav>
  );
};
