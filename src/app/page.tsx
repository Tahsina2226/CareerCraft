"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiMail,
  HiPhone,
  HiMap,
  HiAcademicCap,
  HiCode,
  HiArrowRight,
  HiDownload,
  HiChevronDown,
  HiStar,
  HiSparkles,
} from "react-icons/hi";
import FloatingBackground from "../../components/home/FloatingBackground";
import ScrollIndicator from "../../components/home/ScrollIndicator";
import StatsSection from "../../components/home/StatsSection";
import ProfessionalSnapshot from "../../components/home/ProfessionalSnapshot";
import CurrentlyLearning from "../../components/home/CurrentlyLearning";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const personalInfo = {
    name: "Tahsina Tanvin",
    title: "Computer Science & Engineering Student | Full Stack Developer",
    location: "Chattogram, Bangladesh",
    email: "tahsinatanvin274@gmail.com",
    phone: "+880 1859 702848",
    avatar: "/images/avatar.jpg",
    shortBio:
      "I am a motivated and detail-oriented Computer Science and Engineering student with a strong foundation in frontend and backend development, problem-solving, and teamwork.",
  };

  const quickSkills = [
    "React/TypeScript",
    "Node.js/Express",
    "Next.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Git/GitHub",
    "REST APIs",
  ];

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/TAHSINA TANVIN's Resume (1).pdf";
    link.download = "Tahsina_Tanvin_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`relative ${
        darkMode
          ? "bg-gradient-to-br from-[#2D3B24] via-[#3C4A33] to-[#4A5741]"
          : "bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885]"
      } pt-24 pb-16 min-h-screen transition-colors duration-500 overflow-hidden`}
    >
      <div
        className="z-0 fixed inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(93, 109, 75, 0.15), transparent 80%)`,
        }}
      />

      <FloatingBackground />
      <ScrollIndicator activeSection={activeSection} />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <section id="home" className="mb-24 text-center">
          <div
            className={`inline-block relative mb-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-[#5D6D4B]/20 to-[#B1AB86]/20 blur-3xl rounded-4xl"></div>
            <div className="group relative bg-gradient-to-br from-white/95 dark:from-[#2D3B24]/95 to-white/90 dark:to-[#3A4A2E]/95 shadow-2xl hover:shadow-3xl backdrop-blur-xl px-10 py-10 border-[#B1AB86]/40 border-2 dark:border-[#5D6D4B]/40 rounded-3xl hover:scale-[1.02] transition-all duration-500">
              <div className="top-4 right-4 absolute">
                <HiSparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>

              <div className="-top-3 left-8 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg px-4 py-1 rounded-full">
                <span className="font-bold text-white text-xs tracking-wide">
                  AVAILABLE FOR WORK
                </span>
              </div>

              <div className="top-0 left-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] dark:border-[#B8C4A9] border-t-2 border-l-2 rounded-tl-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="top-0 right-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] dark:border-[#B8C4A9] border-t-2 border-r-2 rounded-tr-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="bottom-0 left-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] dark:border-[#B8C4A9] border-b-2 border-l-2 rounded-bl-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="right-0 bottom-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] dark:border-[#B8C4A9] border-r-2 border-b-2 rounded-br-3xl w-8 h-8 transition-opacity duration-300"></div>

              <div className="flex lg:flex-row flex-col items-center gap-10">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] opacity-30 group-hover:opacity-50 blur-xl rounded-3xl transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] opacity-20 rounded-3xl group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="relative">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="z-10 relative shadow-2xl border-4 border-white dark:border-[#2D3B24] rounded-2xl w-36 h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="-right-2 -bottom-2 z-20 absolute bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg p-2 rounded-full">
                      <HiStar className="w-4 h-4 text-white" />
                    </div>
                    <div className="top-2 right-2 z-20 absolute bg-green-400 border-2 border-white dark:border-[#2D3B24] rounded-full w-4 h-4 animate-pulse"></div>
                  </div>
                </div>

                <div className="flex-1 lg:text-left text-center">
                  <div className="mb-6">
                    <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] dark:from-[#B8C4A9] via-[#6B7A55] dark:via-[#C8C2A5] to-[#7D8566] dark:to-[#D4D8C8] mb-3 font-bold text-transparent text-5xl lg:text-6xl leading-tight hover:scale-105 transition-transform duration-300">
                      {personalInfo.name}
                    </h1>
                    <div className="inline-block relative">
                      <p className="mb-4 font-light text-[#7D8566] dark:text-[#8A936D] text-xl lg:text-2xl">
                        {personalInfo.title}
                      </p>
                      <div className="bottom-0 left-0 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] w-0 group-hover:w-full h-0.5 transition-all duration-500"></div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-r from-[#F8F7F0] dark:from-[#2D3B24]/50 to-[#F0EEE0] dark:to-[#3A4A2E]/50 mb-8 p-6 border border-[#B1AB86]/30 dark:border-[#5D6D4B]/30 rounded-2xl">
                    <div className="top-1/2 -left-2 absolute bg-gradient-to-b from-[#5D6D4B] to-[#B1AB86] rounded-full w-1 h-16 -translate-y-1/2 transform"></div>
                    <p className="font-medium text-[#5D6D4B] dark:text-[#B8C4A9] text-lg leading-relaxed">
                      {personalInfo.shortBio}
                    </p>
                  </div>

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-8">
                    <div className="group flex justify-center items-center gap-3 bg-white/80 dark:bg-[#2D3B24]/80 hover:shadow-lg backdrop-blur-sm px-5 py-3 border-[#B1AB86]/30 border-2 rounded-2xl hover:scale-105 transition-all duration-300">
                      <HiMap className="w-5 h-5 text-[#5D6D4B] dark:text-[#B8C4A9] group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium text-[#7D8566] dark:text-[#8A936D]">
                        {personalInfo.location}
                      </span>
                    </div>
                    <div className="group flex justify-center items-center gap-3 bg-white/80 dark:bg-[#2D3B24]/80 hover:shadow-lg backdrop-blur-sm px-5 py-3 border-[#B1AB86]/30 border-2 rounded-2xl hover:scale-105 transition-all duration-300">
                      <HiMail className="w-5 h-5 text-[#5D6D4B] dark:text-[#B8C4A9] group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium text-[#7D8566] dark:text-[#8A936D]">
                        {personalInfo.email}
                      </span>
                    </div>
                    <div className="group flex justify-center items-center gap-3 bg-white/80 dark:bg-[#2D3B24]/80 hover:shadow-lg backdrop-blur-sm px-5 py-3 border-[#B1AB86]/30 border-2 rounded-2xl hover:scale-105 transition-all duration-300">
                      <HiPhone className="w-5 h-5 text-[#5D6D4B] dark:text-[#B8C4A9] group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium text-[#7D8566] dark:text-[#8A936D]">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {quickSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="group relative bg-gradient-to-r from-[#5D6D4B]/10 hover:from-[#5D6D4B]/20 dark:from-[#5D6D4B]/20 to-[#B1AB86]/10 hover:to-[#B1AB86]/20 dark:to-[#B1AB86]/20 hover:shadow-lg px-4 py-2 border border-[#B1AB86]/40 dark:border-[#5D6D4B]/40 rounded-full font-semibold text-[#5D6D4B] dark:text-[#B8C4A9] text-sm hover:scale-105 transition-all duration-300 cursor-default transform"
                      >
                        {skill}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] opacity-0 group-hover:opacity-5 rounded-full transition-opacity duration-300"></div>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-6 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/projects"
              className="group relative flex items-center gap-4 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#6B7A55] hover:to-[#5D6D4B] shadow-xl hover:shadow-2xl px-10 py-5 rounded-2xl overflow-hidden font-bold text-white hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 -skew-x-12 transition-transform -translate-x-full group-hover:translate-x-full duration-1000 transform"></div>
              <HiCode className="z-10 w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
              <span className="z-10 text-lg">View My Projects</span>
              <HiArrowRight className="z-10 w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" />
            </Link>

            <Link
              href="/about"
              className="group relative flex items-center gap-4 bg-white/90 hover:bg-white dark:bg-[#2D3B24]/90 dark:hover:bg-[#2D3B24] shadow-xl hover:shadow-2xl px-10 py-5 border-[#B1AB86]/40 border-2 dark:border-[#5D6D4B]/40 rounded-2xl font-bold text-[#5D6D4B] dark:text-[#B8C4A9] hover:scale-105 transition-all duration-300"
            >
              <HiAcademicCap className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">My Journey</span>
            </Link>

            <button
              onClick={handleDownloadResume}
              className="group relative flex items-center gap-4 bg-gradient-to-r from-[#B1AB86] hover:from-[#9C966F] to-[#C8C2A5] hover:to-[#B1AB86] shadow-xl hover:shadow-2xl px-10 py-5 rounded-2xl font-bold text-[#5D6D4B] dark:text-[#2D3B24] hover:scale-105 transition-all duration-300"
            >
              <HiDownload className="w-6 h-6 group-hover:scale-110 transition-transform group-hover:-translate-y-1 duration-300" />
              <span className="text-lg">Download Resume</span>
            </button>
          </div>

          <div className="mt-16 animate-bounce">
            <div className="inline-flex relative flex-col items-center gap-2">
              <span className="font-semibold text-[#5D6D4B] dark:text-[#B8C4A9] text-sm">
                Explore More
              </span>
              <HiChevronDown className="w-7 h-7 text-[#5D6D4B] dark:text-[#B8C4A9]" />
            </div>
          </div>
        </section>

        <StatsSection isVisible={isVisible} />
        <ProfessionalSnapshot isVisible={isVisible} />
        <CurrentlyLearning isVisible={isVisible} />
      </div>
    </div>
  );
}
