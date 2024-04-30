import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";

import "./globals.css";
import "./reset.css";
import { Toaster } from "react-hot-toast";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "APAJAC - Sistema De Gerenciamento",
  description: "Sistema de gerenciamento da APAJAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={firaSans.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
