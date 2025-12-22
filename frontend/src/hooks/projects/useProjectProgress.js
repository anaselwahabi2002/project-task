import { useEffect, useState } from "react";
import { getProjectProgress } from "../../services/project.service";

export const useProjectProgress = (projectId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getProjectProgress(projectId);
        setProgress(data);
      } catch {
        setError("Failed to load progress");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [projectId]);

  return { progress, loading, error };
};
