"use client";

import { HiSun, HiMoon } from "react-icons/hi";

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  activeSection: string;
}

export default function Navigation({
  darkMode,
  setDarkMode,
  activeSection,
}: NavigationProps) {
  return (
    <nav className="top-0 right-0 left-0 z-50 fixed bg-white/80 dark:bg-[#2D3B24]/80 backdrop-blur-md border-[#B1AB86]/30 border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-[#5D6D4B] dark:text-[#B8C4A9] text-xl">
            Tahsina.dev
          </div>
          <div className="flex items-center gap-6">
            {["home", "skills", "projects", "about"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`capitalize font-medium transition-all duration-300 ${
                  activeSection === item
                    ? "text-[#5D6D4B] dark:text-[#B8C4A9] scale-110"
                    : "text-[#7D8566] dark:text-[#8A936D] hover:text-[#5D6D4B] dark:hover:text-[#B8C4A9]"
                }`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-[#5D6D4B]/10 dark:bg-[#B8C4A9]/10 p-2 rounded-full text-[#5D6D4B] dark:text-[#B8C4A9] hover:scale-110 transition-transform duration-300"
            >
              {darkMode ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
