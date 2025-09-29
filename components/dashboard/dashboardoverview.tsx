"use client";

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
          <div>
            <p className="font-medium text-[#7D8566] text-sm">Total Blogs</p>
            <p className="mt-2 font-bold text-[#5D6D4B] text-3xl">
              {stats.totalBlogs}
            </p>
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div>
            <p className="font-medium text-[#7D8566] text-sm">Published</p>
            <p className="mt-2 font-bold text-green-600 text-3xl">
              {stats.publishedBlogs}
            </p>
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div>
            <p className="font-medium text-[#7D8566] text-sm">Projects</p>
            <p className="mt-2 font-bold text-blue-600 text-3xl">
              {stats.totalProjects}
            </p>
          </div>
        </div>

        <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
          <div>
            <p className="font-medium text-[#7D8566] text-sm">Total Views</p>
            <p className="mt-2 font-bold text-purple-600 text-3xl">
              {stats.totalViews}
            </p>
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
                    {project.technologies?.slice(0, 2).join(", ") ||
                      "No technologies"}
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
