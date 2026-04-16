import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/src/components/Shared/Header/Header";
import { Footer } from "@/src/components/Shared/Footer/Footer";
import { Toast } from "@/src/components/Shared/Toast/Toast";
import { Dialog } from "@/src/components/Shared/Dialog/Dialog";
import { MyYhemeProvider } from "@/src/components/theme-provider";
import "./globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/src/i18n/routing";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "ShopList",
  description: "Shopping cycle manager",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return notFound();

  return (
    <html
      lang={locale}
      className={`${roboto.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className="bg-background text-on-surface font-body antialiased min-h-screen">
        <NextIntlClientProvider>
          <MyYhemeProvider enableSystem attribute="class" defaultTheme="system">
            <Header />
            {children}
            <Footer />
            <Toast />
            <Dialog />
          </MyYhemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
