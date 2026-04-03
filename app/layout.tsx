import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Shared/Header/Header";
import { Footer } from "@/components/Shared/Footer/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Cycle App",
  description: "Shopping cycle manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`}>
      <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className="bg-background text-on-surface font-body antialiased min-h-screen">
        <Header title="Shopping List" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
