"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiMail,
  HiPhone,
  HiMapPin,
  HiAcademicCap,
  HiCode,
  HiArrowRight,
  HiSparkles,
  HiFire,
} from "react-icons/hi";

export default function HomePage() {
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
  ];

  const professionalSnapshot = [
    "Comfortable with React.js, TypeScript, Tailwind CSS",
    "Backend with Node.js, Express.js; MongoDB (Mongoose)",
    "Hands-on with Git, Postman; JWT auth & REST APIs",
    "Exploring SSR (Next.js) and advanced React patterns",
  ];

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885] pt-20 pb-12 min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="top-1/4 left-1/4 absolute bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 animate-float"></div>
        <div className="right-1/3 bottom-1/3 absolute bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 animate-float-delayed"></div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="inline-block relative mb-8">
            <div className="absolute -inset-4 bg-white/30 opacity-50 blur-lg rounded-3xl"></div>
            <div className="relative bg-white/90 shadow-2xl backdrop-blur-xl px-8 py-8 border border-[#B1AB86]/40 rounded-3xl">
              <div className="flex lg:flex-row flex-col items-center gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] opacity-30 blur-lg rounded-3xl"></div>
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="z-10 relative shadow-lg border-4 border-white rounded-2xl w-32 h-32 object-cover"
                  />
                </div>
                <div className="lg:text-left text-center">
                  <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] via-[#6B7A55] to-[#7D8566] mb-2 font-bold text-transparent text-4xl lg:text-5xl">
                    {personalInfo.name}
                  </h1>
                  <p className="mb-4 font-light text-[#7D8566] text-xl">
                    {personalInfo.title}
                  </p>

                  {/* Short Bio */}
                  <p className="mb-6 max-w-2xl text-[#5D6D4B] leading-relaxed">
                    {personalInfo.shortBio}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl">
                      <HiMapPin className="w-4 h-4 text-[#5D6D4B]" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl">
                      <HiMail className="w-4 h-4 text-[#5D6D4B]" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-2xl">
                      <HiPhone className="w-4 h-4 text-[#5D6D4B]" />
                      <span className="text-[#7D8566] text-sm">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  {/* Quick Skills */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {quickSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 px-3 py-1 border border-[#B1AB86]/30 rounded-full font-medium text-[#5D6D4B] text-xs hover:scale-105 transition-all duration-300 cursor-default transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/project"
              className="group flex items-center gap-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#6B7A55] hover:to-[#5D6D4B] shadow-lg hover:shadow-xl px-8 py-4 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              <HiCode className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View My Projects</span>
              <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-3 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl px-8 py-4 border border-[#B1AB86]/30 rounded-2xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all duration-300"
            >
              <HiAcademicCap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>My Journey</span>
            </Link>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="mb-16">
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <HiSparkles className="w-6 h-6 text-[#B1AB86]" />
              <h2 className="font-bold text-[#5D6D4B] text-2xl">
                Professional Snapshot
              </h2>
            </div>

            <p className="mb-6 text-[#7D8566] text-lg leading-relaxed">
              Full-stack developer in the making with modern web tech. I enjoy
              building clean, scalable apps with React/TypeScript on the
              frontend and Node/Express on the backend.
            </p>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              {professionalSnapshot.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <HiFire className="flex-shrink-0 mt-0.5 w-5 h-5 text-[#5D6D4B]" />
                  <span className="text-[#5D6D4B]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick About Preview */}
        <section className="mb-16">
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <HiAcademicCap className="w-6 h-6 text-[#B1AB86]" />
              <h2 className="font-bold text-[#5D6D4B] text-2xl">
                Currently Learning
              </h2>
            </div>

            <p className="mb-6 text-[#7D8566] text-lg leading-relaxed">
              I'm passionate about building scalable web applications and
              solving real-world challenges through technology. Currently, I am
              exploring DevOps practices to become a proficient full-stack
              developer.
            </p>

            <div className="text-center">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-semibold text-[#5D6D4B] hover:text-[#4A5741] transition-colors duration-300"
              >
                <span>Read My Full Story</span>
                <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
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
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
