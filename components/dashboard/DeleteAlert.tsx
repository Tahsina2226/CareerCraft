"use client";

interface Blog {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  createdAt: string;
}

interface DeleteAlertProps {
  deleteAlert: {
    show: boolean;
    type: "blog" | "project";
    item: Blog | Project | null;
  };
  hideDeleteAlert: () => void;
  handleDeleteBlog: () => void;
  handleDeleteProject: () => void;
}

export default function DeleteAlert({
  deleteAlert,
  hideDeleteAlert,
  handleDeleteBlog,
  handleDeleteProject,
}: DeleteAlertProps) {
  if (!deleteAlert.show || !deleteAlert.item) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white/95 shadow-2xl p-8 border border-[#B1AB86]/30 rounded-3xl w-full max-w-md">
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
            Delete {deleteAlert.type}
          </h3>
          <p className="text-[#7D8566]">
            Are you sure you want to delete this {deleteAlert.type}? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={hideDeleteAlert}
            className="flex-1 hover:bg-[#B1AB86]/10 py-3 border border-[#B1AB86] rounded-xl font-semibold text-[#5D6D4B] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={
              deleteAlert.type === "blog"
                ? handleDeleteBlog
                : handleDeleteProject
            }
            className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold text-white transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
