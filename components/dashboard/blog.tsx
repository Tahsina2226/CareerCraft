"use client";

import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  coverUrl?: string;
  published: boolean;
  createdAt: string;
}

interface BlogManagementProps {
  blogs: Blog[];
  stats: {
    publishedBlogs: number;
    draftBlogs: number;
  };
  togglePublishStatus: (blog: Blog) => void;
  showDeleteAlert: (type: "blog", blog: Blog) => void;
}

export default function BlogManagement({
  blogs,
  stats,
  togglePublishStatus,
  showDeleteAlert,
}: BlogManagementProps) {
  return (
    <div className="bg-white/95 shadow-lg backdrop-blur-sm p-6 border border-[#B1AB86]/30 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-2 font-bold text-[#1a1a1a] text-4xl">
            Blog Management
          </h1>
          <p className="text-[#7D8566] text-lg">
            Manage your blog posts and content
          </p>
        </div>
        <Link
          href="/dashboard/create-blog"
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
          <span>New Blog Post</span>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#1a1a1a] text-2xl">
          All Blog Posts ({blogs.length})
        </h3>
        <div className="flex space-x-3">
          <span className="bg-green-100 px-3 py-1 rounded-full font-medium text-green-800 text-sm">
            Published: {stats.publishedBlogs}
          </span>
          <span className="bg-yellow-100 px-3 py-1 rounded-full font-medium text-yellow-800 text-sm">
            Drafts: {stats.draftBlogs}
          </span>
        </div>
      </div>

      {blogs.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white hover:shadow-xl border border-[#B1AB86]/30 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 transform"
            >
              {blog.coverUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={blog.coverUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      blog.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[#7D8566] text-xs">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="mb-2 font-bold text-[#5D6D4B] text-lg line-clamp-2">
                  {blog.title}
                </h4>
                {blog.excerpt && (
                  <p className="mb-4 text-[#7D8566] text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}
                <div className="flex justify-between items-center pt-4 border-[#B1AB86]/20 border-t">
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/edit-blog/${blog.id}`}
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
                      onClick={() => togglePublishStatus(blog)}
                      className={`flex items-center space-x-1 text-sm font-medium ${
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
                      <span>{blog.published ? "Unpublish" : "Publish"}</span>
                    </button>
                  </div>
                  <button
                    onClick={() => showDeleteAlert("blog", blog)}
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="mb-4 font-bold text-[#5D6D4B] text-2xl">
            No blog posts yet
          </h3>
          <p className="mx-auto mb-8 max-w-md text-[#7D8566]">
            Start sharing your thoughts and ideas with the world. Create your
            first blog post to get started.
          </p>
          <Link
            href="/dashboard/create-blog"
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
            <span>Create Your First Post</span>
          </Link>
        </div>
      )}
    </div>
  );
}
