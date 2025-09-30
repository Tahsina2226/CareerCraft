interface ScrollIndicatorProps {
  activeSection: string;
}

export default function ScrollIndicator({
  activeSection,
}: ScrollIndicatorProps) {
  return (
    <div className="hidden lg:block top-1/2 right-8 z-40 fixed -translate-y-1/2 transform">
      <div className="flex flex-col items-center gap-3">
        {["home", "skills", "projects", "about"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === item
                ? "bg-[#5D6D4B] dark:bg-[#B8C4A9] scale-125"
                : "bg-[#B1AB86] dark:bg-[#7D8566] hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
