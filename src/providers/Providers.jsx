"use client"
import React from 'react'
import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import {RefProvider} from "@/providers/RefContext";
import AuthInitializer from "@/providers/AuthInitializer";
import { GoogleMapsProvider } from "@/providers/MapLoader";

export default function Providers({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <RefProvider>
          <GoogleMapsProvider> {/* ✅ `GoogleMapsProvider` を適用 */}
            <AuthInitializer />
            {children} {/* ✅ `children` には `server component` も含められる */}
          </GoogleMapsProvider>
        </RefProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}