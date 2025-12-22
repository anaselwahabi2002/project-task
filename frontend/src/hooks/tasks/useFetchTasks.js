import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchTasks = (projectId) => {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ si projectId n'est pas encore prêt, on stoppe proprement
    if (!projectId) {
      setTasksData([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8080/api/projects/${encodeURIComponent(
            projectId
          )}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!cancelled) setTasksData(res.data || []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Failed to load tasks");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { tasksData, loading, error };
};
