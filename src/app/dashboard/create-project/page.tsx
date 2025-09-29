"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import API from "../../../../utils/api";
import toast from "react-hot-toast";

export default function CreateProjectPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await API.post(
        "/projects",
        { title, description, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-8 max-w-3xl">
      <h1 className="mb-4 font-bold text-2xl">Create Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="p-2 border rounded h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Project Link"
          className="p-2 border rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
