import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Aniket Ramdas Dange — Full Stack Engineer & AI Builder",
  description:
    "I build digital products people remember. Premium Full Stack Engineer specializing in React, Next.js, AI integration, and high-performance web applications. Available for freelance & full-time opportunities.",
  keywords: [
    "Full Stack Engineer", "React Developer", "Next.js", "AI Builder",
    "Creative Technologist", "Freelance Developer", "TypeScript", "Node.js",
    "Aniket Dange", "Portfolio",
  ],
  authors: [{ name: "Aniket Ramdas Dange" }],
  creator: "Aniket Ramdas Dange",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aniketdange.dev",
    title: "Aniket Ramdas Dange — Full Stack Engineer & AI Builder",
    description: "I build digital products people remember.",
    siteName: "Aniket Ramdas Dange",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniket Ramdas Dange — Full Stack Engineer & AI Builder",
    description: "I build digital products people remember.",
    creator: "@aniketdange3",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#06060A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
