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

export const PublicNavbar = ({ title, canEdit }: PublicNavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-3 py-2 border-b bg-background">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/" className="shrink-0">
          <Image src="/logo.svg" width={36} height={36} alt="logo" />
        </Link>

        <div className="flex flex-col min-w-0">
          <h1 className="text-sm sm:text-base font-semibold truncate max-w-[140px] sm:max-w-[260px]">
            {title}
          </h1>

          <div className="flex items-center gap-2">
            <Badge
              variant={canEdit ? "default" : "secondary"}
              className="text-[10px] sm:text-xs px-2 py-0.5"
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

            <span className="hidden sm:block text-xs text-muted-foreground">
              Shared document
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <Link href="/sign-in">
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            <LogIn className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Sign in for more features</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};
