import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Elite — Full‑Stack Developer",
  description: "Laravel • Next.js • Expo | Building fast, modern products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} page-gradient min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
