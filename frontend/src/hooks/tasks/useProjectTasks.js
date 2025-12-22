import { useEffect, useMemo, useState } from "react";
import { createTask, deleteTask, updateTask, completeTask } from "../../services/task.service";

export function useProjectTasks(tasksData = [], projectId) {
  const [tasks, setTasks] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // ✅ sync tasksData -> tasks (IMPORTANT)
  useEffect(() => {
    setTasks(Array.isArray(tasksData) ? tasksData : []);
  }, [tasksData]);

  const normalizeId = (t) => t?.id ?? t?._id;

  const addTask = async (payload) => {
    if (!projectId) return false;
    try {
      setActionLoading(true);
      setActionError("");

      const created = await createTask(projectId, payload);
      setTasks((prev) => [created, ...prev]);
      return true;
    } catch (e) {
      console.error(e);
      setActionError("Failed to create task");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const markCompleted = async (taskId) => {
    if (!taskId) return;
    try {
      setActionLoading(true);
      setActionError("");

      await completeTask(taskId);
      setTasks((prev) =>
        prev.map((t) => {
          const id = normalizeId(t);
          if (id !== taskId) return t;
          return { ...t, completed: true };
        })
      );
    } catch (e) {
      console.error(e);
      setActionError("Failed to complete task");
    } finally {
      setActionLoading(false);
    }
  };

  const removeTask = async (taskId) => {
    if (!taskId) return;
    try {
      setActionLoading(true);
      setActionError("");

      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => (normalizeId(t) !== taskId)));
    } catch (e) {
      console.error(e);
      setActionError("Failed to delete task");
    } finally {
      setActionLoading(false);
    }
  };

  const editTask = async (taskId, payload) => {
    if (!taskId) return false;
    try {
      setActionLoading(true);
      setActionError("");

      const updated = await updateTask(taskId, payload);
      setTasks((prev) =>
        prev.map((t) => (normalizeId(t) === taskId ? updated : t))
      );
      return true;
    } catch (e) {
      console.error(e);
      setActionError("Failed to update task");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    tasks,
    actionLoading,
    actionError,
    addTask,
    markCompleted,
    removeTask,
    editTask,
  };
}
