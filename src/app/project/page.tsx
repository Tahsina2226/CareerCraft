"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/api";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  technologies?: string[];
  ownerId: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <div className="relative flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885] min-h-screen overflow-hidden">
        <div className="top-1/4 left-1/4 absolute bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 animate-pulse"></div>
        <div className="right-1/3 bottom-1/3 absolute bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 animate-pulse delay-1000"></div>
        <div className="top-1/2 right-1/4 absolute bg-[#7D8566] opacity-5 rounded-full w-64 h-64 animate-pulse delay-500"></div>

        <div className="z-10 relative text-center">
          <div className="relative mx-auto mb-6">
            <div className="border-[#5D6D4B] border-t-2 border-r-2 rounded-full w-20 h-20 animate-spin"></div>
            <div className="top-1/2 left-1/2 absolute border-[#B1AB86] border-b-2 border-l-2 rounded-full w-12 h-12 -translate-x-1/2 -translate-y-1/2 animate-spin transform"></div>
          </div>
          <p className="mb-2 font-semibold text-[#5D6D4B] text-lg">
            Loading projects...
          </p>
          <p className="text-[#7D8566] text-sm">
            Preparing your creative journey
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-[#B8C4A9] via-[#A8B497] to-[#9CA885] px-4 sm:px-6 lg:px-8 py-8 min-h-screen overflow-hidden">
      <div className="top-0 left-0 absolute bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="right-0 bottom-0 absolute bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2 animate-float-delayed"></div>
      <div className="top-1/2 left-1/2 absolute bg-[#7D8566] opacity-3 rounded-full w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow transform"></div>

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-[#5D6D4B] opacity-10 rounded-full"
          style={{
            width: Math.random() * 20 + 5 + "px",
            height: Math.random() * 20 + 5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animation: `float ${
              Math.random() * 20 + 10
            }s infinite ease-in-out ${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl">
        <div className="relative mb-16 text-center">
          <div className="inline-block relative mb-8">
            <div className="absolute -inset-4 bg-white/30 opacity-50 blur-lg rounded-3xl"></div>
            <div className="relative flex justify-center items-center space-x-6 bg-white/90 shadow-2xl backdrop-blur-xl px-8 py-6 border border-[#B1AB86]/40 rounded-3xl">
              <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#7D8566] shadow-lg border border-[#B1AB86]/50 rounded-2xl w-20 h-20 rotate-3 transform">
                <svg
                  className="w-10 h-10 text-white -rotate-3 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] via-[#6B7A55] to-[#7D8566] mb-3 font-bold text-transparent text-5xl lg:text-6xl tracking-tight">
                  Project Portfolio
                </h1>
                <p className="font-light text-[#7D8566] text-xl lg:text-2xl">
                  Discover my collection of creative and technical projects
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-8 bg-white/80 shadow-lg backdrop-blur-lg px-8 py-4 border border-[#B1AB86]/40 rounded-2xl hover:scale-105 transition-transform duration-300 transform">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute bg-[#5D6D4B] rounded-full w-4 h-4 animate-ping"></div>
                <div className="relative bg-[#5D6D4B] rounded-full w-4 h-4"></div>
              </div>
              <span className="font-bold text-[#5D6D4B] text-lg">
                {projects.length} Project{projects.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="bg-[#B1AB86]/40 w-px h-8"></div>
            <div className="flex items-center space-x-2 text-[#7D8566]">
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
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span className="font-medium">Click any project to explore</span>
            </div>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="relative gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectClick(project.id)}
                className="group relative bg-white/95 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-[#B1AB86]/30 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer transform"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    hoveredProject === project.id ? "animate-pulse" : ""
                  }`}
                ></div>

                <div className="relative overflow-hidden">
                  {project.thumbnail ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                    </div>
                  ) : (
                    <div className="relative flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 via-[#B1AB86]/10 to-[#7D8566]/10 w-full h-56">
                      <svg
                        className="w-20 h-20 text-[#B1AB86] group-hover:scale-110 transition-transform duration-500 transform"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30"></div>
                    </div>
                  )}

                  <div className="top-4 right-4 absolute bg-black/90 shadow-lg backdrop-blur-sm px-4 py-2 rounded-2xl font-semibold text-white text-sm group-hover:scale-105 transition-transform duration-300 transform">
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="bottom-4 left-4 absolute opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 transform">
                    <div className="flex items-center space-x-2 bg-white/95 shadow-lg backdrop-blur-sm px-4 py-3 border border-[#B1AB86]/30 rounded-xl">
                      <span className="font-bold text-[#5D6D4B] text-sm">
                        Explore Project
                      </span>
                      <svg
                        className="w-4 h-4 text-[#5D6D4B] transition-transform group-hover:translate-x-1 duration-300 transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative p-6">
                  <h3 className="group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5D6D4B] group-hover:to-[#7D8566] mb-3 font-bold text-[#5D6D4B] group-hover:text-transparent text-xl line-clamp-2 leading-tight transition-all duration-500">
                    {project.title}
                  </h3>

                  <p className="mb-4 font-light text-[#7D8566] text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 px-3 py-1.5 border border-[#B1AB86]/30 rounded-full font-medium text-[#5D6D4B] text-xs group-hover:scale-105 transition-transform duration-300 transform"
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="bg-[#B1AB86]/20 px-3 py-1.5 rounded-full font-medium text-[#7D8566] text-xs group-hover:scale-105 transition-transform duration-300 transform">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/live inline-flex flex-1 justify-center items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#6B7A55] hover:to-[#5D6D4B] shadow-lg hover:shadow-xl px-5 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
                      >
                        <svg
                          className="w-4 h-4 group-hover/live:scale-110 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/repo inline-flex flex-1 justify-center items-center space-x-3 bg-gradient-to-r from-[#B1AB86] hover:from-[#9c946d] to-[#C4BC92] hover:to-[#B1AB86] shadow-lg hover:shadow-xl px-5 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
                      >
                        <svg
                          className="w-4 h-4 group-hover/repo:scale-110 transition-transform duration-300"
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
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-[#B1AB86]/20 border-t">
                    <div className="flex items-center space-x-2 font-medium text-[#7D8566] text-sm">
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>View Details</span>
                    </div>
                    <div className="flex items-center space-x-2 font-medium text-[#7D8566] group-hover:text-[#5D6D4B] text-sm transition-colors duration-300">
                      <span>Explore</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-16 border border-[#B1AB86]/30 rounded-3xl text-center hover:scale-[1.01] transition-transform duration-500 transform">
            <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 mx-auto mb-8 rounded-3xl w-24 h-24 hover:scale-110 transition-transform duration-500 transform">
              <svg
                className="w-12 h-12 text-[#B1AB86] hover:scale-110 transition-transform duration-500 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="mb-4 font-bold text-[#5D6D4B] text-3xl lg:text-4xl">
              Portfolio Coming Soon
            </h3>
            <p className="mx-auto mb-8 max-w-md font-light text-[#7D8566] text-lg leading-relaxed">
              I'm currently working on some amazing projects. Check back soon to
              see my latest work and innovations.
            </p>
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 px-6 py-4 border border-[#B1AB86]/30 rounded-2xl hover:scale-105 transition-transform duration-300 transform">
              <div className="bg-[#5D6D4B] rounded-full w-2 h-2 animate-pulse"></div>
              <span className="font-semibold text-[#5D6D4B]">
                Projects in progress
              </span>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 shadow-lg backdrop-blur-lg px-8 py-4 border border-[#B1AB86]/40 rounded-2xl hover:scale-105 transition-transform duration-300 transform">
            <svg
              className="w-6 h-6 text-[#5D6D4B]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-[#7D8566]">
              Click on any project card to view detailed information and case
              study
            </span>
          </div>
        </div>
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
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.06;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
