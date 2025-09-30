import Link from "next/link";
import { HiAcademicCap, HiArrowRight } from "react-icons/hi";

interface CurrentlyLearningProps {
  isVisible: boolean;
}

export default function CurrentlyLearning({
  isVisible,
}: CurrentlyLearningProps) {
  return (
    <section id="about" className="mb-16">
      <div
        className={`relative bg-gradient-to-br from-white/95 to-white/90 dark:from-[#2D3B24]/95 dark:to-[#3A4A2E]/95 shadow-2xl backdrop-blur-sm p-8 border-2 border-[#B1AB86]/40 dark:border-[#5D6D4B]/40 rounded-3xl hover:shadow-3xl transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="-top-3 left-8 absolute bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg px-4 py-1 rounded-full">
          <span className="font-bold text-white text-xs tracking-wide">
            PROGRESS TRACKER
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg p-3 rounded-2xl">
              <HiAcademicCap className="w-7 h-7 text-white" />
            </div>
            <div className="-top-1 -right-1 absolute bg-green-400 border-2 border-white dark:border-[#2D3B24] rounded-full w-3 h-3 animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-[#5D6D4B] dark:text-[#B8C4A9] text-2xl tracking-tight">
              Currently Learning
            </h2>
            <p className="mt-1 text-[#7D8566] dark:text-[#8A936D] text-sm">
              Active skill development
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-[#F8F7F0] dark:from-[#2D3B24]/50 to-[#F0EEE0] dark:to-[#3A4A2E]/50 mb-8 p-6 border border-[#B1AB86]/30 dark:border-[#5D6D4B]/30 rounded-2xl">
          <div className="top-1/2 -left-2 absolute bg-gradient-to-b from-[#5D6D4B] to-[#B1AB86] rounded-full w-1 h-16 -translate-y-1/2 transform"></div>
          <p className="font-medium text-[#5D6D4B] dark:text-[#B8C4A9] text-lg leading-relaxed">
            I am{" "}
            <span className="font-bold text-[#4A5741] dark:text-[#C8C2A9]">
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#5D6D4B] dark:text-[#B8C4A9] text-lg">
              Current Focus Areas
            </h3>
            <span className="bg-white/50 dark:bg-[#2D3B24]/50 px-3 py-1 rounded-full text-[#7D8566] dark:text-[#8A936D] text-xs">
              4 technologies
            </span>
          </div>

          <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
            {["Docker", "Next.js", "Prisma", "DSA"].map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white dark:from-[#2D3B24] to-[#F8F7F0] dark:to-[#3A4A2E] hover:shadow-xl px-5 py-4 border-[#B1AB86]/30 border-2 dark:border-[#5D6D4B]/30 rounded-2xl transition-all hover:-translate-y-1 duration-500 cursor-default"
              >
                <div className="text-center">
                  <span className="font-bold text-[#5D6D4B] dark:group-hover:text-[#C8C2A5] dark:text-[#B8C4A9] group-hover:text-[#4A5741] text-sm transition-colors">
                    {tech}
                  </span>
                  <div className="bg-[#E8E4D5] dark:bg-[#4A5741] mt-2 rounded-full w-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] rounded-full h-2 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="group inline-flex relative items-center gap-3 bg-gradient-to-r from-white hover:from-white dark:from-[#2D3B24] dark:hover:from-[#3A4A2E] to-[#F8F7F0] hover:to-white dark:hover:to-[#4A5741] dark:to-[#3A4A2E] hover:shadow-2xl px-8 py-4 border-[#B1AB86]/40 border-2 dark:border-[#5D6D4B]/40 rounded-2xl font-bold text-[#5D6D4B] hover:text-[#4A5741] dark:hover:text-[#C8C2A5] dark:text-[#B8C4A9] text-sm transition-all hover:-translate-y-1 duration-500"
          >
            <span className="z-10 relative">Read My Full Story</span>
            <HiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D6D4B]/5 to-[#B1AB86]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
