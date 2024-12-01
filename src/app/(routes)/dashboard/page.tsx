"use client";

import Header from "@/components/Header";
import TemplatesGallery from "@/components/TemplatesGallery";
import { usePaginatedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import DocumentsTable from "@/app/documents/_components/documents-table";
import { useSearchParam } from "@/hooks/use-search-param";
import {  Loader2 } from "lucide-react";

const HomePage = () => {
  const [search] = useSearchParam();
  const [isLoading, setIsLoading] = React.useState(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  React.useEffect(() => {
    setIsLoading(status === "LoadingMore" || status === "LoadingFirstPage");
  }, [status]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="mt-16">
          <TemplatesGallery />
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <DocumentsTable
              documents={results}
              loadMore={loadMore}
              status={status}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
