"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../../utils/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/slug/${slug}`);
        setProject(res.data);
      } catch (err) {
        toast.error("Project not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!project) return <p className="p-8">Project not found.</p>;

  return (
    <div className="mx-auto p-8 max-w-3xl">
      <h1 className="mb-4 font-bold text-3xl">{project.title}</h1>
      <p className="mb-6 text-gray-600">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech, i) => (
          <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
        >
          View Project
        </a>
      )}
    </div>
  );
}
