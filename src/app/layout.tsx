import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIA Academy",
  description:
    "Built for the final assignment of undergraduate degree in Information Technology and Computer Education",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className={poppins.className}>
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
