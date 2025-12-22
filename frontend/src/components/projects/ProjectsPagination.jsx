export default function ProjectsPagination({ totalPages, currentPage, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const active = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`cursor-pointer rounded-lg px-3 py-1 text-sm transition ${
              active
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
