"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [deleteAlert, setDeleteAlert] = useState<{
    show: boolean;
    blog: Blog | null;
  }>({
    show: false,
    blog: null,
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);

        // Calculate stats
        const publishedCount = res.data.filter(
          (blog: Blog) => blog.published
        ).length;
        setStats({
          total: res.data.length,
          published: publishedCount,
          drafts: res.data.length - publishedCount,
        });
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token, router]);

  const showDeleteAlert = (blog: Blog) => {
    setDeleteAlert({ show: true, blog });
  };

  const hideDeleteAlert = () => {
    setDeleteAlert({ show: false, blog: null });
  };

  const handleDeleteBlog = async () => {
    if (!token || !deleteAlert.blog) return;

    try {
      await API.delete(`/blogs/${deleteAlert.blog.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b.id !== deleteAlert.blog!.id));
      toast.success("Blog deleted successfully!", {
        style: { background: "#B1AB86", color: "#1a1a1a" },
        icon: "🗑️",
      });
    } catch {
      toast.error("Failed to delete blog", {
        style: { background: "#D84A4A", color: "#fff" },
      });
    } finally {
      hideDeleteAlert();
    }
  };

  const togglePublishStatus = async (blog: Blog) => {
    if (!token) return;

    try {
      await API.patch(
        `/blogs/${blog.id}`,
        { published: !blog.published },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...b, published: !b.published } : b
        )
      );

      toast.success(
        blog.published ? "Blog moved to drafts" : "Blog published!",
        { 
          style: { background: "#B1AB86", color: "#1a1a1a" },
          icon: blog.published ? "📝" : "🎉"
        }
      );
    } catch {
      toast.error("Failed to update blog status", {
        style: { background: "#D84A4A", color: "#fff" },
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Fancy Delete Alert */}
      {deleteAlert.show && deleteAlert.blog && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm mx-auto p-8 border border-[#B1AB86]/30 rounded-3xl w-full max-w-md animate-scale-in transform">
            {/* Alert Header */}
            <div className="mb-6 text-center">
              <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-2xl w-16 h-16">
                <svg
                  className="w-8 h-8 text-red-500"
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
              </div>
              <h3 className="mb-2 font-bold text-[#1a1a1a] text-2xl">
                Delete Blog Post
              </h3>
              <p className="text-[#7D8566]">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
            </div>

            {/* Blog Preview */}
            <div className="bg-red-50/50 mb-6 p-4 border border-red-200 rounded-2xl">
              <div className="flex items-center space-x-3">
                {deleteAlert.blog.coverUrl && (
                  <img
                    src={deleteAlert.blog.coverUrl}
                    alt={deleteAlert.blog.title}
                    className="rounded-lg w-12 h-12 object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#5D6D4B] text-sm truncate">
                    {deleteAlert.blog.title}
                  </h4>
                  <p className="text-[#7D8566] text-xs">
                    Created {new Date(deleteAlert.blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    deleteAlert.blog.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {deleteAlert.blog.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-50/80 mb-6 p-4 border border-yellow-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <svg
                  className="flex-shrink-0 mt-0.5 w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-yellow-800 text-sm">
                    This action is permanent
                  </p>
                  <p className="mt-1 text-yellow-700 text-xs">
                    All content, comments, and analytics data will be permanently removed.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex sm:flex-row flex-col gap-3">
              <button
                onClick={hideDeleteAlert}
                className="flex flex-1 justify-center items-center space-x-2 hover:bg-[#B1AB86]/10 px-6 py-3 border-[#B1AB86] border-2 rounded-xl font-semibold text-[#5D6D4B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 transform"
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
                onClick={handleDeleteBlog}
                className="flex flex-1 justify-center items-center space-x-2 bg-gradient-to-r from-red-500 hover:from-red-600 to-red-600 hover:to-red-700 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-bold text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 transform"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Delete Forever</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Decorations */}
      <div className="top-0 right-0 absolute bg-[#5D6D4B] opacity-5 rounded-full w-64 h-64 -translate-y-32 translate-x-32"></div>
      <div className="bottom-0 left-0 absolute bg-[#B1AB86] opacity-5 rounded-full w-80 h-80 -translate-x-32 translate-y-32"></div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex justify-center items-center bg-white/90 shadow-lg border border-[#B1AB86]/30 rounded-xl w-10 h-10">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-[#1a1a1a] text-4xl">Dashboard</h1>
            </div>
            <p className="text-[#5D6D4B] text-lg">
              Manage your blog posts and content
            </p>
          </div>

          <div className="flex sm:flex-row flex-col gap-3">
            <Link
              href="/dashboard/create-blog"
              className="group flex justify-center items-center space-x-2 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
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
              <span>New Blog Post</span>
            </Link>
            <button
              onClick={logout}
              className="group flex justify-center items-center space-x-2 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl px-6 py-3 border border-[#B1AB86]/30 rounded-xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all duration-300 transform"
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
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">
          <div className="bg-white/90 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-[#7D8566] text-sm">
                  Total Posts
                </p>
                <p className="mt-1 font-bold text-[#5D6D4B] text-3xl">
                  {stats.total}
                </p>
              </div>
              <div className="flex justify-center items-center bg-[#5D6D4B]/10 rounded-xl w-12 h-12">
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

          <div className="bg-white/90 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-[#7D8566] text-sm">Published</p>
                <p className="mt-1 font-bold text-[#5D6D4B] text-3xl">
                  {stats.published}
                </p>
              </div>
              <div className="flex justify-center items-center bg-green-100 rounded-xl w-12 h-12">
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

          <div className="bg-white/90 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-[#7D8566] text-sm">Drafts</p>
                <p className="mt-1 font-bold text-[#5D6D4B] text-3xl">
                  {stats.drafts}
                </p>
              </div>
              <div className="flex justify-center items-center bg-yellow-100 rounded-xl w-12 h-12">
                <svg
                  className="w-6 h-6 text-yellow-600"
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
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="bg-white/80 shadow-2xl backdrop-blur-sm p-6 sm:p-8 border border-[#B1AB86]/30 rounded-3xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center mb-8">
            <div>
              <h2 className="mb-2 font-bold text-[#1a1a1a] text-2xl">
                Your Blog Posts
              </h2>
              <p className="text-[#7D8566]">
                Create, edit, and manage your content
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="bg-[#5D6D4B]/10 px-3 py-1 rounded-full font-medium text-[#5D6D4B] text-sm">
                {blogs.length} post{blogs.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {blogs.length > 0 ? (
            <div className="gap-6 grid lg:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group bg-white shadow-lg hover:shadow-2xl border border-[#B1AB86]/30 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 transform"
                >
                  {/* Cover Image */}
                  {blog.coverUrl ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.coverUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="top-3 right-3 absolute">
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
                    </div>
                  ) : (
                    <div className="relative bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] h-48">
                      <div className="top-3 right-3 absolute">
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
                      <div className="flex justify-center items-center h-full">
                        <svg
                          className="w-12 h-12 text-white/70"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 font-bold text-[#5D6D4B] group-hover:text-[#4A5741] text-lg line-clamp-2 transition-colors duration-200">
                      {blog.title}
                    </h3>

                    {blog.excerpt && (
                      <p className="mb-4 text-[#7D8566] text-sm line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="flex justify-between items-center mb-4 text-[#7D8566] text-xs">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>{blog.author.name}</span>
                      </div>
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
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-[#B1AB86]/20 border-t">
                      <div className="flex space-x-3">
                        <Link
                          href={`/dashboard/edit-blog/${blog.id}`}
                          className="group/edit flex items-center space-x-1 text-[#5D6D4B] hover:text-[#4A5741] transition-colors duration-200"
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
                          <span className="font-medium text-sm">Edit</span>
                        </Link>

                        <button
                          onClick={() => togglePublishStatus(blog)}
                          className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                            blog.published
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {blog.published ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            )}
                          </svg>
                          <span>
                            {blog.published ? "Unpublish" : "Publish"}
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() => showDeleteAlert(blog)}
                        className="group/delete flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-200"
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
                        <span className="font-medium text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mb-3 font-bold text-[#5D6D4B] text-2xl">
                No blog posts yet
              </h3>
              <p className="mx-auto mb-8 max-w-md text-[#7D8566]">
                Start sharing your thoughts and ideas with the world. Create
                your first blog post to get started.
              </p>
              <Link
                href="/dashboard/create-blog"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
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
                <span>Create Your First Post</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}