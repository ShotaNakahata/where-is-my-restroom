"use client";

import Hero from "./sections/Hero.jsx";
import How from "./sections/How.jsx";
import ToiletInfo from "./sections/ToiletInfo.jsx";
import WhoBenefits from "./sections/WhoBenefits.jsx";
import LoginSection from "@/app/sections/LoginSection.jsx";

export default function Home({loginRef}) {
  return (
    <main >
      <Hero/>
      <How/>
      <ToiletInfo/>
      <WhoBenefits/>
      <LoginSection  ref={loginRef}/>
    </main>
  );
}


