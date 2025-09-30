"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../../../utils/api";
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

export default function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        toast.error("Failed to load project details");
        router.push("/projects");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-[#5D6D4B] text-2xl">
            Project not found
          </h2>
          <button
            onClick={() => router.push("/projects")}
            className="bg-[#5D6D4B] hover:bg-[#4A5741] px-6 py-3 rounded-xl font-semibold text-white transition-colors duration-200"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="top-0 left-0 fixed bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 fixed bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/projects")}
            className="group inline-flex items-center space-x-3 bg-white/80 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm px-6 py-3 border border-[#B1AB86]/30 rounded-2xl transition-all duration-300"
          >
            <svg
              className="w-5 h-5 text-[#5D6D4B] transition-transform group-hover:-translate-x-1 duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-semibold text-[#5D6D4B]">
              Back to Projects
            </span>
          </button>
        </div>

        {/* Project Details Card */}
        <div className="bg-white/95 shadow-2xl backdrop-blur-sm border border-[#B1AB86]/30 rounded-3xl overflow-hidden">
          {/* Thumbnail */}
          {project.thumbnail && (
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <span className="bg-[#5D6D4B]/10 px-3 py-1 rounded-full font-medium text-[#5D6D4B] text-sm">
                Created{" "}
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="mb-4 font-bold text-[#5D6D4B] text-4xl">
              {project.title}
            </h1>

            <p className="mb-8 text-[#7D8566] text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 font-semibold text-[#5D6D4B] text-xl">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] px-4 py-2 rounded-xl font-semibold text-white text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex sm:flex-row flex-col gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-1 justify-center items-center space-x-3 bg-[#5D6D4B] hover:bg-[#4A5741] px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-200 transform"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>View Live Demo</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-1 justify-center items-center space-x-3 bg-[#B1AB86] hover:bg-[#9c946d] px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-200 transform"
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <span>View Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white/80 backdrop-blur-sm mt-8 p-6 border border-[#B1AB86]/30 rounded-2xl">
          <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Project ID: {project.id.slice(0, 8)}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
