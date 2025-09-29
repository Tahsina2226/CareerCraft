"use client";

interface SidebarProps {
  activeSection: "dashboard" | "blogs" | "projects";
  setActiveSection: (section: "dashboard" | "blogs" | "projects") => void;
  stats: {
    totalBlogs: number;
    totalProjects: number;
  };
  user: {
    name: string;
  } | null;
  logout: () => void;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  stats,
  user,
  logout,
}: SidebarProps) {
  return (
    <div className="flex flex-col bg-white/95 shadow-2xl backdrop-blur-xl border-[#B1AB86]/30 border-r w-80">
      <div className="p-6 border-[#B1AB86]/20 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex justify-center items-center bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] shadow-lg rounded-xl w-12 h-12">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-[#1a1a1a] text-xl">Admin Panel</h1>
            <p className="text-[#7D8566] text-sm">Welcome back, {user?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 p-4">
        <button
          onClick={() => setActiveSection("dashboard")}
          className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
            activeSection === "dashboard"
              ? "bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] text-white shadow-lg"
              : "text-[#5D6D4B] hover:bg-[#B1AB86]/10 hover:shadow-md"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="font-semibold">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSection("blogs")}
          className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
            activeSection === "blogs"
              ? "bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] text-white shadow-lg"
              : "text-[#5D6D4B] hover:bg-[#B1AB86]/10 hover:shadow-md"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12"
            />
          </svg>
          <span className="font-semibold">Blog Posts</span>
          <span className="bg-[#5D6D4B]/20 px-2 py-1 rounded-full font-bold text-[#5D6D4B] text-xs">
            {stats.totalBlogs}
          </span>
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
            activeSection === "projects"
              ? "bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] text-white shadow-lg"
              : "text-[#5D6D4B] hover:bg-[#B1AB86]/10 hover:shadow-md"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <span className="font-semibold">Projects</span>
          <span className="bg-[#5D6D4B]/20 px-2 py-1 rounded-full font-bold text-[#5D6D4B] text-xs">
            {stats.totalProjects}
          </span>
        </button>
      </div>

      <div className="p-4 border-[#B1AB86]/20 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 hover:bg-red-500/10 p-4 rounded-2xl w-full text-red-500 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}
