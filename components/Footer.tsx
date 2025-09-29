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
  HiCursorClick,
  HiGlobe,
  HiShieldCheck,
  HiDocumentText,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaDiscord } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: FaGithub, 
      href: "https://github.com/tahsinatanvin",
      color: "hover:text-gray-800",
    },
    { 
      name: "LinkedIn", 
      icon: FaLinkedin, 
      href: "https://linkedin.com/in/tahsina-tanvin",
      color: "hover:text-blue-600",
    },
    { 
      name: "Twitter", 
      icon: FaTwitter, 
      href: "#",
      color: "hover:text-sky-400",
    },
    { 
      name: "Discord", 
      icon: FaDiscord, 
      href: "#",
      color: "hover:text-indigo-500",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/", icon: "🏠", description: "Back to homepage" },
    { name: "Projects", href: "/projects", icon: "💼", description: "My portfolio" },
    { name: "Blogs", href: "/blogs", icon: "📝", description: "Latest articles" },
    { name: "Contact", href: "/contact", icon: "📞", description: "Get in touch" },
  ];

  const serviceLinks = [
    { name: "Web Development", href: "/services/web-dev" },
    { name: "UI/UX Design", href: "/services/ui-ux" },
    { name: "Consulting", href: "/services/consulting" },
    { name: "Maintenance", href: "/services/maintenance" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#EFF5D2] via-[#f8fae5] to-[#EFF5D2] border-[#B1AB86]/30 border-t overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), 
                           radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="top-10 left-10 absolute bg-gradient-to-r from-[#B1AB86] to-[#9c946d] blur-xl rounded-full w-20 h-20 animate-float-slow"></div>
      <div className="right-20 bottom-20 absolute bg-[#D7D7D7] blur-lg rounded-full w-16 h-16 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="top-1/2 left-1/4 absolute bg-[#B1AB86]/30 blur-md rounded-full w-12 h-12 animate-pulse-slow"></div>

      {/* Mouse Follow Gradient */}
      <div 
        className="absolute inset-0 opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, #B1AB86 0%, transparent 80%)`
        }}
      />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center bg-gradient-to-br from-[#B1AB86] via-[#9c946d] to-[#B1AB86] text-white p-4 rounded-2xl shadow-2xl transition-all duration-500 ${
          isVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-10 scale-50 pointer-events-none"
        } hover:scale-110 hover:shadow-3xl hover:from-[#9c946d] hover:to-[#B1AB86] group backdrop-blur-sm`}
        aria-label="Back to top"
      >
        <div className="relative">
          <HiArrowUp className={`w-5 h-5 transition-transform duration-300 ${isHovered ? '-translate-y-1' : ''}`} />
          <div className={`absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
            <HiCursorClick className="w-3 h-3" />
          </div>
        </div>
        
        {/* Ripple Effect */}
        <div className={`absolute inset-0 rounded-2xl border-2 border-[#B1AB86]/30 transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}></div>
      </button>

      {/* Main Footer Content */}
      <div className="z-10 relative gap-8 grid grid-cols-1 lg:grid-cols-4 mx-auto px-6 py-16 max-w-7xl">
        
        {/* Brand Section */}
        <div className="lg:col-span-2">
          <Link 
            href="/" 
            className="group inline-flex relative items-center gap-3 mb-6 font-bold text-xl"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#B1AB86] opacity-30 group-hover:opacity-50 blur-xl rounded-full transition-all animate-pulse duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#B1AB86] to-[#9c946d] shadow-lg group-hover:shadow-xl p-3 rounded-2xl group-hover:rotate-12 transition-all duration-300">
                <HiCode className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <span className="bg-clip-text bg-gradient-to-r from-[#1a1a1a] via-[#B1AB86] to-[#1a1a1a] font-bold text-transparent text-2xl group-hover:scale-105 transition-transform duration-300">
              TT Innovations
            </span>
            <HiSparkles className="opacity-0 group-hover:opacity-100 w-5 h-5 text-[#B1AB86] rotate-12 group-hover:rotate-180 transition-all duration-500" />
          </Link>
          
          <p className="relative mb-6 max-w-md text-[#1a1a1a]/80 text-lg leading-relaxed">
            <span className="top-2 -left-4 absolute text-[#B1AB86] text-xl">❝</span>
            Crafting scalable and innovative web experiences with passion and precision. 
            Transforming ideas into digital reality through cutting-edge technology.
            <span className="-right-4 bottom-2 absolute text-[#B1AB86] text-xl">❞</span>
          </p>
          
          <div className="flex gap-3 mb-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[#B1AB86]/30 hover:border-[#B1AB86]/60 rounded-xl w-12 h-12 text-[#1a1a1a] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-white ${social.color}`}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-all duration-300" />
                  <span className="-bottom-8 z-20 absolute bg-[#1a1a1a] opacity-0 group-hover:opacity-100 px-2 py-1 rounded-md text-white text-xs whitespace-nowrap transition-all duration-300">
                    {social.name}
                    <div className="-top-1 left-1/2 absolute bg-[#1a1a1a] w-2 h-2 rotate-45 -translate-x-1/2 transform"></div>
                  </span>
                </a>
              );
            })}
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-white/50 backdrop-blur-sm p-6 border border-[#B1AB86]/20 hover:border-[#B1AB86]/40 rounded-2xl transition-all duration-300">
            <h4 className="flex items-center gap-2 mb-3 font-semibold text-[#1a1a1a]">
              <HiMail className="w-4 h-4 text-[#B1AB86]" />
              Stay Updated
            </h4>
            <p className="mb-3 text-[#1a1a1a]/70 text-sm">Get the latest updates on projects and articles.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/80 px-3 py-2 border border-[#B1AB86]/30 focus:border-transparent rounded-lg focus:outline-none focus:ring-[#B1AB86]/50 focus:ring-2 text-sm"
              />
              <button className="bg-gradient-to-r from-[#B1AB86] to-[#9c946d] hover:shadow-lg px-4 py-2 rounded-lg font-medium text-white text-sm hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="relative flex items-center gap-2 mb-6 font-bold text-[#1a1a1a] text-lg">
            <div className="bg-gradient-to-r from-[#B1AB86] to-[#9c946d] rounded-full w-2 h-2"></div>
            Quick Navigation
            <HiSparkles className="w-4 h-4 text-[#B1AB86] animate-pulse" />
          </h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-3 hover:bg-white/50 hover:shadow-md px-4 py-3 border hover:border-[#B1AB86]/20 border-transparent rounded-xl text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-all duration-300"
              >
                <span className="text-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <div className="flex-1">
                  <span className="block font-medium transition-all group-hover:translate-x-1 duration-300">
                    {link.name}
                  </span>
                  <span className="text-[#1a1a1a]/50 group-hover:text-[#1a1a1a]/70 text-xs transition-colors">
                    {link.description}
                  </span>
                </div>
                <HiSparkles className="opacity-0 group-hover:opacity-100 ml-auto w-4 h-4 text-[#B1AB86] group-hover:rotate-180 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact & Services */}
        <div className="space-y-8">
          <div>
            <h3 className="flex items-center gap-2 mb-6 font-bold text-[#1a1a1a] text-lg">
              <div className="bg-gradient-to-r from-[#B1AB86] to-[#9c946d] rounded-full w-2 h-2"></div>
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:tahsinatanvin274@gmail.com"
                className="group flex items-center gap-3 bg-white/50 hover:bg-white/80 hover:shadow-md backdrop-blur-sm p-3 border hover:border-[#B1AB86]/20 border-transparent rounded-xl transition-all duration-300"
              >
                <div className="bg-[#B1AB86]/20 group-hover:bg-[#B1AB86]/30 p-2 rounded-lg group-hover:scale-110 transition-colors">
                  <HiMail className="w-4 h-4 text-[#B1AB86]" />
                </div>
                <div>
                  <span className="block text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] text-sm transition-colors">
                    tahsinatanvin274@gmail.com
                  </span>
                  <span className="text-[#1a1a1a]/50 text-xs">Email</span>
                </div>
              </a>
              
              <a
                href="tel:+8801859702848"
                className="group flex items-center gap-3 bg-white/50 hover:bg-white/80 hover:shadow-md backdrop-blur-sm p-3 border hover:border-[#B1AB86]/20 border-transparent rounded-xl transition-all duration-300"
              >
                <div className="bg-[#B1AB86]/20 group-hover:bg-[#B1AB86]/30 p-2 rounded-lg group-hover:scale-110 transition-colors">
                  <HiPhone className="w-4 h-4 text-[#B1AB86]" />
                </div>
                <div>
                  <span className="block text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] text-sm transition-colors">
                    +8801859702848
                  </span>
                  <span className="text-[#1a1a1a]/50 text-xs">Phone</span>
                </div>
              </a>
              
              <a
                href="https://maps.google.com/?q=Chattogram,Bangladesh"
                target="_blank"
                className="group flex items-center gap-3 bg-white/50 hover:bg-white/80 hover:shadow-md backdrop-blur-sm p-3 border hover:border-[#B1AB86]/20 border-transparent rounded-xl transition-all duration-300"
              >
                <div className="bg-[#B1AB86]/20 group-hover:bg-[#B1AB86]/30 p-2 rounded-lg group-hover:scale-110 transition-colors">
                  <HiLocationMarker className="w-4 h-4 text-[#B1AB86]" />
                </div>
                <div>
                  <span className="block text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] text-sm transition-colors">
                    Chattogram, Bangladesh
                  </span>
                  <span className="text-[#1a1a1a]/50 text-xs">Location</span>
                </div>
              </a>
            </div>
          </div>

          {/* Services Quick Links */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 font-semibold text-[#1a1a1a] text-sm">
              <HiGlobe className="w-4 h-4 text-[#B1AB86]" />
              Services
            </h3>
            <div className="gap-2 grid grid-cols-2">
              {serviceLinks.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="hover:bg-white/50 p-2 rounded-lg text-[#1a1a1a]/70 hover:text-[#B1AB86] text-xs text-center transition-all duration-200"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-white/20 backdrop-blur-sm border-[#B1AB86]/30 border-t">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mx-auto px-6 py-6 max-w-7xl">
          <div className="flex items-center gap-4 text-[#1a1a1a]/70 text-sm">
            <span className="flex items-center gap-2">
              © {currentYear} TT Innovations.
              <HiShieldCheck className="w-4 h-4 text-green-500" />
            </span>
            <span className="flex items-center gap-1">
              Crafted with <HiHeart className="w-4 h-4 text-red-400 animate-pulse" /> passion
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/privacy" 
              className="group flex items-center gap-1 text-[#1a1a1a]/70 hover:text-[#B1AB86] transition-colors duration-300"
            >
              <HiShieldCheck className="w-3 h-3" />
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="group flex items-center gap-1 text-[#1a1a1a]/70 hover:text-[#B1AB86] transition-colors duration-300"
            >
              <HiDocumentText className="w-3 h-3" />
              Terms
            </Link>
            <div className="flex items-center gap-2 text-[#1a1a1a]/60">
              <HiClock className="w-3 h-3" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </footer>
  );
}