import { useMemo, useState } from "react";

export function useTaskSearch(tasks = []) {
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return Array.isArray(tasks) ? tasks : [];

    return (tasks || []).filter((t) => {
      const text =
        `${t?.title ?? ""} ${t?.name ?? ""} ${t?.description ?? ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [tasks, search]);

  return { search, setSearch, filteredTasks };
}
