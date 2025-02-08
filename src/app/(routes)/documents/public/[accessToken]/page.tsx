import { preloadQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { PublicDocument } from "./_components/public-document";

interface PublicDocumentPageProps {
  params: {
    accessToken: string;
  };
}

const PublicDocumentPage = async ({ params }: PublicDocumentPageProps) => {
  const preloadedDocument = await preloadQuery(
    api.documents.getPublicDocument,
    { accessToken: params.accessToken }
  );

  if (!preloadedDocument) {
    notFound();
  }

  return <PublicDocument preloadedDocument={preloadedDocument} />;
};

export default PublicDocumentPage;
