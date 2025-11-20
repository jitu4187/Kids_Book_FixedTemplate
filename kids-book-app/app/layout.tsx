import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WonderBook | Personalized kids books scaffold",
  description: "Full-stack starter for AI-assisted, tailor-made storybooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background text-foreground antialiased", geistSans.variable, geistMono.variable)}>
        <SiteHeader />
        <main className="container py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
