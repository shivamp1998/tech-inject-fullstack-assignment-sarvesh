import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotistackProvider from "./components/NotistackProvider";
const inter = Inter({ subsets: ["latin"] });
import AuthGuard from "./components/AuthGuard";
export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Your Own Personal Recipe book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <html lang="en">
        <body className={inter.className}>
          <NotistackProvider>
            {children}
          </NotistackProvider>
        </body>
      </html>
    </AuthGuard>
  );
}
