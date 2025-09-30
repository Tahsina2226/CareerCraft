"use client";

import { HiCode, HiServer, HiChip, HiGlobe } from "react-icons/hi";

export default function SkillsContent() {
  const skills = {
    frontend: [
      { name: "React.js", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
      { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600" },
      {
        name: "JavaScript (ES6+)",
        icon: "🟨",
        color: "from-yellow-400 to-yellow-600",
      },
      { name: "TypeScript", icon: "🔷", color: "from-blue-600 to-blue-800" },
      { name: "HTML5", icon: "🌐", color: "from-orange-500 to-red-500" },
      { name: "CSS3", icon: "🎨", color: "from-blue-400 to-purple-500" },
      { name: "Tailwind CSS", icon: "💨", color: "from-teal-400 to-cyan-500" },
      { name: "Redux", icon: "📦", color: "from-purple-500 to-pink-500" },
      {
        name: "Redux Toolkit Query",
        icon: "🔧",
        color: "from-gray-600 to-gray-800",
      },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700" },
      { name: "Express.js", icon: "🚂", color: "from-gray-400 to-gray-600" },
    ],
    databases: [
      { name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-800" },
      { name: "PostgreSQL", icon: "🐘", color: "from-blue-700 to-blue-900" },
      { name: "MySQL", icon: "🐬", color: "from-orange-500 to-blue-600" },
    ],
    tools: [
      { name: "Firebase", icon: "🔥", color: "from-yellow-500 to-orange-500" },
      { name: "Git", icon: "📚", color: "from-orange-500 to-red-500" },
      { name: "GitHub", icon: "🐙", color: "from-gray-700 to-gray-900" },
      { name: "Postman", icon: "📬", color: "from-orange-600 to-red-600" },
    ],
  };

  return (
    <div className="z-10 relative">
      <h2 className="flex justify-center items-center gap-3 mb-8 font-bold text-[#5D6D4B] text-3xl text-center">
        <HiChip className="w-8 h-8 text-[#B1AB86]" />
        Technical Competencies
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-[#7D8566] text-lg text-center">
        Comprehensive expertise in modern development technologies and
        methodologies
      </p>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="group bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/50 hover:shadow-xl backdrop-blur-sm p-6 border-[#B1AB86]/20 border-2 rounded-3xl transition-all duration-300">
            <h3 className="flex items-center gap-3 mb-6 font-bold text-[#5D6D4B] text-xl">
              <HiCode className="w-6 h-6 text-[#B1AB86]" />
              Frontend Development
            </h3>
            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
              {skills.frontend.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/80 hover:shadow-md p-3 rounded-xl transition-all duration-300"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-[#5D6D4B] text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/50 hover:shadow-xl backdrop-blur-sm p-6 border-[#B1AB86]/20 border-2 rounded-3xl transition-all duration-300">
            <h3 className="flex items-center gap-3 mb-6 font-bold text-[#5D6D4B] text-xl">
              <HiServer className="w-6 h-6 text-[#B1AB86]" />
              Backend Development
            </h3>
            <div className="gap-3 grid grid-cols-2">
              {skills.backend.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/80 hover:shadow-md p-3 rounded-xl transition-all duration-300"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-[#5D6D4B] text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="group bg-gradient-to-br from-white hover:from-[#B1AB86]/5 to-white/50 hover:shadow-xl backdrop-blur-sm p-6 border-[#B1AB86]/20 border-2 rounded-3xl transition-all duration-300">
            <h3 className="flex items-center gap-3 mb-6 font-bold text-[#5D6D4B] text-xl">
              <HiChip className="w-6 h-6 text-[#B1AB86]" />
              Database Management
            </h3>
            <div className="gap-3 grid grid-cols-2">
              {skills.databases.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/80 hover:shadow-md p-3 rounded-xl transition-all duration-300"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-[#5D6D4B] text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white hover:from-[#B1AB86]/5 to-white/50 hover:shadow-xl backdrop-blur-sm p-6 border-[#B1AB86]/20 border-2 rounded-3xl transition-all duration-300">
            <h3 className="flex items-center gap-3 mb-6 font-bold text-[#5D6D4B] text-xl">
              <HiGlobe className="w-6 h-6 text-[#B1AB86]" />
              Development Tools
            </h3>
            <div className="gap-3 grid grid-cols-2">
              {skills.tools.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-gradient-to-br from-white hover:from-[#5D6D4B]/5 to-white/80 hover:shadow-md p-3 rounded-xl transition-all duration-300"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="font-medium text-[#5D6D4B] text-sm">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
