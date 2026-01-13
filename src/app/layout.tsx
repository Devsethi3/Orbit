import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";

import "@liveblocks/react-tiptap/styles.css";
import "@liveblocks/react-ui/styles.css";
import "./globals.css";

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit | Real-Time Collaborative Documentation Platform",
  description:
    "Create, collaborate, and manage documentation in real time with Orbit. A modern workspace for teams to write, share, and organize knowledge with powerful developer-friendly tools.",

  keywords:
    "Orbit documentation platform, real-time collaboration, team workspace, collaborative editor, developer documentation, knowledge base, product documentation, live editing",

  openGraph: {
    title: "Orbit | Real-Time Collaborative Documentation Platform",
    description:
      "Create, collaborate, and manage documentation in real time with Orbit. A modern workspace for teams to write, share, and organize knowledge together.",
    type: "website",
    locale: "en_US",
    siteName: "Orbit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orbit Real-Time Collaboration Workspace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orbit - Real-Time Collaborative Documentation Platform",
    description:
      "A modern real-time collaborative workspace to write, share, and manage documentation with your team.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  authors: [{ name: "Orbit Team" }],
  category: "Productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </head>
      <body className={`${font.className} antialiased`}>
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
