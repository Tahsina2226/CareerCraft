"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../src/app/context/AuthContext";
import { usePathname } from "next/navigation";
import {
  HiMenu,
  HiX,
  HiHome,
  HiBookOpen,
  HiCode,
  HiTemplate,
  HiSparkles,
} from "react-icons/hi";

export default function Navbar(): JSX.Element {
  const { token, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActiveLink = (path: string) => pathname === path;

  const navItems = [
    { href: "/", label: "Home", icon: HiHome },
    { href: "/blogs", label: "Blogs", icon: HiBookOpen },
    { href: "/projects", label: "Projects", icon: HiCode },
    ...(token
      ? [{ href: "/dashboard", label: "Dashboard", icon: HiTemplate }]
      : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-xl border-b border-[#B1AB86]/20"
          : "bg-gradient-to-b from-[#0a0a0a] to-transparent backdrop-blur-lg"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#B1AB86]/5 via-transparent to-[#B1AB86]/5 opacity-50"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="group relative flex items-center gap-3 font-bold text-[#D7D7D7] hover:text-[#B1AB86] text-xl transition-all duration-500"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#B1AB86] opacity-20 group-hover:opacity-30 blur-md group-hover:blur-lg rounded-full transition-all duration-500"></div>
              <HiCode className="z-10 relative w-6 h-6 text-[#B1AB86] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="bg-300% bg-clip-text bg-gradient-to-r from-[#D7D7D7] via-[#B1AB86] to-[#D7D7D7] text-transparent animate-gradient">
              TT Innovations
            </span>
            <HiSparkles className="opacity-0 group-hover:opacity-100 w-4 h-4 text-[#B1AB86] group-hover:rotate-12 transition-all duration-500 transform" />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 group ${
                    isActive
                      ? "text-[#B1AB86] bg-[#B1AB86]/15 shadow-lg shadow-[#B1AB86]/10"
                      : "text-[#D7D7D7] hover:text-[#B1AB86] hover:bg-[#B1AB86]/10"
                  }`}
                >
                  {isActive && (
                    <div className="bottom-0 left-1/2 absolute bg-[#B1AB86] rounded-full w-1 h-1 -translate-x-1/2 transform"></div>
                  )}
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="relative font-medium">{item.label}</span>
                  {isActive && (
                    <div className="-z-10 absolute inset-0 bg-[#B1AB86]/5 blur-md rounded-xl"></div>
                  )}
                </Link>
              );
            })}

            {token ? (
              <button
                onClick={handleLogout}
                className="hover:bg-red-400/10 px-4 py-2 rounded-xl font-medium text-red-400 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#B1AB86] to-[#9C9675] px-4 py-2 rounded-xl font-semibold text-[#1a1a1a] transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="group relative bg-[#B1AB86]/10 hover:bg-[#B1AB86]/20 p-3 rounded-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#B1AB86]/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 transform"></div>
              {isOpen ? (
                <HiX className="z-10 relative w-6 h-6 text-[#D7D7D7]" />
              ) : (
                <HiMenu className="z-10 relative w-6 h-6 text-[#D7D7D7]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden space-y-2 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-xl px-4 py-4 border-[#B1AB86]/20 border-t">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "text-[#B1AB86] bg-[#B1AB86]/15 border-l-4 border-[#B1AB86]"
                    : "text-[#D7D7D7] hover:text-[#B1AB86] hover:bg-[#B1AB86]/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-2 pt-2 border-[#B1AB86]/20 border-t">
            {token ? (
              <button
                onClick={handleLogout}
                className="hover:bg-red-400/10 px-4 py-3 rounded-xl w-full font-medium text-red-400 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="bg-gradient-to-r from-[#B1AB86] to-[#9C9675] px-4 py-3 rounded-xl w-full font-semibold text-[#1a1a1a] transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
