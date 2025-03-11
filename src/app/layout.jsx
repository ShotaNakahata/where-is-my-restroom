"use client"

import "./globals.css";
import Header from "@/components/Header.jsx";
import { Rubik } from "next/font/google";
import React, { useRef } from 'react'
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/redux/store";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en" className={rubik.className} >
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  )
}

export default RootLayout
