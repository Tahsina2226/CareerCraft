import { HiSparkles, HiFire } from "react-icons/hi";

interface ProfessionalSnapshotProps {
  isVisible: boolean;
}

export default function ProfessionalSnapshot({
  isVisible,
}: ProfessionalSnapshotProps) {
  const professionalSnapshot = [
    "Comfortable with React.js, TypeScript, Tailwind CSS",
    "Backend with Node.js, Express.js; MongoDB (Mongoose)",
    "Hands-on with Git, Postman; JWT auth & REST APIs",
    "Exploring SSR (Next.js) and advanced React patterns",
  ];

  return (
    <section id="projects" className="mb-20">
      <div
        className={`relative bg-gradient-to-br from-white/95 to-white/90 dark:from-[#2D3B24]/95 dark:to-[#3A4A2E]/95 shadow-2xl backdrop-blur-sm p-8 border-2 border-[#B1AB86]/40 dark:border-[#5D6D4B]/40 rounded-3xl hover:shadow-3xl transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="-top-3 left-8 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg px-4 py-1 rounded-full">
          <span className="font-bold text-white text-xs tracking-wide">
            SKILLS OVERVIEW
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg p-3 rounded-2xl">
              <HiSparkles className="w-7 h-7 text-white" />
            </div>
            <div className="-top-1 -right-1 absolute bg-yellow-400 border-2 border-white dark:border-[#2D3B24] rounded-full w-3 h-3 animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-[#5D6D4B] dark:text-[#B8C4A9] text-2xl tracking-tight">
              Professional Snapshot
            </h2>
            <p className="mt-1 text-[#7D8566] dark:text-[#8A936D] text-sm">
              Full-stack development expertise
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-[#F8F7F0] dark:from-[#2D3B24]/50 to-[#F0EEE0] dark:to-[#3A4A2E]/50 mb-8 p-6 border border-[#B1AB86]/30 dark:border-[#5D6D4B]/30 rounded-2xl">
          <div className="top-1/2 -left-2 absolute bg-gradient-to-b from-[#5D6D4B] to-[#B1AB86] rounded-full w-1 h-16 -translate-y-1/2 transform"></div>
          <p className="font-medium text-[#5D6D4B] dark:text-[#B8C4A9] text-lg leading-relaxed">
            Full-stack developer in the making with modern web tech. I enjoy
            building clean, scalable apps with React/TypeScript on the frontend
            and Node/Express on the backend.
          </p>
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-6">
          {professionalSnapshot.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white dark:from-[#2D3B24] to-[#F8F7F0] dark:to-[#3A4A2E] hover:shadow-xl p-5 border-[#B1AB86]/30 border-2 dark:border-[#5D6D4B]/30 rounded-2xl transition-all hover:-translate-y-1 duration-500 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-md p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <HiFire className="w-5 h-5 text-white" />
                  </div>
                  <div className="-top-1 -right-1 absolute bg-red-400 border-2 border-white dark:border-[#2D3B24] rounded-full w-2 h-2"></div>
                </div>
                <span className="pt-1 font-medium text-[#5D6D4B] dark:text-[#B8C4A9] leading-relaxed">
                  {item}
                </span>
              </div>
              <div className="bottom-0 left-0 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] rounded-b-2xl w-0 group-hover:w-full h-1 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["Frontend", "Backend", "Tools", "Auth", "APIs", "SSR"].map(
            (tag, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-[#B1AB86]/20 dark:from-[#5D6D4B]/20 to-[#C8C2A5]/20 dark:to-[#6B7A55]/20 hover:shadow-lg px-4 py-2 border border-[#B1AB86]/40 dark:border-[#5D6D4B]/40 rounded-full font-semibold text-[#5D6D4B] dark:text-[#B8C4A9] text-xs hover:scale-105 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
