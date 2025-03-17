import "./globals.css";
import Header from "@/components/layout/Header.jsx";
import { Rubik } from "next/font/google";
import React from 'react'
import Footer from "@/components/layout/Footer";
import Providers from "@/providers/Providers";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
