"use client"

import "./globals.css";
import Header from "@/components/Header.jsx";
import { Rubik } from "next/font/google";
import React, { useRef } from 'react'
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { RefProvider } from "@/context/RefContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <RefProvider>
        <html lang="en" className={rubik.className} >
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </RefProvider>
    </Provider>
  )
}

export default RootLayout
