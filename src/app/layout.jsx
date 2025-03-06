import "./globals.css";
import Header from "@/components/Header.jsx";
import { Rubik } from "next/font/google";
import React from 'react'

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function RootLayout({children}) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}

export default RootLayout