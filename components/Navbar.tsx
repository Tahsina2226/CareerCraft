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
  HiUser,
  HiLogout,
  HiLogin,
} from "react-icons/hi";

export default function Navbar(): JSX.Element {
  const { token, logout, user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className="top-0 right-0 left-0 z-50 fixed bg-white/95 shadow-2xl backdrop-blur-xl border-[#B1AB86]/20 border-b">
      <div className="absolute inset-0 overflow-hidden">
        <div className="-top-20 -left-20 absolute bg-[#B1AB86] opacity-5 rounded-full w-40 h-40 animate-float"></div>
        <div className="-right-20 -bottom-20 absolute bg-[#5D6D4B] opacity-5 rounded-full w-40 h-40 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="group relative flex items-center gap-3 font-bold text-[#1a1a1a] hover:text-[#B1AB86] text-xl transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-[#B1AB86] opacity-20 rounded-full transition-all duration-500 ${
                isHovered ? 'opacity-30 blur-lg scale-125' : 'blur-md'
              }`}></div>
              <div className="z-10 relative flex justify-center items-center bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] shadow-lg group-hover:shadow-xl rounded-xl w-10 h-10 group-hover:scale-110 transition-all duration-300">
                <HiCode className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="bg-300% bg-clip-text bg-gradient-to-r from-[#1a1a1a] via-[#B1AB86] to-[#1a1a1a] font-bold text-transparent text-lg leading-5 animate-gradient">
                TT Innovations
              </span>
              <span className="opacity-0 group-hover:opacity-100 font-normal text-[#7D8566] text-xs transition-opacity duration-300">
                Building Tomorrow Today
              </span>
            </div>
            <HiSparkles className={`w-4 h-4 text-[#B1AB86] transition-all duration-500 transform ${
              isHovered ? 'opacity-100 rotate-12 scale-110' : 'opacity-0'
            }`} />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-500 group overflow-hidden ${
                    isActive
                      ? "text-[#5D6D4B] bg-gradient-to-r from-[#B1AB86]/20 to-[#5D6D4B]/10 shadow-lg shadow-[#B1AB86]/15 border border-[#B1AB86]/30"
                      : "text-[#1a1a1a] hover:text-[#5D6D4B] hover:bg-[#B1AB86]/10 hover:shadow-md"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#B1AB86] to-[#5D6D4B] opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                    isActive ? 'opacity-10' : ''
                  }`}></div>
                  
                  {isActive && (
                    <div className="bottom-2 left-1/2 absolute bg-gradient-to-r from-[#B1AB86] to-[#5D6D4B] rounded-full w-6 h-1 -translate-x-1/2 transform"></div>
                  )}
                  
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive 
                        ? "scale-110 text-[#5D6D4B]" 
                        : "group-hover:scale-110 group-hover:text-[#5D6D4B]"
                    }`}
                  />
                  <span className="relative font-semibold text-sm">{item.label}</span>
                  
                  <div className="absolute inset-0 border-2 group-hover:border-[#B1AB86]/20 border-transparent rounded-2xl group-hover:scale-105 transition-all duration-300"></div>
                </Link>
              );
            })}

            <div className="flex items-center ml-2">
              {token ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-[#B1AB86]/10 to-[#5D6D4B]/5 px-4 py-2 border border-[#B1AB86]/20 rounded-2xl">
                    <div className="flex justify-center items-center bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] shadow-lg rounded-full w-8 h-8 font-bold text-white text-sm">
                      <HiUser className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-[#5D6D4B] text-sm">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="group relative flex items-center gap-2 hover:bg-red-400/10 px-4 py-3 border border-transparent hover:border-red-400/20 rounded-2xl font-medium text-red-400 hover:text-red-500 transition-all duration-300"
                  >
                    <HiLogout className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group relative flex items-center gap-3 bg-gradient-to-r from-[#B1AB86] hover:from-[#9c946d] to-[#5D6D4B] hover:to-[#4A5741] shadow-lg hover:shadow-xl px-6 py-3 rounded-2xl overflow-hidden font-semibold text-white hover:scale-105 transition-all duration-300 transform"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <HiLogin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">Login</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#B1AB86] to-[#5D6D4B] opacity-30 group-hover:opacity-50 blur-sm rounded-2xl transition-opacity duration-300"></div>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="group relative bg-[#B1AB86]/10 hover:bg-[#B1AB86]/20 p-3 border border-[#B1AB86]/20 rounded-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#B1AB86] to-[#5D6D4B] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
              {isOpen ? (
                <HiX className="z-10 relative w-6 h-6 text-[#5D6D4B]" />
              ) : (
                <HiMenu className="z-10 relative w-6 h-6 text-[#5D6D4B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 shadow-2xl backdrop-blur-xl border-[#B1AB86]/20 border-t">
          <div className="space-y-2 px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group border-2 ${
                    isActive
                      ? "text-[#5D6D4B] bg-gradient-to-r from-[#B1AB86]/20 to-[#5D6D4B]/10 border-[#B1AB86]/30 shadow-lg"
                      : "text-[#1a1a1a] hover:text-[#5D6D4B] border-transparent hover:border-[#B1AB86]/20 hover:bg-[#B1AB86]/10"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] text-white shadow-lg"
                      : "bg-[#B1AB86]/10 group-hover:bg-gradient-to-br group-hover:from-[#B1AB86] group-hover:to-[#5D6D4B] group-hover:text-white"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 font-semibold">{item.label}</span>
                  {isActive && (
                    <div className="bg-gradient-to-r from-[#B1AB86] to-[#5D6D4B] rounded-full w-2 h-2"></div>
                  )}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-[#B1AB86]/20 border-t">
              {token ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-gradient-to-r from-[#B1AB86]/10 to-[#5D6D4B]/5 px-4 py-3 border border-[#B1AB86]/20 rounded-2xl">
                    <div className="flex justify-center items-center bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] shadow-lg rounded-full w-10 h-10 text-white">
                      <HiUser className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#5D6D4B] text-sm">{user?.name || 'User'}</p>
                      <p className="text-[#7D8566] text-xs">{user?.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 hover:bg-red-400/10 px-4 py-4 border border-transparent hover:border-red-400/20 rounded-2xl w-full text-red-400 hover:text-red-500 transition-all duration-300"
                  >
                    <div className="bg-red-400/10 p-2 rounded-xl">
                      <HiLogout className="w-4 h-4" />
                    </div>
                    <span className="flex-1 font-semibold text-left">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-4 bg-gradient-to-r from-[#B1AB86] hover:from-[#9c946d] to-[#5D6D4B] hover:to-[#4A5741] shadow-lg hover:shadow-xl px-4 py-4 rounded-2xl w-full font-semibold text-white transition-all duration-300"
                >
                  <div className="bg-white/20 p-2 rounded-xl">
                    <HiLogin className="w-4 h-4" />
                  </div>
                  <span className="flex-1">Login to Account</span>
                  <HiSparkles className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </nav>
  );
}