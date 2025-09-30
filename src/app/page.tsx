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
  HiSparkles,
  HiFire,
  HiDownload,
  HiStar,
  HiGlobe,
  HiChip,
} from "react-icons/hi";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const personalInfo = {
    name: "Tahsina Tanvin",
    title: "Computer Science & Engineering Student | Full Stack Developer",
    location: "Chattogram, Bangladesh",
    email: "tahsinatanvin274@gmail.com",
    phone: "+880 1859 702848",
    avatar: "/images/avatar.jpg",
    cvFile: "/documents/Tahsina_Tanvin_CV.pdf", // CV file path
    shortBio:
      "A passionate Computer Science and Engineering student specializing in full-stack development. Dedicated to creating efficient, scalable web applications with modern technologies and best practices.",
  };

  const technicalExpertise = [
    "React.js with TypeScript",
    "Node.js & Express.js",
    "Next.js Framework",
    "MongoDB & Mongoose ODM",
    "PostgreSQL Database",
    "Tailwind CSS & Styling",
    "Git Version Control",
    "RESTful API Development",
  ];

  const coreCompetencies = [
    "Proficient in modern React ecosystem with TypeScript for type-safe development",
    "Experienced in building robust backend systems with Node.js and Express.js",
    "Skilled in database design and management with both SQL and NoSQL solutions",
    "Expertise in implementing responsive UI/UX designs with Tailwind CSS",
    "Strong understanding of REST API architecture and authentication mechanisms",
  ];

  const achievementMetrics = [
    { number: "10+", label: "Projects Delivered", icon: HiStar },
    { number: "2+", label: "Years Experience", icon: HiAcademicCap },
    { number: "12+", label: "Technologies Mastered", icon: HiChip },
    { number: "15+", label: "Git Repositories", icon: HiGlobe },
  ];

  const currentFocusAreas = [
    "Docker & Containerization",
    "AWS Cloud Services",
    "Prisma ORM",
    "Next.js 14+ Advanced Features",
    "System Architecture Design",
  ];

  const floatingShapes = [
    {
      style: "top-1/4 left-1/4 bg-[#5D6D4B]",
      size: "w-72 h-72",
      animation: "animate-float",
    },
    {
      style: "right-1/3 bottom-1/3 bg-[#B1AB86]",
      size: "w-96 h-96",
      animation: "animate-float-delayed",
    },
    {
      style: "top-3/4 left-1/3 bg-[#7D8566]",
      size: "w-64 h-64",
      animation: "animate-float-slow",
    },
    {
      style: "top-1/2 right-1/4 bg-[#8A936D]",
      size: "w-80 h-80",
      animation: "animate-float-reverse",
    },
    {
      style: "bottom-1/4 right-1/2 bg-[#9CA885]",
      size: "w-56 h-56",
      animation: "animate-float-slow-delayed",
    },
  ];

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      size: `${Math.random() * 4 + 2}px`,
    },
  }));

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885] pt-20 pb-12 min-h-screen overflow-hidden">
      <div
        className="z-0 fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(93, 109, 75, 0.15), transparent 80%)`,
        }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.style} ${shape.size} ${shape.animation} opacity-5 rounded-full`}
          />
        ))}

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-[#5D6D4B] opacity-20 rounded-full animate-particle-float"
            style={particle.style}
          />
        ))}
      </div>

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <section className="mb-20 text-center">
          <div
            className={`inline-block relative mb-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute -inset-4 bg-white/30 opacity-50 blur-lg rounded-3xl animate-pulse-slow"></div>
            <div className="group relative bg-white/90 shadow-2xl hover:shadow-2xl backdrop-blur-xl px-8 py-8 border border-[#B1AB86]/40 rounded-3xl hover:scale-[1.02] transition-all duration-500">
              <div className="top-0 left-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] border-t-2 border-l-2 rounded-tl-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="top-0 right-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] border-t-2 border-r-2 rounded-tr-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="bottom-0 left-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] border-b-2 border-l-2 rounded-bl-3xl w-8 h-8 transition-opacity duration-300"></div>
              <div className="right-0 bottom-0 absolute opacity-50 group-hover:opacity-100 border-[#5D6D4B] border-r-2 border-b-2 rounded-br-3xl w-8 h-8 transition-opacity duration-300"></div>

              <div className="flex lg:flex-row flex-col items-center gap-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] opacity-30 group-hover:opacity-50 blur-lg rounded-3xl transition-opacity animate-pulse duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] opacity-20 rounded-3xl group-hover:scale-105 transition-transform duration-500"></div>
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="z-10 relative shadow-lg border-4 border-white rounded-2xl w-32 h-32 object-cover group-hover:rotate-3 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="right-2 bottom-2 z-20 absolute bg-green-400 border-2 border-white rounded-full w-4 h-4 animate-ping"></div>
                  <div className="right-2 bottom-2 z-30 absolute bg-green-500 border-2 border-white rounded-full w-4 h-4"></div>
                </div>
                <div className="lg:text-left text-center">
                  <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] via-[#6B7A55] to-[#7D8566] mb-2 font-bold text-transparent text-4xl lg:text-5xl hover:scale-105 transition-transform animate-text-shimmer duration-300">
                    {personalInfo.name}
                  </h1>
                  <p className="mb-4 font-light text-[#7D8566] text-xl animate-fade-in-up">
                    {personalInfo.title}
                  </p>

                  <p className="mb-6 max-w-2xl text-[#5D6D4B] leading-relaxed animate-fade-in-up delay-200">
                    {personalInfo.shortBio}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    <div className="group flex items-center gap-2 bg-white/80 hover:shadow-lg backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <HiMap className="w-4 h-4 text-[#5D6D4B] group-hover:scale-110 transition-transform group-hover:animate-bounce duration-300" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.location}
                      </span>
                    </div>
                    <div className="group flex items-center gap-2 bg-white/80 hover:shadow-lg backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <HiMail className="w-4 h-4 text-[#5D6D4B] group-hover:scale-110 transition-transform group-hover:animate-bounce duration-300" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.email}
                      </span>
                    </div>
                    <div className="group flex items-center gap-2 bg-white/80 hover:shadow-lg backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl hover:scale-105 transition-transform duration-300">
                      <HiPhone className="w-4 h-4 text-[#5D6D4B] group-hover:scale-110 transition-transform group-hover:animate-bounce duration-300" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {technicalExpertise.map((skill, index) => (
                      <span
                        key={index}
                        className="hover:bg-[#5D6D4B]/20 bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 hover:shadow-lg px-3 py-1 border border-[#B1AB86]/30 rounded-full font-medium text-[#5D6D4B] text-xs hover:scale-105 transition-all hover:-translate-y-1 animate-fade-in-up duration-300 cursor-default transform"
                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Link
              href="/project"
              className="group relative flex items-center gap-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#6B7A55] hover:to-[#5D6D4B] shadow-lg hover:shadow-xl px-8 py-4 rounded-2xl overflow-hidden font-semibold text-white hover:scale-105 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="absolute inset-0 bg-white/10 -skew-x-12 transition-transform -translate-x-full group-hover:translate-x-full duration-1000 transform"></div>
              <HiCode className="z-10 w-5 h-5 group-hover:scale-110 transition-transform group-hover:animate-spin duration-300" />
              <span className="z-10">Explore My Portfolio</span>
              <HiArrowRight className="z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:animate-pulse duration-300" />
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-3 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl px-8 py-4 border border-[#B1AB86]/30 rounded-2xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all hover:-translate-y-1 duration-300"
            >
              <HiAcademicCap className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:animate-bounce duration-300" />
              <span>Professional Journey</span>
            </Link>

            <a
              href={personalInfo.cvFile}
              download="public\TAHSINA TANVIN's Resume (1).pdf"
              className="group flex items-center gap-3 bg-gradient-to-r from-[#B1AB86] hover:from-[#9C966F] to-[#C8C2A5] hover:to-[#B1AB86] shadow-lg hover:shadow-xl px-8 py-4 rounded-2xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all hover:-translate-y-1 duration-300"
            >
              <HiDownload className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:animate-bounce duration-300" />
              <span>Download CV</span>
            </a>
          </div>
        </section>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {achievementMetrics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white/95 backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-2xl shadow-lg text-center hover:scale-105 transition-all duration-300 group transform hover:-translate-y-2 hover:shadow-xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] p-3 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition-transform group-hover:animate-pulse duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                </div>
                <div className="mb-2 font-bold text-[#5D6D4B] text-3xl group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="font-medium text-[#7D8566] group-hover:text-[#5D6D4B] transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <section className="mb-16">
          <div
            className={`bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] p-2 rounded-xl animate-pulse">
                <HiSparkles className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <h2 className="font-bold text-[#5D6D4B] text-2xl animate-text-shimmer">
                Technical Expertise
              </h2>
            </div>

            <p className="mb-6 text-[#7D8566] text-lg leading-relaxed animate-fade-in-up">
              Specializing in the development of comprehensive full-stack
              solutions using cutting-edge technologies. My approach combines
              robust backend architecture with intuitive frontend interfaces to
              deliver high-performance web applications.
            </p>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              {coreCompetencies.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 transition-transform hover:translate-x-2 animate-fade-in-up duration-300 transform"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] mt-1 p-1 rounded-lg group-hover:scale-110 transition-transform group-hover:animate-pulse duration-300">
                    <HiFire className="w-4 h-4 text-white group-hover:animate-bounce" />
                  </div>
                  <span className="text-[#5D6D4B] group-hover:text-[#4A5741] text-sm leading-relaxed transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div
            className={`bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] p-2 rounded-xl animate-pulse">
                <HiAcademicCap className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <h2 className="font-bold text-[#5D6D4B] text-2xl animate-text-shimmer">
                Advanced Skill Development
              </h2>
            </div>

            <p className="mb-6 text-[#7D8566] text-lg leading-relaxed animate-fade-in-up">
              Continuously expanding my technical repertoire to stay at the
              forefront of web development. Currently focusing on
              enterprise-level technologies and scalable architecture patterns
              to enhance application performance and deployment efficiency.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {currentFocusAreas.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-[#B1AB86]/20 to-[#C8C2A5]/20 hover:shadow-lg px-4 py-2 border border-[#B1AB86]/40 rounded-full font-medium text-[#5D6D4B] text-sm hover:scale-105 transition-all hover:-translate-y-1 animate-fade-in-up duration-300 cursor-default"
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-white/80 hover:bg-white hover:shadow-lg px-6 py-3 border border-[#B1AB86]/30 rounded-2xl font-semibold text-[#5D6D4B] hover:text-[#4A5741] hover:scale-105 transition-all transition-colors hover:-translate-y-1 duration-300 duration-300"
              >
                <span>View Complete Profile</span>
                <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:animate-pulse duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-180deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(15px) rotate(-90deg);
          }
        }
        @keyframes float-slow-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(45deg);
          }
        }
        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(20px) rotate(180deg);
          }
        }
        @keyframes text-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 9s ease-in-out infinite;
        }
        .animate-float-slow-delayed {
          animation: float-slow-delayed 14s ease-in-out infinite;
        }
        .animate-particle-float {
          animation: particle-float 20s ease-in-out infinite;
        }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #5d6d4b, #b1ab86, #5d6d4b);
          background-size: 1000px 100%;
          animation: text-shimmer 3s ease-in-out infinite alternate;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}
