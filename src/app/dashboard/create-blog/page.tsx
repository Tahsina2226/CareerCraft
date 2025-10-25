"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import API from "../../../../utils/api";
import toast from "react-hot-toast";
import Image from "next/image";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function CreateBlogPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState({
    title: 0,
    excerpt: 0,
    content: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content)
      return toast.error("Title and content are required");

    setLoading(true);
    try {
      await API.post(
        "/blogs",
        { title, content, excerpt, coverUrl, published },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog created successfully!", {
        style: { background: "#B1AB86", color: "#1a1a1a" },
      });
      router.push("/dashboard");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Failed to create blog", {
        style: { background: "#D84A4A", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  return (
    <div
      className="relative px-4 sm:px-6 lg:px-8 py-12 min-h-screen overflow-hidden"
      style={{ backgroundColor: "#B8C4A9" }}
    >
      {/* Background Decorations */}
      <div className="top-0 left-0 absolute bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 absolute bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative mx-auto max-w-2xl">
        {/* Header Section */}
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
            Create New Blog
          </h1>
          <p className="mx-auto max-w-md text-[#7D8566] text-lg">
            Share your thoughts and ideas with the world
          </p>
          <div className="bg-[#B1AB86] mx-auto mt-4 rounded-full w-20 h-1"></div>
        </div>

        <form
          className="space-y-6 bg-white/95 shadow-2xl hover:shadow-2xl backdrop-blur-sm p-8 sm:p-10 border border-[#B1AB86]/30 rounded-3xl transition-all duration-300 transform"
          onSubmit={handleSubmit}
        >
          {/* Title Field */}
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

          {/* Content Field */}
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
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full h-48 font-medium text-[#1a1a1a] leading-relaxed transition-all duration-200 resize-none placeholder-[#7D8566]/60"
              value={content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              required
            />
          </div>

          {/* Excerpt Field */}
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

          {/* Cover URL Field */}
          <div className="space-y-2">
            <label className="font-semibold text-[#5D6D4B] text-sm uppercase tracking-wide">
              Cover Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/cover-image.jpg (optional)"
              className="bg-white/50 p-4 border-[#B1AB86]/30 border-2 focus:border-[#B1AB86] rounded-xl focus:outline-none focus:ring-[#B1AB86]/20 focus:ring-2 w-full font-medium text-[#1a1a1a] transition-all duration-200 placeholder-[#7D8566]/60"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
            />
          </div>

          {/* Preview of Cover Image */}
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

          {/* Publish Toggle */}
          <div className="flex justify-between items-center bg-[#F8F7F0] p-4 border border-[#B1AB86]/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  published ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                }`}
              ></div>
              <div>
                <span className="block font-semibold text-[#5D6D4B] text-sm">
                  {published ? "Publish Immediately" : "Save as Draft"}
                </span>
                <span className="text-[#7D8566] text-xs">
                  {published
                    ? "Blog will be visible to everyone"
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

          {/* Action Buttons */}
          <div className="flex sm:flex-row flex-col gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="flex-1 hover:bg-[#B1AB86]/10 disabled:opacity-50 px-6 py-4 border-[#B1AB86] border-2 rounded-xl font-semibold text-[#5D6D4B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:cursor-not-allowed transform"
            >
              Cancel
            </button>
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
                <span>
                  {loading
                    ? published
                      ? "Publishing..."
                      : "Saving..."
                    : published
                    ? "Publish Blog"
                    : "Save as Draft"}
                </span>
                {!loading && (
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
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* Help Text */}
          <div className="pt-4 border-[#B1AB86]/20 border-t text-center">
            <p className="text-[#7D8566] text-xs">
              Pro tip: Use Markdown in your content for rich formatting
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
