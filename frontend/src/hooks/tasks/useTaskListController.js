import { useMemo, useState } from "react";
import { useTaskSearch } from "./useTaskSearch";
import { useTaskPagination } from "./useTaskPagination";
import { useTaskEdit } from "./useTaskEdit";
import { isOverdueTask, normalizeDate } from "../../utils/task.utils";

export function useTaskListController(tasks) {
  const { search, setSearch, filteredTasks } = useTaskSearch(tasks);

  // UI state
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);

  // today normalized
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // overdue count
  const overdueCount = useMemo(() => {
    return (filteredTasks || []).filter((t) => isOverdueTask(t, today)).length;
  }, [filteredTasks, today]);

  // visible tasks
  const visibleTasks = useMemo(() => {
    const base = filteredTasks || [];
    if (!showOverdueOnly) return base;
    return base.filter((t) => isOverdueTask(t, today));
  }, [filteredTasks, showOverdueOnly, today]);

  // sort by dueDate (DESC) + no dueDate last
  const sortedTasks = useMemo(() => {
    return [...visibleTasks].sort((a, b) => {
      const dateA = normalizeDate(a?.dueDate);
      const dateB = normalizeDate(b?.dueDate);

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB - dateA; // inverse (desc)
    });
  }, [visibleTasks]);

  // pagination
  const { currentPage, setCurrentPage, totalPages, paginatedItems } =
    useTaskPagination(sortedTasks);

  // edit modal logic
  const { editingId, editForm, setEditForm, startEdit, cancelEdit } = useTaskEdit();

  // handlers
  const onChangeSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const clearSearch = () => onChangeSearch("");

  const toggleOverdue = () => {
    setShowOverdueOnly((prev) => !prev);
    setCurrentPage(1);
  };

  return {
    // ui
    search,
    showOverdueOnly,
    overdueCount,

    // pagination
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,

    // edit modal
    editingId,
    editForm,
    setEditForm,
    startEdit,
    cancelEdit,

    // actions
    onChangeSearch,
    clearSearch,
    toggleOverdue,
  };
}
