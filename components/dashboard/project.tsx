"use client";

import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  ownerId: string;
  createdAt: string;
}

interface ProjectManagementProps {
  projects: Project[];
  showDeleteAlert: (type: "project", project: Project) => void;
}

export default function ProjectManagement({
  projects,
  showDeleteAlert,
}: ProjectManagementProps) {
  return (
    <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl">
      <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-lg rounded-2xl w-14 h-14">
            <svg
              className="w-7 h-7 text-white"
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
            <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-2 font-bold text-[#1a1a1a] text-transparent text-4xl">
              Project Management
            </h1>
            <p className="text-[#7D8566] text-lg">
              Manage your projects and showcase your portfolio
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/create-project"
          className="group flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-[#5D6D4B]/25 hover:shadow-2xl hover:shadow-xl px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
        >
          <svg
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="transition-transform group-hover:translate-x-0.5 duration-300">
            New Project
          </span>
        </Link>
      </div>

      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 px-4 py-3 border border-[#B1AB86]/20 rounded-2xl">
            <div className="flex items-center space-x-2">
              <div className="bg-[#5D6D4B] rounded-full w-2 h-2"></div>
              <span className="font-semibold text-[#5D6D4B] text-lg">
                {projects.length} Project{projects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          {projects.length > 0 && (
            <div className="hidden md:flex items-center space-x-2 text-[#7D8566] text-sm">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>Click on projects to manage</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-white/80 px-4 py-2 border border-[#B1AB86]/30 rounded-xl">
            <span className="font-medium text-[#5D6D4B] text-sm">
              All Projects
            </span>
          </div>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#F8F7F2] shadow-lg hover:shadow-2xl border border-[#B1AB86]/30 hover:border-[#B1AB86]/50 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 transform"
            >
              <div className="relative overflow-hidden">
                {project.thumbnail ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 w-full h-48">
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                )}
                <div className="top-4 right-4 absolute bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-white text-xs">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="mb-3 font-bold text-[#5D6D4B] group-hover:text-[#4A5741] text-xl line-clamp-2 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-[#7D8566] text-sm line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#5D6D4B] hover:bg-[#4A5741] px-3 py-2 rounded-lg font-medium text-white text-xs hover:scale-105 transition-all duration-200 transform"
                    >
                      <svg
                        className="w-3 h-3"
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
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#B1AB86] hover:bg-[#9c946d] px-3 py-2 rounded-lg font-medium text-white text-xs hover:scale-105 transition-all duration-200 transform"
                    >
                      <svg
                        className="w-3 h-3"
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
                      <span>Source Code</span>
                    </a>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-[#B1AB86]/20 border-t">
                  <Link
                    href={`/dashboard/edit-project/${project.id}`}
                    className="group/edit flex items-center space-x-2 font-medium text-[#5D6D4B] hover:text-[#4A5741] text-sm hover:scale-105 transition-all duration-200 transform"
                  >
                    <svg
                      className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => showDeleteAlert("project", project)}
                    className="group/delete flex items-center space-x-2 font-medium text-red-500 hover:text-red-600 text-sm hover:scale-105 transition-all duration-200 transform"
                  >
                    <svg
                      className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="flex justify-center items-center bg-gradient-to-br from-[#5D6D4B]/10 to-[#B1AB86]/10 mx-auto mb-6 rounded-3xl w-24 h-24">
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
            No Projects Yet
          </h3>
          <p className="mx-auto mb-8 max-w-md text-[#7D8566] text-lg leading-relaxed">
            Start building your portfolio showcase. Create your first project to
            demonstrate your skills and accomplishments.
          </p>
          <Link
            href="/dashboard/create-project"
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-2xl px-10 py-5 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="transition-transform group-hover:translate-x-1 duration-300">
              Create Your First Project
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
