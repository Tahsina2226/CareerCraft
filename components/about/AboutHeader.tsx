"use client";

import { HiSparkles, HiStar, HiHeart, HiLightningBolt } from "react-icons/hi";

interface AboutHeaderProps {
  isVisible: boolean;
}

export default function AboutHeader({ isVisible }: AboutHeaderProps) {
  const achievements = [
    {
      number: "15+",
      label: "Projects",
      icon: HiStar,
      description: "Web applications delivered",
    },
    {
      number: "2+",
      label: "Years Exp",
      icon: HiHeart,
      description: "Professional development",
    },
    {
      number: "10+",
      label: "Technologies",
      icon: HiLightningBolt,
      description: "Tools & frameworks mastered",
    },
    {
      number: "100%",
      label: "Dedication",
      icon: HiSparkles,
      description: "Commitment to excellence",
    },
  ];

  return (
    <section className="mb-10 text-center">
      <div className="inline-block relative mb-5">
        <div className="relative">
          <div className="bg-gradient-to-br from-[#5D6D4B] via-[#B1AB86] to-[#7D8566] shadow-lg mx-auto p-0.5 rounded-full w-20 h-20">
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-full h-full">
              <span className="font-bold text-[#5D6D4B] text-lg">TT</span>
            </div>
          </div>
          <div className="-right-1 -bottom-1 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-md p-1.5 rounded-full text-white">
            <HiSparkles className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] via-[#6B7A55] to-[#7D8566] mb-2 font-bold text-transparent text-3xl lg:text-5xl tracking-tight">
          Tahsina Tanvin
        </h1>
        <p className="mx-auto mb-5 max-w-2xl font-light text-[#7D8566] text-base lg:text-lg">
          Full-Stack Developer & Technical Innovator
        </p>
      </div>

      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-3xl">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div
              key={index}
              className={`group bg-white/90 hover:bg-white backdrop-blur-sm p-3 border border-[#B1AB86]/20 rounded-xl text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <Icon className="mx-auto mb-1 w-5 h-5 text-[#5D6D4B] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="mb-0.5 font-bold text-[#5D6D4B] text-xl">
                {achievement.number}
              </div>
              <div className="mb-1 font-semibold text-[#7D8566] text-xs">
                {achievement.label}
              </div>
              <div className="text-[#7D8566]/70 text-xs leading-tight">
                {achievement.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
