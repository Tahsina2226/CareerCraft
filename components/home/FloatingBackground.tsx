export default function FloatingBackground() {
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

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {floatingShapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.style} ${shape.size} ${shape.animation} opacity-5 rounded-full`}
        />
      ))}

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5D6D4B] to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
