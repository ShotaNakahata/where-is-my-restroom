"use client";
import React, { createContext, useRef, useContext } from "react";

const RefContext = createContext(null)

// Provider を作成
export const RefProvider = ({ children }) => {
  const loginRef = useRef(null)

  return (
    <RefContext.Provider value={{loginRef}}>
      {children}
    </RefContext.Provider>
  )
}

export const useRefContext = () => {
  return useContext(RefContext)
}