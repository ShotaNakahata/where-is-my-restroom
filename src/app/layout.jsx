import "./globals.css";
import Header from "@/components/layout/Header.jsx";
import { Rubik } from "next/font/google";
import React from 'react'
import Footer from "@/components/layout/Footer";
import Providers from "@/providers/Providers";
// import { Provider } from "react-redux";
// import store from "@/redux/store";
// import { RefProvider } from "@/providers/RefContext";
// import AuthInitializer from "@/providers/AuthInitializer";
// import QueryProvider from "@/providers/QueryProvider";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Provider store={store}> */}
        {/* <RefProvider> */}
        {/* <AuthInitializer /> */}
        {/* <QueryProvider> */}
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        {/* </QueryProvider> */}
        {/* </RefProvider> */}
        {/* </Provider> */}
      </body>
    </html>
  );
}
