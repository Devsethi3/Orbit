"use client";

import Header from "@/components/Header";
import TemplatesGallery from "@/components/TemplatesGallery";
import { usePaginatedQuery } from "convex/react";
import React, { Suspense } from "react";
import { api } from "../../../../convex/_generated/api";
import DocumentsTable from "@/app/documents/_components/documents-table";
import { useSearchParam } from "@/hooks/use-search-param";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const HomePageContent = () => {
  const { user } = useUser();
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto w-full px-6 mt-16">
        <div className="my-8">
          <h1 className="text-3xl font-bold">
            Hi, {user?.firstName || "there"} 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your first collaborative document with Orbit and experience
            seamless teamwork.
          </p>
        </div>
      </div>
      <div>
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
  );
};

const HomePage = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
      </div>
    }
  >
    <HomePageContent />
  </Suspense>
);

export default HomePage;
