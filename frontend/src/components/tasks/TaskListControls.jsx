export default function TaskListControls({
  search,
  onSearchChange,
  onClearSearch,
  showOverdueOnly,
  onToggleOverdue,
  overdueCount,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* 🔍 Search */}
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-800
                     shadow-sm outline-none transition
                     placeholder:text-slate-400
                     focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />

        {search && (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2
                       text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ⚠️ Overdue toggle button */}
      <button
        type="button"
        onClick={onToggleOverdue}
        className={`
          inline-flex cursor-pointer items-center justify-center gap-2
          rounded-2xl px-4 py-3 text-sm font-semibold
          shadow-sm transition-all duration-200
          active:scale-95
          focus:outline-none focus:ring-2
          ${
            showOverdueOnly
              ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-red-50 hover:text-red-700 focus:ring-blue-500/30"
          }
        `}
      >
        {showOverdueOnly ? "Showing Overdue" : "Show Overdue"}
        <span
          className={`
            rounded-xl px-2 py-0.5 text-xs font-bold
            ${showOverdueOnly ? "bg-white/20 text-white" : "bg-red-100 text-red-700"}
          `}
        >
          {overdueCount}
        </span>
      </button>
    </div>
  );
}
