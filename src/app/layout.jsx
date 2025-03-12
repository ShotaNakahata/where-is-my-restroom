"use client"
import "./globals.css";
import Header from "@/components/layout/Header.jsx";
import { Rubik } from "next/font/google";
import React from 'react'
import Footer from "@/components/layout/Footer";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { RefProvider } from "@/context/RefContext";
import AuthInitializer from "@/components/providers/AuthInitializer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <RefProvider>
        <AuthInitializer />
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
