import { useState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../../services/project.service";
import { useProjects } from "./useProjects";

export const useProjectsController = () => {
  const { projects, loading, error, reload } = useProjects();

  const [openCreate, setOpenCreate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const startEdit = (project) => {
    const id = project?.id ?? project?._id;
    if (!id) return;

    setEditId(id);
    setTitle(project?.title ?? project?.name ?? "");
    setDescription(project?.description ?? "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  const create = async (payload) => {
    await createProject(payload);
    setOpenCreate(false);
    reload(); // ✅ refresh list immediately
  };

  const update = async () => {
    if (!editId) return;
    if (!title.trim()) return;

    await updateProject(editId, { title, description });

    cancelEdit(); // ✅ close modal
    reload();     // ✅ refetch projects so you SEE changes without refresh
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    reload();
  };

  return {
    projects,
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
  };
};
