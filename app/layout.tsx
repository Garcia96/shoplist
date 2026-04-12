import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Shared/Header/Header";
import { Footer } from "@/components/Shared/Footer/Footer";
import { Toast } from "@/components/Shared/Toast/Toast";
import { Dialog } from "@/components/Shared/Dialog/Dialog";
import { MyYhemeProvider } from "@/components/theme-provider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "ShopList",
  description: "Shopping cycle manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} h-full antialiased`} suppressHydrationWarning>
      <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className="bg-background text-on-surface font-body antialiased min-h-screen">
        <MyYhemeProvider enableSystem attribute="class" defaultTheme="system">
          <Header />
          {children}
          <Footer />
          <Toast />
          <Dialog />
        </MyYhemeProvider>
      </body>
    </html>
  );
}
