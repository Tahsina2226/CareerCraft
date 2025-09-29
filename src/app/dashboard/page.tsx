"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import API from "../../../utils/api";
import toast from "react-hot-toast";

interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
}

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return router.push("/login");

    API.get("/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStats(res.data))
      .catch(() => {
        logout();
        router.push("/login");
      });

    API.get("/blogs").then((res) => setBlogs(res.data));
  }, [token]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully!");
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="mb-4 font-bold text-2xl">Owner Dashboard</h1>

      <div className="mb-6">
        <h2 className="font-semibold text-xl">Stats</h2>
        <p>Total Blogs: {stats.blogsCount}</p>
        <p>Total Projects: {stats.projectsCount}</p>
      </div>

      <div>
        <h2 className="mb-2 font-semibold text-xl">Manage Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="flex justify-between mb-2 p-2 border rounded">
              <span>{blog.title}</span>
              <div>
                <button
                  onClick={() => router.push(`/dashboard/edit-blog/${blog.id}`)}
                  className="bg-yellow-400 mr-2 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
