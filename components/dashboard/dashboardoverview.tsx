"use client";

import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  coverUrl?: string;
  published: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  technologies?: string[];
  createdAt: string;
}

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalProjects: number;
  totalViews: number;
  totalLikes: number;
  monthlyViews: number[];
  monthlyLikes: number[];
}

interface DashboardOverviewProps {
  stats: DashboardStats;
  blogs: Blog[];
  projects: Project[];
  setActiveSection: (section: "dashboard" | "blogs" | "projects") => void;
}

export default function DashboardOverview({
  stats,
  blogs,
  projects,
  setActiveSection,
}: DashboardOverviewProps) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const maxViews = Math.max(...stats.monthlyViews);
  const maxLikes = Math.max(...stats.monthlyLikes);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2 font-bold text-[#1a1a1a] text-4xl">
            Dashboard Overview
          </h1>
          <p className="text-[#7D8566] text-lg">
            Welcome to your admin dashboard
          </p>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#7D8566] text-sm">Total Blogs</p>
              <p className="mt-2 font-bold text-[#5D6D4B] text-3xl">
                {stats.totalBlogs}
              </p>
            </div>
            <div className="flex justify-center items-center bg-[#5D6D4B]/10 rounded-2xl w-12 h-12">
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#7D8566] text-sm">Published</p>
              <p className="mt-2 font-bold text-green-600 text-3xl">
                {stats.publishedBlogs}
              </p>
            </div>
            <div className="flex justify-center items-center bg-green-100 rounded-2xl w-12 h-12">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#7D8566] text-sm">Projects</p>
              <p className="mt-2 font-bold text-blue-600 text-3xl">
                {stats.totalProjects}
              </p>
            </div>
            <div className="flex justify-center items-center bg-blue-100 rounded-2xl w-12 h-12">
              <svg
                className="w-6 h-6 text-blue-600"
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
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#7D8566] text-sm">Total Views</p>
              <p className="mt-2 font-bold text-purple-600 text-3xl">
                {stats.totalViews}
              </p>
            </div>
            <div className="flex justify-center items-center bg-purple-100 rounded-2xl w-12 h-12">
              <svg
                className="w-6 h-6 text-purple-600"
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
            </div>
          </div>
        </div>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <h3 className="mb-6 font-bold text-[#1a1a1a] text-xl">
            Monthly Views
          </h3>
          <div className="flex justify-between items-end space-x-2 h-48">
            {stats.monthlyViews.map((views, index) => (
              <div key={index} className="flex flex-col flex-1 items-center">
                <div
                  className="bg-gradient-to-t from-[#5D6D4B] to-[#B1AB86] hover:opacity-80 rounded-t-lg w-full transition-all duration-500"
                  style={{ height: `${(views / maxViews) * 80}%` }}
                ></div>
                <span className="mt-2 text-[#7D8566] text-xs">
                  {months[index]}
                </span>
                <span className="font-semibold text-[#5D6D4B] text-xs">
                  {views}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <h3 className="mb-6 font-bold text-[#1a1a1a] text-xl">
            Monthly Likes
          </h3>
          <div className="flex justify-between items-end space-x-2 h-48">
            {stats.monthlyLikes.map((likes, index) => (
              <div key={index} className="flex flex-col flex-1 items-center">
                <div
                  className="bg-gradient-to-t from-[#B1AB86] to-[#5D6D4B] hover:opacity-80 rounded-t-lg w-full transition-all duration-500"
                  style={{ height: `${(likes / maxLikes) * 80}%` }}
                ></div>
                <span className="mt-2 text-[#7D8566] text-xs">
                  {months[index]}
                </span>
                <span className="font-semibold text-[#5D6D4B] text-xs">
                  {likes}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1a1a1a] text-xl">
              Recent Blog Posts
            </h3>
            <button
              onClick={() => setActiveSection("blogs")}
              className="font-medium text-[#5D6D4B] hover:text-[#4A5741] text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {blogs.slice(0, 5).map((blog) => (
              <div
                key={blog.id}
                className="flex items-center space-x-4 hover:bg-[#B1AB86]/5 p-4 border border-[#B1AB86]/20 rounded-2xl transition-colors duration-200"
              >
                {blog.coverUrl && (
                  <img
                    src={blog.coverUrl}
                    alt={blog.title}
                    className="rounded-xl w-12 h-12 object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#5D6D4B] text-sm truncate">
                    {blog.title}
                  </h4>
                  <p className="text-[#7D8566] text-xs">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    blog.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
            {blogs.length === 0 && (
              <p className="py-8 text-[#7D8566] text-center">
                No blog posts yet
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1a1a1a] text-xl">
              Recent Projects
            </h3>
            <button
              onClick={() => setActiveSection("projects")}
              className="font-medium text-[#5D6D4B] hover:text-[#4A5741] text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center space-x-4 hover:bg-[#B1AB86]/5 p-4 border border-[#B1AB86]/20 rounded-2xl transition-colors duration-200"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="rounded-xl w-12 h-12 object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#5D6D4B] text-sm truncate">
                    {project.title}
                  </h4>
                  <p className="text-[#7D8566] text-xs">
                    {project.technologies && project.technologies.length > 0
                      ? project.technologies.slice(0, 2).join(", ")
                      : "No technologies"}
                  </p>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="py-8 text-[#7D8566] text-center">No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
