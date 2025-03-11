"use client";
import React, { useRef } from "react";
import Hero from "../components/sections/Hero.jsx";
import How from "../components/sections/How.jsx";
import ToiletInfo from "../components/sections/ToiletInfo.jsx";
import WhoBenefits from "../components/sections/WhoBenefits.jsx";
import LoginSection from "@/components/sections/LoginSection.jsx";

export default function Home() {
  const loginRef = useRef(null); 
  return (
    <main>
      <Hero />
      <How />
      <ToiletInfo />
      <WhoBenefits />
      <LoginSection  /> 
    </main>
  );
}

