"use client";

import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
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
    <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2 font-bold text-[#1a1a1a] text-4xl">
            Project Management
          </h1>
          <p className="text-[#7D8566] text-lg">
            Manage your projects and portfolio
          </p>
        </div>
        <Link
          href="/dashboard/create-project"
          className="group flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-6 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>New Project</span>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#1a1a1a] text-2xl">
          All Projects ({projects.length})
        </h3>
      </div>

      {projects.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white hover:shadow-xl border border-[#B1AB86]/30 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 transform"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#7D8566] text-xs">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="mb-2 font-bold text-[#5D6D4B] text-lg line-clamp-2">
                  {project.title}
                </h4>
                {project.description && (
                  <p className="mb-4 text-[#7D8566] text-sm line-clamp-2">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies &&
                    project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#5D6D4B]/10 px-2 py-1 rounded-full font-medium text-[#5D6D4B] text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="bg-[#B1AB86]/10 px-2 py-1 rounded-full font-medium text-[#7D8566] text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-[#B1AB86]/20 border-t">
                  <Link
                    href={`/dashboard/edit-project/${project.id}`}
                    className="flex items-center space-x-1 font-medium text-[#5D6D4B] hover:text-[#4A5741] text-sm"
                  >
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => showDeleteAlert("project", project)}
                    className="flex items-center space-x-1 font-medium text-red-500 hover:text-red-600 text-sm"
                  >
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
        <div className="py-16 text-center">
          <div className="flex justify-center items-center bg-[#5D6D4B]/10 mx-auto mb-6 rounded-3xl w-24 h-24">
            <svg
              className="w-12 h-12 text-[#5D6D4B]/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="mb-4 font-bold text-[#5D6D4B] text-2xl">
            No projects yet
          </h3>
          <p className="mx-auto mb-8 max-w-md text-[#7D8566]">
            Showcase your work and skills. Create your first project to get
            started.
          </p>
          <Link
            href="/dashboard/create-project"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create Your First Project</span>
          </Link>
        </div>
      )}
    </div>
  );
}
