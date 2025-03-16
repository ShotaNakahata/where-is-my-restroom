"use client"
import React from 'react'
import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import RefProvider from "@/providers/RefContext";
import AuthInitializer from "@/providers/AuthInitializer";


export default function Providers({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <RefProvider>
          <AuthInitializer /> 
          {children}
        </RefProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}