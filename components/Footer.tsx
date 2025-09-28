"use client";

import Link from "next/link";
import {
  HiCode,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiArrowUp,
  HiHeart,
  HiClock,
  HiSparkles,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/tahsinatanvin",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com/in/tahsina-tanvin",
    },
    {
      name: "Email",
      icon: HiMail,
      href: "mailto:tahsinatanvin274@gmail.com",
    },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-[#B1AB86]/20 border-t overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#B1AB86]/5 via-transparent to-[#B1AB86]/5 opacity-20"></div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center bg-gradient-to-r from-[#B1AB86] to-[#9C9675] text-[#1a1a1a] p-4 rounded-full shadow-xl transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        } hover:scale-110`}
        aria-label="Back to top"
      >
        <HiArrowUp className="w-5 h-5" />
      </button>

      <div className="relative gap-10 grid grid-cols-1 md:grid-cols-3 mx-auto px-6 py-16 max-w-7xl">
        <div>
          <Link
            href="/"
            className="group flex items-center gap-3 mb-6 font-bold text-xl"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#B1AB86] opacity-20 group-hover:opacity-40 blur-lg rounded-full transition-all"></div>
              <HiCode className="relative w-8 h-8 text-[#B1AB86] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="bg-clip-text bg-gradient-to-r from-[#D7D7D7] via-[#B1AB86] to-[#D7D7D7] text-transparent text-2xl animate-gradient">
              TT Innovations
            </span>
            <HiSparkles className="opacity-0 group-hover:opacity-100 w-4 h-4 text-[#B1AB86] rotate-12 transition-all duration-500" />
          </Link>
          <p className="text-[#D7D7D7]/70 text-sm leading-relaxed">
            Crafting scalable and innovative web experiences with passion and precision.
          </p>
          <div className="flex gap-3 mt-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-[#1a1a1a] border border-[#B1AB86]/10 hover:border-[#B1AB86]/30 rounded-xl w-10 h-10 text-[#D7D7D7] hover:text-[#B1AB86] transition-all duration-300"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-semibold text-[#B1AB86] text-lg">Quick Links</h3>
          <div className="gap-3 grid">
            {[
              { name: "Home", href: "/" },
              { name: "Projects", href: "/projects" },
              { name: "Blogs", href: "/blogs" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 text-[#D7D7D7]/70 hover:text-[#B1AB86] transition-colors"
              >
                <span className="bg-[#B1AB86] opacity-0 group-hover:opacity-100 rounded-full w-1.5 h-1.5 transition-opacity"></span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 font-semibold text-[#B1AB86] text-lg">Contact</h3>
          <div className="space-y-3 text-sm">
            <a
              href="mailto:tahsinatanvin274@gmail.com"
              className="flex items-center gap-2 text-[#D7D7D7]/70 hover:text-[#B1AB86] transition-colors"
            >
              <HiMail className="w-4 h-4" /> tahsinatanvin274@gmail.com
            </a>
            <a
              href="tel:+8801859702848"
              className="flex items-center gap-2 text-[#D7D7D7]/70 hover:text-[#B1AB86] transition-colors"
            >
              <HiPhone className="w-4 h-4" /> +8801859702848
            </a>
            <a
              href="https://maps.google.com/?q=Chattogram,Bangladesh"
              className="flex items-center gap-2 text-[#D7D7D7]/70 hover:text-[#B1AB86] transition-colors"
              target="_blank"
            >
              <HiLocationMarker className="w-4 h-4" /> Chattogram, Bangladesh
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-[#B1AB86]/20 border-t">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mx-auto px-6 py-6 max-w-7xl text-[#D7D7D7]/70 text-xs">
          <div className="flex items-center gap-1">
            © {currentYear} TT Innovations. Made with{" "}
            <HiHeart className="w-3 h-3 text-red-400 animate-pulse" />.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#B1AB86] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#B1AB86] transition">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2">
              <HiClock className="w-3 h-3" />
              <span>Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
