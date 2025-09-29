"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="top-0 left-0 fixed bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 fixed bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="flex justify-center items-center bg-white/80 shadow-lg border border-[#B1AB86]/30 rounded-2xl w-16 h-16">
              <svg
                className="w-8 h-8 text-[#5D6D4B]"
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
              <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-2 font-bold text-[#5D6D4B] text-transparent text-5xl">
                Project Portfolio
              </h1>
              <p className="text-[#7D8566] text-xl">
                Discover my collection of creative and technical projects
              </p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm px-6 py-3 border border-[#B1AB86]/30 rounded-2xl">
            <div className="flex items-center space-x-2">
              <div className="bg-[#5D6D4B] rounded-full w-3 h-3"></div>
              <span className="font-semibold text-[#5D6D4B]">
                {projects.length} Project{projects.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="bg-[#B1AB86]/30 w-px h-6"></div>
            <div className="text-[#7D8566]">
              Showcasing innovation and creativity
            </div>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white/95 shadow-2xl hover:shadow-2xl backdrop-blur-sm border border-[#B1AB86]/30 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 transform"
              >
                <div className="relative overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 w-full h-56">
                      <svg
                        className="w-16 h-16 text-[#B1AB86]"
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
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="top-4 right-4 absolute bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-white text-sm">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-3 font-bold text-[#5D6D4B] group-hover:text-[#4A5741] text-xl line-clamp-2 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-[#7D8566] text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies
                            .slice(0, 4)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 px-3 py-1 border border-[#B1AB86]/30 rounded-full font-medium text-[#5D6D4B] text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 4 && (
                            <span className="bg-[#B1AB86]/20 px-3 py-1 rounded-full font-medium text-[#7D8566] text-xs">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/live inline-flex flex-1 justify-center items-center space-x-2 bg-[#5D6D4B] hover:bg-[#4A5741] px-4 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-200 transform"
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/repo inline-flex flex-1 justify-center items-center space-x-2 bg-[#B1AB86] hover:bg-[#9c946d] px-4 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-200 transform"
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
                    <div className="flex items-center space-x-2 text-[#7D8566] text-sm">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Project</span>
                    </div>
                    <div className="text-[#7D8566] text-sm">Featured</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-16 border border-[#B1AB86]/30 rounded-3xl text-center">
            <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 mx-auto mb-8 rounded-3xl w-24 h-24">
              <svg
                className="w-12 h-12 text-[#B1AB86]"
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
            <h3 className="mb-4 font-bold text-[#5D6D4B] text-3xl">
              Portfolio Coming Soon
            </h3>
            <p className="mx-auto mb-8 max-w-md text-[#7D8566] text-lg leading-relaxed">
              I'm currently working on some amazing projects. Check back soon to
              see my latest work and innovations.
            </p>
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B]/10 to-[#B1AB86]/10 px-6 py-4 border border-[#B1AB86]/30 rounded-2xl">
              <div className="bg-[#5D6D4B] rounded-full w-2 h-2 animate-pulse"></div>
              <span className="font-semibold text-[#5D6D4B]">
                Projects in progress
              </span>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-4 border border-[#B1AB86]/30 rounded-2xl">
            <svg
              className="w-5 h-5 text-[#5D6D4B]"
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
            <span className="text-[#7D8566]">
              Interested in collaboration? Let's build something amazing
              together!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
