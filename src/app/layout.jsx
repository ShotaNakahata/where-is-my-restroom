import "./globals.css";
import Header from "@/components/Header.jsx";

import React from 'react'

function RootLayout({children}) {
  return (
    <html>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}

export default RootLayout