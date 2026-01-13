import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { headers } from "next/headers";
import type { Metadata } from "next";

import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingActions from "@/components/FloatingActions";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Trade Hub",
  description: "Trade Hub is a platform for trading and investing in the stock market.",
  keywords: ["trade", "invest", "stock", "market"],
  authors: [{ name: "Trade Hub", url: "https://tradehub.com" }],
  creator: "Trade Hub",
  publisher: "Trade Hub",
  openGraph: {
    title: "Trade Hub",
    description: "Trade Hub is a platform for trading and investing in the stock market.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Hub",
    description: "Trade Hub is a platform for trading and investing in the stock market.",
    images: ["https://tradehub.com/og-image.png"],
  },
  icons: {
    icon: "/logotradehub.png",
  },
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();
  
  // Get current pathname to check if it's a dashboard that should hide global layout
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isIsolatedDashboard =
    pathname.includes("/dashboard/admin") || pathname.includes("/dashboard/company");

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {!isIsolatedDashboard && <Header />}
          <main className={isIsolatedDashboard ? "" : "flex-1"}>
            {children}
          </main>
          {!isIsolatedDashboard && <Footer />}
          {!isIsolatedDashboard && <FloatingActions />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
