"use client";

import { useQuery } from "convex/react";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../../../../convex/_generated/api";
import { PublicRoom } from "./public-room";
import { PublicNavbar } from "./public-navbar";
import { Editor } from "@/app/documents/_components/editor";

interface PublicDocumentProps {
  accessToken: string;
}

export const PublicDocument = ({ accessToken }: PublicDocumentProps) => {
  const document = useQuery(api.documents.getByPublicToken, { accessToken });

  if (document === undefined) {
    return <FullScreenLoader />;
  }

  if (document === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Document Not Found
          </h1>
          <p className="text-gray-500 max-w-md">
            This document doesn&apos;t exist or the sharing link has expired. Please
            check the link or contact the document owner.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Image src="/logo.svg" width={24} height={24} alt="logo" />
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PublicRoom accessToken={accessToken} documentId={document._id}>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 z-10 right-0 bg-[#fafbfd] print:hidden">
          <PublicNavbar
            title={document.title}
            canEdit={document.canEdit}
            accessLevel={document.accessLevel}
          />
        </div>
        <div className="pt-[70px] print:pt-0">
          <Editor
            initialContent={document.initialContent}
            editable={document.canEdit}
          />
        </div>
      </div>
    </PublicRoom>
  );
};
