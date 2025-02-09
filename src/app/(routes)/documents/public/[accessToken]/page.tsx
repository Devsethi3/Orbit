import { preloadQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { PublicDocument } from "./_components/public-document";

interface PublicDocumentPageProps {
  params: Promise<{
    accessToken: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PublicDocumentPage = async ({ params }: PublicDocumentPageProps) => {
  const { accessToken } = await params;

  const preloadedDocument = await preloadQuery(
    api.documents.getPublicDocument,
    { accessToken }
  );

  if (!preloadedDocument) {
    notFound();
  }

  return <PublicDocument preloadedDocument={preloadedDocument} />;
};

export default PublicDocumentPage;
