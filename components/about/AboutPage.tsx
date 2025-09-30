"use client";

import { useState, useEffect } from "react";
import AboutHeader from "./AboutHeader";
import AboutTabs from "./AboutTabs";
import AboutContent from "./AboutContent";
import AboutBackground from "./AboutBackground";
import SkillsContent from "./SkillsContent";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885] pt-20 pb-12 min-h-screen overflow-hidden">
      <AboutBackground scrollProgress={scrollProgress} />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <AboutHeader isVisible={isVisible} />
        <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <AboutContent activeTab={activeTab} SkillsContent={SkillsContent} />
      </div>
    </div>
  );
}