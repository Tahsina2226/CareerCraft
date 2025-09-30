"use client";

import {
  HiSparkles,
  HiAcademicCap,
  HiChip,
  HiFire,
  HiMail,
} from "react-icons/hi";

interface AboutTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AboutTabs({ activeTab, setActiveTab }: AboutTabsProps) {
  const tabs = [
    { id: "story", label: "Professional Narrative", icon: HiSparkles },
    { id: "education", label: "Academic Credentials", icon: HiAcademicCap },
    { id: "skills", label: "Technical Competencies", icon: HiChip },
    { id: "timeline", label: "Career Trajectory", icon: HiFire },
    { id: "contact", label: "Professional Contact", icon: HiMail },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-md border-2 overflow-hidden ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#5D6D4B] to-[#6B7A55] text-white shadow-xl scale-105 border-transparent"
                : "bg-white/80 hover:bg-white text-[#5D6D4B] hover:shadow-lg border-[#B1AB86]/20"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <Icon
              className={`w-4 h-4 transition-transform duration-300 ${
                activeTab === tab.id
                  ? "group-hover:scale-110"
                  : "group-hover:scale-110 group-hover:text-[#6B7A55]"
              }`}
            />

            <span className="font-semibold text-sm tracking-tight whitespace-nowrap">
              {tab.label}
            </span>

            {activeTab === tab.id && (
              <div className="bottom-0 left-0 absolute bg-white/40 w-full h-0.5 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
