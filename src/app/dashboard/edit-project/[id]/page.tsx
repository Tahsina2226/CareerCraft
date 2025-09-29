"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../../../utils/api"
import toast from "react-hot-toast";

export default function EditProjectPage() {
  const { token } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !id) return;
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLink(res.data.link);
      } catch {
        toast.error("Failed to load project");
      }
    };
    fetchProject();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      await API.put(
        `/projects/${id}`,
        { title, description, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Project updated successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-8 max-w-3xl">
      <h1 className="mb-4 font-bold text-2xl">Edit Project</h1>
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
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}
