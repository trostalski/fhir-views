import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fhir Views",
  description: "Convert hierarchical FHIR data into a tabular format.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />{" "}
      </head>
      <body className={inter.className + " bg-main-bg"}>
        <TopBar />
        <main className="container h-screen w-screen mx-auto pt-10">
          {children}
        </main>
        <ToastContainer autoClose={3000} theme="light" />
      </body>
    </html>
  );
}
