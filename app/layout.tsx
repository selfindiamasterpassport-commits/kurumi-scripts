import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kurumi Script Store",
    template: "%s | Kurumi Script Store",
  },
  description:
    "Premium Roblox scripts — browse curated scripts by category, tags, and free or paid access. Featuring live search from ScriptBlox & RScripts, executors, and a Lua obfuscator.",
  keywords: ["roblox", "scripts", "dark alliance", "executor", "lua", "obfuscator"],
  authors: [{ name: "Kurumi" }],
  creator: "Kurumi",
  metadataBase: new URL("https://das-vert.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "Kurumi Script Store",
    title: "Kurumi Script Store",
    description: "Premium Roblox scripts — browse, search, and discover curated scripts.",
    url: "https://das-vert.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurumi Script Store",
    description: "Premium Roblox scripts — browse, search, and discover curated scripts.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kurumi Script Store",
  url: "https://das-vert.vercel.app",
  description: "Premium Roblox scripts — browse, search, and discover curated scripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-alliance-black font-body min-h-screen flex flex-col">
        <div className="fixed inset-0 bg-gradient-to-b from-alliance-red/[0.06] via-transparent to-alliance-crimson/[0.04] pointer-events-none" />
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center opacity-[0.07] blur-2xl pointer-events-none"
          style={{ backgroundImage: "url('/kurumi-hero.jpg')" }}
          aria-hidden="true"
        />
        <Header />
        <div
          className="pointer-events-none fixed bottom-4 right-4 z-40 hidden h-40 w-40 animate-float opacity-80 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] md:block"
          aria-hidden="true"
        >
          <img
            src="/kurumi-chibi.png"
            alt=""
            className="h-full w-full rounded-full object-cover ring-2 ring-alliance-red/60"
          />
        </div>
        <main className="relative flex-1">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </body>
    </html>
  );
}
