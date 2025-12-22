import { useCallback, useEffect, useState } from "react";
import { getMyProjects } from "../../services/project.service";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ this counter is the key: changing it triggers useEffect
  const [version, setVersion] = useState(0);

  const reload = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProjects();

        if (!cancelled) {
          // ✅ always normalize to array
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError(e?.message || "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [version]); // ✅ IMPORTANT: reload triggers version -> refetch

  return { projects, loading, error, reload };
}
