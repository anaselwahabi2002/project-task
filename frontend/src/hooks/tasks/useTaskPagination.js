import { useState, useMemo } from "react";

export const useTaskPagination = (items, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    return items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
};
