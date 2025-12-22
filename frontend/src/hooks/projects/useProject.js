import { useEffect, useState } from "react";
import axios from "axios";

export const useProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProject(res.data);
      } catch (e) {
        console.error(e);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  return { project, loading, error };
};
