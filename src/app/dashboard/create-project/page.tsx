"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import API from "../../../../utils/api";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function CreateProjectPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const showSuccessAlert = () => {
    toast.success(
      <div className="flex items-center space-x-3">
        <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
          <svg
            className="w-5 h-5 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-green-800">
            Project Created Successfully! 🎉
          </p>
          <p className="text-green-600 text-sm">
            Your project is now live and visible to others
          </p>
        </div>
      </div>,
      {
        duration: 4000,
        style: {
          background: "#ECFDF5",
          border: "2px solid #10B981",
          borderRadius: "12px",
          padding: "16px",
        },
        icon: false,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await API.post(
        "/projects",
        {
          title,
          description,
          liveUrl,
          repoUrl,
          thumbnail,
          technologies,
          ownerId: user?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccessAlert();

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        <div className="flex items-center space-x-3">
          <div className="flex justify-center items-center bg-red-100 rounded-full w-8 h-8">
            <svg
              className="w-5 h-5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-red-800">Creation Failed!</p>
            <p className="text-red-600 text-sm">
              {apiError.response?.data?.message || "Please try again"}
            </p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: "#FEF2F2",
            border: "2px solid #EF4444",
            borderRadius: "12px",
            padding: "16px",
          },
          icon: false,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="top-0 left-0 fixed bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 fixed bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center space-x-2 mb-6 font-medium text-[#5D6D4B] hover:text-[#4A5741] transition-all duration-300"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300 transform"
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
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="flex justify-center items-center bg-white/80 shadow-lg border border-[#B1AB86]/30 rounded-xl w-12 h-12">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-4xl">
              Create Project
            </h1>
          </div>
          <p className="text-[#7D8566] text-lg">
            Bring your project to life with all the details
          </p>
        </div>

        <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 font-semibold text-[#5D6D4B] text-lg">
                Project Title *
              </label>
              <input
                type="text"
                placeholder="Enter your amazing project title..."
                className="bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold text-[#5D6D4B] text-lg">
                Project Description *
              </label>
              <textarea
                placeholder="Describe what makes your project special..."
                className="bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full h-32 text-[#1a1a1a] transition-all duration-300 resize-none placeholder-[#7D8566]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-3 font-semibold text-[#5D6D4B]">
                  <div className="flex items-center space-x-2">
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span>Live Demo URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  placeholder="https://demo.your-project.com"
                  className="bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-3 font-semibold text-[#5D6D4B]">
                  <div className="flex items-center space-x-2">
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span>Repository URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  className="bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-[#5D6D4B]">
                <div className="flex items-center space-x-2">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Thumbnail Image URL</span>
                </div>
              </label>
              <input
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 w-full text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold text-[#5D6D4B] text-lg">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] px-3 py-1 rounded-full font-medium text-white text-sm"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-red-200 transition-colors duration-200"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Add a technology (React, Node.js, MongoDB...)"
                  className="flex-1 bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 transform"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-4 pt-6 border-[#B1AB86]/30 border-t">
              <button
                type="button"
                onClick={() => {
                  if (
                    title ||
                    description ||
                    liveUrl ||
                    repoUrl ||
                    thumbnail ||
                    technologies.length > 0
                  ) {
                    if (
                      window.confirm(
                        "Are you sure? All unsaved changes will be lost."
                      )
                    ) {
                      router.push("/dashboard");
                    }
                  } else {
                    router.push("/dashboard");
                  }
                }}
                className="flex flex-1 justify-center items-center space-x-2 hover:bg-[#B1AB86]/10 py-4 border-[#B1AB86] border-2 rounded-xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all duration-300 transform"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex justify-center items-center space-x-2 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] hover:from-[#4A5741] hover:to-[#9c946d]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                    <span>Creating Project...</span>
                  </>
                ) : (
                  <>
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Launch Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {(title || description || thumbnail) && (
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm mt-8 p-8 border border-[#B1AB86]/30 rounded-3xl">
            <h3 className="mb-6 font-bold text-[#5D6D4B] text-2xl text-center">
              Project Preview
            </h3>
            <div className="bg-white border border-[#B1AB86]/30 rounded-2xl overflow-hidden">
              {thumbnail && (
                <div className="relative w-full h-48">
                  <Image
                    src={thumbnail}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h4 className="mb-3 font-bold text-[#5D6D4B] text-xl">
                  {title || "Project Title"}
                </h4>
                <p className="mb-4 text-[#7D8566]">
                  {description || "Project description will appear here..."}
                </p>

                {(liveUrl || repoUrl) && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-[#5D6D4B] hover:bg-[#4A5741] px-4 py-2 rounded-lg text-white transition-colors duration-200"
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-[#B1AB86] hover:bg-[#9c946d] px-4 py-2 rounded-lg text-white transition-colors duration-200"
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
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#5D6D4B]/10 px-3 py-1 rounded-full font-medium text-[#5D6D4B] text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}