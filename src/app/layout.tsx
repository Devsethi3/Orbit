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
  title: "Orbit - Build Better Products with Developer Tools & Resources",
  description:
    "Access comprehensive documentation, interactive tutorials, and developer tools to build scalable products with Orbit's powerful platform. Get started with our extensive guides and resources.",
  keywords:
    "Orbit platform, developer tools, documentation, product development, developer resources, technical guides",

  openGraph: {
    title: "Orbit - Build Better Products with Developer Tools & Resources",
    description:
      "Access comprehensive documentation, interactive tutorials, and developer tools to build scalable products with Orbit's powerful platform.",
    type: "website",
    locale: "en_US",
    siteName: "Orbit",
    images: [
      {
        url: "/og-image.png", // place image in public folder
        width: 1200,
        height: 630,
        alt: "Orbit Developer Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orbit - Build Better Products with Developer Tools & Resources",
    description:
      "Access comprehensive documentation, interactive tutorials, and developer tools to build scalable products with Orbit's powerful platform.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
