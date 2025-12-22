import { useState } from "react";

export const useTaskEdit = () => {
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // ✅ accepts (taskId, task) OR (task)
  const startEdit = (taskIdOrTask, maybeTask) => {
    const task =
      typeof taskIdOrTask === "object" && taskIdOrTask !== null
        ? taskIdOrTask
        : maybeTask;

    const taskId =
      typeof taskIdOrTask === "string" || typeof taskIdOrTask === "number"
        ? taskIdOrTask
        : task?.id ?? task?._id;

    if (!taskId) return;

    setEditingId(taskId);

    setEditForm({
      title: task?.title || task?.name || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? String(task.dueDate).slice(0, 10) : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "", dueDate: "" });
  };

  return {
    editingId,
    editForm,
    setEditForm,
    startEdit,
    cancelEdit,
  };
};
