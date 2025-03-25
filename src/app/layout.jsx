// app/layout.jsx
import "./globals.css";
import Header from "@/components/layout/Header.jsx";
import { Rubik } from "next/font/google";
import React from "react";
import Footer from "@/components/layout/Footer";
import Providers from "@/providers/Providers";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Where Is My Restroom",
  description:
    "Find, post, and rate restrooms around you. A web app for accessible toilet information.",
  icons: {
    icon: "/logo.ico", //🔴後に変更
    apple: "/logo.webp",//🔴後に変更
  },
  twitter: {
    card: "summary_large_image",//🔴後に変更
    title: "Where Is My Restroom",//🔴後に変更
    description:
      "Find, rate, and share accessible restrooms anytime, anywhere.",
    images: ["/logo.webp"],//🔴後に変更
  },
  openGraph: {
    title: "Where Is My Restroom",
    description:
      "Helping everyone find accessible restrooms with ease. Designed for people with diverse needs.",
    url: "https://your-deployed-url.com",//🔴後に変更
    siteName: "Where Is My Restroom",
    images: [
      {
        url: "/logo.webp",//🔴後に変更
        width: 1200,
        height: 630,
        alt: "Where Is My Restroom Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

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

