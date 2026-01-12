import { Metadata } from "next";
import { PublicDocument } from "./_components/public-document";

interface PublicDocumentPageProps {
  params: Promise<{ accessToken: string }>;
}

export async function generateMetadata({
  // params,
}: PublicDocumentPageProps): Promise<Metadata> {
  return {
    title: "Shared Document",
    description: "View shared document",
  };
}

export default async function PublicDocumentPage({
  params,
}: PublicDocumentPageProps) {
  const { accessToken } = await params;

  return <PublicDocument accessToken={accessToken} />;
}
