import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RouteTransitionController } from "@/components/route-transition-controller";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cindral.org"),
  title: {
    default: "Cindral",
    template: "%s | Cindral",
  },
  description:
    "Cindral builds precise digital presence, communication assets, and useful systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <RouteTransitionController />
        {children}
      </body>
    </html>
  );
}
