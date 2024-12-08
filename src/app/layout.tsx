import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextTopLoader />
          <Providers>
            <Toaster />
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
