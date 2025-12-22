import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useProjectsController } from "../hooks/projects/useProjectsController";

import EditProjectModal from "../components/projects/EditProjectModal";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsPagination from "../components/projects/ProjectsPagination";
import ProjectCardWithProgress from "../components/projects/ProjectCardWithProgress";
import ProjectSearch from "../components/projects/ProjectSearch";

export default function ProjectsPage() {
  const navigate = useNavigate();

  const {
    projects = [],
    loading,
    error,
    openCreate,
    setOpenCreate,
    editId,
    title,
    description,
    setTitle,
    setDescription,
    startEdit,
    cancelEdit,
    create,
    update,
    remove,
  } = useProjectsController();

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  /* 🔁 Reset page when projects or search change */
  useEffect(() => {
    setCurrentPage(1);
  }, [projects.length, search]);

  /* 🔍 Filter projects */
  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;

    const q = search.toLowerCase();

    return projects.filter(
      (p) =>
        p?.title?.toLowerCase().includes(q) ||
        p?.name?.toLowerCase().includes(q) ||
        p?.description?.toLowerCase().includes(q)
    );
  }, [projects, search]);

  /* 📄 Pagination */
  const totalPages = Math.ceil(
    (filteredProjects.length || 0) / ITEMS_PER_PAGE
  );

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProjects = useMemo(
    () => filteredProjects.slice(start, start + ITEMS_PER_PAGE),
    [filteredProjects, start]
  );

  /* ⏳ Loading */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Loading projects...
      </div>
    );
  }

  /* ❌ Error */
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ProjectsHeader onAdd={() => setOpenCreate(true)} />

        {/* 🔍 Search */}
        <ProjectSearch value={search} onChange={setSearch} />

        {/* Content */}
        {currentProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              {search
                ? "No projects match your search."
                : (
                  <>
                    No projects yet. Click{" "}
                    <span className="font-semibold text-blue-700">
                      + Add Project
                    </span>{" "}
                    to create one.
                  </>
                )}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProjects.map((p) => {
              const projectId = p?.id ?? p?._id;

              return (
                <ProjectCardWithProgress
                  key={projectId}
                  project={p}
                  projectId={projectId}
                  onOpen={() => navigate(`/projects/${projectId}`)}
                  onEdit={() => startEdit(p)}
                  onDelete={() => remove(projectId)}
                />
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <ProjectsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        )}

        {/* Edit Modal */}
        <EditProjectModal
          open={!!editId}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
          onCancel={cancelEdit}
        />

        {/* Create Modal */}
        <CreateProjectModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onCreate={create}
        />
      </div>
    </div>
  );
}
