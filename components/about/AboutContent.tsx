"use client";

import {
  HiMail,
  HiPhone,
  HiMap,
  HiAcademicCap,
  HiCode,
  HiServer,
  HiChip,
  HiSparkles,
  HiExternalLink,
  HiUser,
  HiCalendar,
  HiBookmark,
} from "react-icons/hi";
import SkillsContent from "./SkillsContent";

interface AboutContentProps {
  activeTab: string;
}

export default function AboutContent({ activeTab }: AboutContentProps) {
  const personalInfo = {
    name: "Tahsina Tanvin",
    email: "tahsinatanvin274@gmail.com",
    phone: "+880 1859 702848",
    location: "Chattogram, Bangladesh",

    linkedin: "https://linkedin.com/in/tahsina-tanvin",
    github: "https://github.com/Tahsina2226",
  };

  const timeline = [
    {
      year: "2022",
      event: "Programming Journey Commenced",
      description: "Started with HTML, CSS, and JavaScript fundamentals",
      icon: HiCode,
    },
    {
      year: "2023",
      event: "React & Node.js Proficiency",
      description: "Built first full-stack applications",
      icon: HiServer,
    },
    {
      year: "2024",
      event: "Advanced Technical Mastery",
      description:
        "Expertise in TypeScript, Next.js, and database architecture",
      icon: HiChip,
    },
  ];

  return (
    <div className="relative bg-white/95 shadow-xl hover:shadow-2xl backdrop-blur-sm p-6 md:p-8 border border-gray-100 rounded-2xl overflow-hidden hover:scale-[1.005] transition-all duration-300 transform">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B]/5 via-white/50 to-[#B1AB86]/5 opacity-60"></div>
      <div className="top-0 right-0 absolute bg-gradient-to-bl from-[#5D6D4B]/15 to-transparent blur-sm rounded-full w-40 h-40 -translate-y-20 translate-x-20"></div>
      <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-[#B1AB86]/15 to-transparent blur-sm rounded-full w-32 h-32 -translate-x-16 translate-y-16"></div>
      <div className="top-1/2 left-1/4 absolute bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 rounded-full w-16 h-16 animate-pulse"></div>

      {activeTab === "story" && (
        <div className="z-10 relative space-y-8">
          <div className="mb-8 text-center">
            <h2 className="flex justify-center items-center gap-3 mb-4 font-bold text-[#5D6D4B] text-2xl md:text-3xl">
              <div className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg p-2 rounded-xl">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              My Journey: Meet Tahsina
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-sm">
              From foundational HTML to full-stack excellence
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 shadow-sm hover:shadow-md backdrop-blur-sm p-6 border border-gray-200/60 rounded-2xl transition-all duration-300">
              <p className="text-gray-700 text-base leading-relaxed">
                I am{" "}
                <span className="font-semibold text-[#5D6D4B]">
                  Tahsina Tanvin
                </span>
                , a dedicated software engineer specializing in comprehensive
                full-stack development. My technical journey commenced during my
                academic years with foundational exposure to HTML and CSS, which
                progressively evolved into mastering sophisticated technologies
                including JavaScript, React.js, TypeScript, Redux, Node.js, and
                PostgreSQL.
              </p>
            </div>

            <div className="group relative bg-gradient-to-r from-[#5D6D4B]/8 to-[#B1AB86]/8 hover:shadow-md p-6 border-[#5D6D4B] border-l-4 rounded-2xl transition-all duration-300">
              <HiBookmark className="-top-3 left-6 absolute bg-white shadow-md p-1 rounded-lg w-6 h-6 text-[#5D6D4B] group-hover:scale-110 transition-transform" />
              <p className="text-gray-700 text-base italic leading-relaxed">
                &quot;My development philosophy centers on creating{" "}
                <span className="font-semibold text-[#5D6D4B]">
                  architecturally sound, user-centric solutions
                </span>{" "}
                that prioritize accessibility, performance, and maintainability
                while delivering tangible value to end-users.&quot;
              </p>
            </div>

            <div className="bg-white/70 hover:shadow-md backdrop-blur-sm p-6 border border-gray-200/50 rounded-2xl transition-all duration-300">
              <p className="text-gray-700 text-base leading-relaxed">
                Beyond technical implementation, I am deeply committed to
                knowledge sharing and collaborative growth within the developer
                community. The most rewarding aspect of my professional
                evolution lies not only in acquiring cutting-edge competencies
                but also in mentoring peers and contributing to collective
                technical excellence.
              </p>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mt-8">
              <div className="group bg-white/85 hover:bg-white hover:shadow-lg p-5 border border-gray-200 rounded-xl transition-all hover:-translate-y-1 duration-300">
                <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-md mb-4 rounded-lg w-12 h-12 group-hover:scale-110 transition-transform">
                  <HiCode className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-800 text-sm">
                  Frontend Architecture
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Engineering responsive, accessible interfaces with modern
                  frameworks and optimized performance
                </p>
              </div>

              <div className="group bg-white/85 hover:bg-white hover:shadow-lg p-5 border border-gray-200 rounded-xl transition-all hover:-translate-y-1 duration-300">
                <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-md mb-4 rounded-lg w-12 h-12 group-hover:scale-110 transition-transform">
                  <HiServer className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-800 text-sm">
                  Backend Systems
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Designing scalable server infrastructure, robust APIs, and
                  efficient database architecture
                </p>
              </div>

              <div className="group bg-white/85 hover:bg-white hover:shadow-lg p-5 border border-gray-200 rounded-xl transition-all hover:-translate-y-1 duration-300">
                <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-md mb-4 rounded-lg w-12 h-12 group-hover:scale-110 transition-transform">
                  <HiAcademicCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-800 text-sm">
                  Technical Leadership
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Mentoring developers and driving adoption of industry best
                  practices and emerging technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "education" && (
        <div className="z-10 relative space-y-8">
          <div className="mb-8 text-center">
            <h2 className="flex justify-center items-center gap-3 mb-4 font-bold text-[#5D6D4B] text-2xl md:text-3xl">
              <div className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg p-2 rounded-xl">
                <HiAcademicCap className="w-6 h-6 text-white" />
              </div>
              Education & Certifications
            </h2>
          </div>

          <div className="group bg-white/85 shadow-sm hover:shadow-md backdrop-blur-sm p-6 border border-gray-200 rounded-2xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg rounded-xl w-14 h-14 group-hover:scale-105 transition-transform">
                  <HiAcademicCap className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-bold text-gray-800 text-lg">
                  Bachelor of Science in Computer Science & Engineering
                </h3>
                <p className="mb-3 font-medium text-[#5D6D4B] text-sm">
                  Premier University, Chattogram • Current
                </p>
                <p className="mb-4 text-gray-600 text-sm leading-relaxed">
                  Comprehensive education in computer science fundamentals
                  combined with practical full-stack development experience.
                  Focusing on algorithms, data structures, and software
                  engineering principles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 px-3 py-1 border border-blue-200 rounded-full font-medium text-blue-700 text-xs">
                    🎓 Degree in Progress
                  </span>
                  <span className="bg-green-50 px-3 py-1 border border-green-200 rounded-full font-medium text-green-700 text-xs">
                    💻 Software Engineering
                  </span>
                  <span className="bg-purple-50 px-3 py-1 border border-purple-200 rounded-full font-medium text-purple-700 text-xs">
                    🚀 Practical Focus
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="group bg-white/80 hover:shadow-md p-5 border border-gray-200 rounded-xl transition-all hover:-translate-y-1 duration-300">
              <h4 className="mb-3 font-semibold text-gray-800 text-sm">
                Professional Development
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Advanced technical skills through specialized certifications and
                continuous learning in emerging technologies
              </p>
            </div>
            <div className="group bg-white/80 hover:shadow-md p-5 border border-gray-200 rounded-xl transition-all hover:-translate-y-1 duration-300">
              <h4 className="mb-3 font-semibold text-gray-800 text-sm">
                Industry Preparation
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Bridging academic knowledge with real-world application through
                project-based learning
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "skills" && <SkillsContent />}

      {activeTab === "timeline" && (
        <div className="z-10 relative">
          <div className="mb-12 text-center">
            <h2 className="flex justify-center items-center gap-3 mb-4 font-bold text-[#5D6D4B] text-2xl md:text-3xl">
              <div className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg p-2 rounded-xl">
                <HiCalendar className="w-6 h-6 text-white" />
              </div>
              My Journey
            </h2>
            <p className="text-gray-600 text-sm">
              Key milestones in my development career
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <div className="top-0 bottom-0 left-6 absolute bg-gradient-to-b from-[#5D6D4B] to-[#B1AB86] shadow-md w-0.5"></div>

              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative flex items-start mb-8"
                  >
                    <div className="z-10 flex-shrink-0">
                      <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg rounded-xl w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 ml-6 min-w-0">
                      <div className="bg-white/85 hover:bg-white hover:shadow-lg p-5 border border-gray-200 rounded-xl transition-all group-hover:-translate-y-1 duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#5D6D4B] shadow-sm px-2 py-1 rounded-full font-medium text-white text-xs">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="mb-2 font-bold text-gray-800 text-base">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="z-10 relative">
          <div className="mb-12 text-center">
            <h2 className="flex justify-center items-center gap-3 mb-4 font-bold text-[#5D6D4B] text-2xl md:text-3xl">
              <div className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg p-2 rounded-xl">
                <HiUser className="w-6 h-6 text-white" />
              </div>
              Let&apos;s Create Something Amazing Together
            </h2>
            <p className="mx-auto max-w-md text-gray-600 text-sm">
              Ready to transform your ideas into exceptional digital
              experiences?
            </p>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-12">
            <div className="group bg-white/85 hover:bg-white hover:shadow-xl p-6 border border-gray-200 rounded-2xl text-center transition-all hover:-translate-y-2 duration-300 transform">
              <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg mx-auto mb-4 rounded-2xl w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                <HiMap className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-base">
                Based In
              </h3>
              <p className="font-medium text-gray-600 text-sm">
                {personalInfo.location}
              </p>
              <div className="mt-3 text-gray-500 text-xs">
                Always open to remote opportunities
              </div>
            </div>

            <div className="group bg-white/85 hover:bg-white hover:shadow-xl p-6 border border-gray-200 rounded-2xl text-center transition-all hover:-translate-y-2 duration-300 transform">
              <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg mx-auto mb-4 rounded-2xl w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                <HiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-base">
                Email Me
              </h3>
              <p className="font-medium text-gray-600 text-sm break-all">
                {personalInfo.email}
              </p>
              <div className="mt-3 text-gray-500 text-xs">
                Typically replies within 24 hours
              </div>
            </div>

            <div className="group bg-white/85 hover:bg-white hover:shadow-xl p-6 border border-gray-200 rounded-2xl text-center transition-all hover:-translate-y-2 duration-300 transform">
              <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg mx-auto mb-4 rounded-2xl w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                <HiPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-base">
                Call Me
              </h3>
              <p className="font-medium text-gray-600 text-sm">
                {personalInfo.phone}
              </p>
              <div className="mt-3 text-gray-500 text-xs">
                Available for urgent discussions
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#5D6D4B]/10 via-white to-[#B1AB86]/10 shadow-sm hover:shadow-md p-8 border border-gray-200 rounded-2xl text-center transition-all duration-300">
            <div className="mx-auto max-w-2xl">
              <h3 className="mb-4 font-bold text-gray-800 text-xl">
                Ready to Start Your Project?
              </h3>
              <p className="mb-8 text-gray-700 text-sm leading-relaxed">
                Whether you&apos;re looking to build a new application, improve
                an existing one, or just want to discuss tech possibilities -
                I&apos;d love to hear from you. Let&apos;s bring your vision to
                life with clean, efficient code and exceptional user
                experiences.
              </p>

              <div className="flex sm:flex-row flex-col justify-center gap-4 mb-8">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex justify-center items-center gap-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#6B7A55] hover:to-[#5D6D4B] shadow-lg hover:shadow-2xl px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:-translate-y-1 duration-300 transform"
                >
                  <HiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Conversation
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex justify-center items-center gap-3 bg-white hover:bg-gray-50 shadow-sm hover:shadow-2xl px-8 py-4 border border-gray-300 rounded-xl font-semibold text-gray-800 text-base transition-all hover:-translate-y-1 duration-300 transform"
                >
                  <HiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
              </div>

              <div className="pt-6 border-gray-200 border-t">
                <p className="mb-4 font-medium text-gray-600 text-sm">
                  Explore More of My Work
                </p>
                <div className="flex justify-center gap-8">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-medium text-gray-600 hover:text-[#5D6D4B] text-sm transition-colors"
                  >
                    <HiCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              💫 Let&apos;s build something extraordinary together
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
