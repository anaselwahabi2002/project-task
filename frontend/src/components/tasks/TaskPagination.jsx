export function TaskPagination({ totalPages, currentPage, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 pt-4">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              page === currentPage
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
