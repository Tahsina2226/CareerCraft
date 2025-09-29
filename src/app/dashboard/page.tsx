"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import Sidebar from "../../../components/dashboard/sidebar";
import DashboardOverview from "../../../components/dashboard/dashboardoverview";
import BlogManagement from "../../../components/dashboard/blog";
import ProjectManagement from "../../../components/dashboard/project";
import DeleteAlert from "../../../components/dashboard/DeleteAlert";

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
  views?: number;
  likes?: number;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
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

export default function AdminDashboard() {
  const { token, logout, user } = useAuth();
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "blogs" | "projects"
  >("dashboard");
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    monthlyViews: [
      1200, 1900, 3000, 5000, 2000, 3000, 4500, 5200, 4800, 6000, 5500, 7000,
    ],
    monthlyLikes: [
      400, 600, 800, 1200, 900, 1100, 1500, 1800, 1600, 2000, 1900, 2200,
    ],
  });
  const [deleteAlert, setDeleteAlert] = useState<{
    show: boolean;
    type: "blog" | "project";
    item: Blog | Project | null;
  }>({
    show: false,
    type: "blog",
    item: null,
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [blogsRes, projectsRes] = await Promise.all([
          API.get("/blogs", { headers: { Authorization: `Bearer ${token}` } }),
          API.get("/projects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBlogs(blogsRes.data);
        setProjects(projectsRes.data);

        const publishedBlogs = blogsRes.data.filter(
          (blog: Blog) => blog.published
        ).length;
        const totalViews = blogsRes.data.reduce(
          (sum: number, blog: Blog) => sum + (blog.views || 0),
          0
        );
        const totalLikes = blogsRes.data.reduce(
          (sum: number, blog: Blog) => sum + (blog.likes || 0),
          0
        );

        setStats((prev) => ({
          ...prev,
          totalBlogs: blogsRes.data.length,
          publishedBlogs,
          draftBlogs: blogsRes.data.length - publishedBlogs,
          totalProjects: projectsRes.data.length,
          totalViews,
          totalLikes,
        }));
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, router]);

  const showDeleteAlert = (type: "blog" | "project", item: Blog | Project) => {
    setDeleteAlert({ show: true, type, item });
  };

  const hideDeleteAlert = () => {
    setDeleteAlert({ show: false, type: "blog", item: null });
  };

  const handleDeleteBlog = async () => {
    if (!token || !deleteAlert.item || deleteAlert.type !== "blog") return;

    try {
      await API.delete(`/blogs/${deleteAlert.item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b.id !== deleteAlert.item!.id));
      setStats((prev) => ({
        ...prev,
        totalBlogs: prev.totalBlogs - 1,
        publishedBlogs: (deleteAlert.item as Blog).published
          ? prev.publishedBlogs - 1
          : prev.publishedBlogs,
        draftBlogs: !(deleteAlert.item as Blog).published
          ? prev.draftBlogs - 1
          : prev.draftBlogs,
      }));
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

  const handleDeleteProject = async () => {
    if (!token || !deleteAlert.item || deleteAlert.type !== "project") return;

    try {
      await API.delete(`/projects/${deleteAlert.item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p.id !== deleteAlert.item!.id));
      setStats((prev) => ({ ...prev, totalProjects: prev.totalProjects - 1 }));
      toast.success("Project deleted successfully!", {
        style: { background: "#B1AB86", color: "#1a1a1a" },
        icon: "🗑️",
      });
    } catch {
      toast.error("Failed to delete project", {
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

      setStats((prev) => ({
        ...prev,
        publishedBlogs: blog.published
          ? prev.publishedBlogs - 1
          : prev.publishedBlogs + 1,
        draftBlogs: blog.published ? prev.draftBlogs + 1 : prev.draftBlogs - 1,
      }));

      toast.success(
        blog.published ? "Blog moved to drafts" : "Blog published!",
        {
          style: { background: "#B1AB86", color: "#1a1a1a" },
          icon: blog.published ? "📝" : "🎉",
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
    <div className="flex bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        stats={stats}
        user={user}
        logout={logout}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeSection === "dashboard" && (
            <DashboardOverview
              stats={stats}
              blogs={blogs}
              projects={projects}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "blogs" && (
            <BlogManagement
              blogs={blogs}
              stats={stats}
              togglePublishStatus={togglePublishStatus}
              showDeleteAlert={showDeleteAlert}
            />
          )}

          {activeSection === "projects" && (
            <ProjectManagement
              projects={projects}
              showDeleteAlert={showDeleteAlert}
            />
          )}
        </div>
      </div>

      <DeleteAlert
        deleteAlert={deleteAlert}
        hideDeleteAlert={hideDeleteAlert}
        handleDeleteBlog={handleDeleteBlog}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
