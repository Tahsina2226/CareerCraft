import { HiStar, HiAcademicCap, HiChip, HiGlobe } from "react-icons/hi";

interface StatsSectionProps {
  isVisible: boolean;
}

export default function StatsSection({ isVisible }: StatsSectionProps) {
  const stats = [
    {
      number: "10+",
      label: "Projects Completed",
      icon: HiStar,
      color: "from-yellow-400 to-orange-400",
    },
    {
      number: "2+",
      label: "Years Learning",
      icon: HiAcademicCap,
      color: "from-blue-400 to-purple-400",
    },
    {
      number: "8+",
      label: "Technologies",
      icon: HiChip,
      color: "from-green-400 to-teal-400",
    },
    {
      number: "20+",
      label: "Git Repositories",
      icon: HiGlobe,
      color: "from-red-400 to-pink-400",
    },
  ];

  return (
    <section id="skills" className="mb-20">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-white/95 to-white/90 dark:from-[#2D3B24]/95 dark:to-[#3A4A2E]/95 backdrop-blur-sm p-8 border-2 border-[#B1AB86]/40 dark:border-[#5D6D4B]/40 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group transform overflow-hidden ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5D6D4B]/5 to-[#B1AB86]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="z-10 relative">
                <div className="flex justify-center mb-4">
                  <div
                    className={`relative bg-gradient-to-br ${stat.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    <div className="-top-1 -right-1 absolute bg-white border-2 border-current rounded-full w-3 h-3"></div>
                  </div>
                </div>

                <div className="mb-3 font-bold text-[#5D6D4B] dark:text-[#B8C4A9] text-4xl group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>

                <div className="font-semibold text-[#7D8566] dark:group-hover:text-[#B8C4A9] dark:text-[#8A936D] group-hover:text-[#5D6D4B] text-lg transition-colors duration-300">
                  {stat.label}
                </div>
              </div>

              <div className="bottom-0 left-0 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] rounded-b-3xl w-0 group-hover:w-full h-1 transition-all duration-500"></div>

              <div className="top-0 right-0 absolute bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 rounded-full w-20 h-20 group-hover:scale-150 transition-transform -translate-y-10 translate-x-10 duration-500"></div>
              <div className="bottom-0 left-0 absolute bg-gradient-to-br from-[#B1AB86]/10 to-[#5D6D4B]/10 rounded-full w-16 h-16 group-hover:scale-150 transition-transform -translate-x-8 translate-y-8 duration-500"></div>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-8 text-center transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F8F7F0] dark:from-[#2D3B24]/50 to-[#F0EEE0] dark:to-[#3A4A2E]/50 px-6 py-3 border-[#B1AB86]/30 border-2 dark:border-[#5D6D4B]/30 rounded-2xl">
          <HiStar className="w-5 h-5 text-[#5D6D4B] dark:text-[#B8C4A9]" />
          <span className="font-semibold text-[#5D6D4B] dark:text-[#B8C4A9] text-sm">
            Continuously growing and learning new technologies
          </span>
        </div>
      </div>
    </section>
  );
}
