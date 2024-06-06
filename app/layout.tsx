import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Task App",
  description: "Task app to keep track of your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main 
          className="flex flex-col items-center gap-8 
          bg-zinc-900
          "
          style={{
            paddingLeft: "5vw",
            paddingRight: "5vw",
            minHeight: "90vh",
            paddingTop: "15vh",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
