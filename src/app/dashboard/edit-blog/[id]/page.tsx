"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../../../utils/api";
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

export default function EditBlogPage() {
  const { token } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [charCount, setCharCount] = useState({
    title: 0,
    excerpt: 0,
    content: 0,
  });

  useEffect(() => {
    if (!id || !token) {
      router.push("/login");
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setExcerpt(blog.excerpt || "");
        setCoverUrl(blog.coverUrl || "");
        setPublished(blog.published);
        setCharCount({
          title: blog.title.length,
          excerpt: blog.excerpt?.length || 0,
          content: blog.content.length,
        });
      } catch {
        toast.error("Failed to load blog", {
          style: { background: "#D84A4A", color: "#fff" },
        });
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, token, router]);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "title":
        setTitle(value);
        setCharCount((prev) => ({ ...prev, title: value.length }));
        break;
      case "content":
        setContent(value);
        setCharCount((prev) => ({ ...prev, content: value.length }));
        break;
      case "excerpt":
        setExcerpt(value);
        setCharCount((prev) => ({ ...prev, excerpt: value.length }));
        break;
      case "coverUrl":
        setCoverUrl(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required", {
        style: { background: "#D84A4A", color: "#fff" },
      });
      return;
    }

    setLoading(true);
    try {
      await API.put(
        `/blogs/${id}`,
        { title, content, excerpt, coverUrl, published },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog updated successfully!", {
        style: { background: "#B1AB86", color: "#1a1a1a" },
      });
      router.push("/dashboard");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to update blog",
        {
          style: { background: "#D84A4A", color: "#fff" },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-12 min-h-screen overflow-hidden">
      <div className="top-0 left-0 absolute bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 absolute bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-white/80 shadow-lg mb-4 border border-[#B1AB86]/30 rounded-2xl w-16 h-16">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="mb-3 font-bold text-[#5D6D4B] text-4xl">
            Edit Blog Post
          </h1>
          <p className="mx-auto max-w-md text-[#7D8566] text-lg">
            Update your content and make it even better
          </p>
          <div className="bg-[#B1AB86] mx-auto mt-4 rounded-full w-20 h-1"></div>
        </div>

        <form
          className="space-y-6 bg-white/95 shadow-2xl hover:shadow-2xl backdrop-blur-sm p-8 sm:p-10 border border-[#B1AB86]/30 rounded-3xl transition-all duration-300 transform"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="flex justify-between items-center">
              <span className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
                Blog Title
              </span>
              <span
                className={`text-xs ${
                  charCount.title > 80 ? "text-red-400" : "text-[#7D8566]"
                }`}
              >
                {charCount.title}/80
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full font-medium text-[#1a1a1a] transition-all duration-200 placeholder-[#7D8566]/60"
              value={title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              maxLength={80}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex justify-between items-center">
              <span className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
                Content
              </span>
              <span className="text-[#7D8566] text-xs">
                {charCount.content} characters
              </span>
            </label>
            <textarea
              placeholder="Write your amazing content here... (Markdown supported)"
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full h-64 font-medium text-[#1a1a1a] leading-relaxed transition-all duration-200 resize-none placeholder-[#7D8566]/60"
              value={content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex justify-between items-center">
              <span className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
                Excerpt
              </span>
              <span
                className={`text-xs ${
                  charCount.excerpt > 160 ? "text-red-400" : "text-[#7D8566]"
                }`}
              >
                {charCount.excerpt}/160
              </span>
            </label>
            <input
              type="text"
              placeholder="Brief description of your blog... (optional)"
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full font-medium text-[#1a1a1a] transition-all duration-200 placeholder-[#7D8566]/60"
              value={excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              maxLength={160}
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
              Cover Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/cover-image.jpg (optional)"
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full font-medium text-[#1a1a1a] transition-all duration-200 placeholder-[#7D8566]/60"
              value={coverUrl}
              onChange={(e) => handleInputChange("coverUrl", e.target.value)}
            />
          </div>

          {coverUrl && (
            <div className="space-y-2">
              <label className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
                Cover Preview
              </label>
              <div className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 border-dashed rounded-xl">
                <div className="relative w-full h-32">
                  <Image
                    src={coverUrl}
                    alt="Cover preview"
                    fill
                    className="rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <p className="mt-2 text-[#7D8566] text-xs text-center">
                  Cover image preview
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center bg-[#F8F7F0] p-4 border border-[#B1AB86]/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  published ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                }`}
              ></div>
              <div>
                <span className="block font-semibold text-[#5D6D4B] text-sm">
                  {published ? "Published" : "Draft"}
                </span>
                <span className="text-[#7D8566] text-xs">
                  {published
                    ? "Blog is visible to everyone"
                    : "Only you can see this blog"}
                </span>
              </div>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={published}
                onChange={() => setPublished(!published)}
              />
              <div className="peer after:top-[2px] after:left-[2px] after:absolute bg-[#B1AB86]/50 after:bg-white peer-checked:bg-[#5D6D4B] after:border after:border-gray-300 peer-checked:after:border-white rounded-full after:rounded-full peer-focus:outline-none w-11 after:w-5 h-6 after:h-5 after:content-[''] after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <div className="flex sm:flex-row flex-col gap-4 pt-6 border-[#B1AB86]/20 border-t">
            <Link
              href="/dashboard"
              className="flex flex-1 justify-center items-center space-x-2 hover:bg-[#B1AB86]/10 disabled:opacity-50 px-6 py-4 border-[#B1AB86] border-2 rounded-xl font-semibold text-[#5D6D4B] text-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:cursor-not-allowed transform"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] hover:from-[#4A5741] hover:to-[#9c946d]"
              }`}
            >
              <div className="flex justify-center items-center space-x-2">
                {loading && (
                  <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                )}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{loading ? "Updating..." : "Update Blog Post"}</span>
              </div>
            </button>
          </div>

          <div className="pt-4 text-center">
            <p className="text-[#7D8566] text-xs">
              Pro tip: Use Markdown in your content for rich formatting
            </p>
          </div>
        </form>

        <div className="bg-white/80 shadow-lg backdrop-blur-sm mt-8 p-6 border border-[#B1AB86]/30 rounded-2xl">
          <h3 className="mb-4 font-semibold text-[#5D6D4B] text-lg">
            Quick Actions
          </h3>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            <Link
              href={`/blogs/${id}`}
              className="group flex items-center space-x-3 bg-white p-4 border border-[#B1AB86]/20 hover:border-[#B1AB86] rounded-xl transition-all duration-200"
            >
              <div className="flex justify-center items-center bg-blue-100 group-hover:bg-blue-200 rounded-lg w-10 h-10 transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              <div>
                <div className="font-medium text-[#5D6D4B]">View Post</div>
                <div className="text-[#7D8566] text-xs">See how it looks</div>
              </div>
            </Link>
            <button
              onClick={() => {
                setTitle(title + " - Updated");
                toast.success("Title updated!", {
                  style: { background: "#B1AB86", color: "#1a1a1a" },
                });
              }}
              className="group flex items-center space-x-3 bg-white p-4 border border-[#B1AB86]/20 hover:border-[#B1AB86] rounded-xl text-left transition-all duration-200"
            >
              <div className="flex justify-center items-center bg-green-100 group-hover:bg-green-200 rounded-lg w-10 h-10 transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[#5D6D4B]">Mark Updated</div>
                <div className="text-[#7D8566] text-xs">
                  Add &apos;Updated&apos; to title
                </div>
              </div>
            </button>
            <Link
              href="/dashboard/create-blog"
              className="group flex items-center space-x-3 bg-white p-4 border border-[#B1AB86]/20 hover:border-[#B1AB86] rounded-xl transition-all duration-200"
            >
              <div className="flex justify-center items-center bg-purple-100 group-hover:bg-purple-200 rounded-lg w-10 h-10 transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-purple-600"
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
              </div>
              <div>
                <div className="font-medium text-[#5D6D4B]">New Post</div>
                <div className="text-[#7D8566] text-xs">Create another</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}