export default function ProjectCard({
  project,
  progress,
  progressLoading,
  onOpen,
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={onOpen}
      className="
        group relative cursor-pointer overflow-hidden
        rounded-2xl border border-slate-200 bg-white
        shadow-sm transition-all duration-200
        hover:-translate-y-1 hover:border-blue-200 hover:shadow-md
        hover:ring-4 hover:ring-blue-500/10
      "
    >
      {/* Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

      <div className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {project?.title ?? project?.name ?? "Untitled Project"}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {project?.description ?? "No description provided."}
            </p>
          </div>

          {/* Progress pill */}
          <span className="shrink-0 rounded-xl bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {progressLoading ? "..." : `${progress}%`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span className="font-semibold text-slate-700">
              {progressLoading ? "..." : `${progress}%`}
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all ${
                progressLoading ? "animate-pulse opacity-50" : ""
              }`}
              style={{
                width: `${progressLoading ? 100 : progress}%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
            <button
            aria-label="Open project details"
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onOpen();
            }}
            className="
                cursor-pointer
                rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white
                shadow-sm transition-all hover:bg-blue-700
                active:scale-95 focus:ring-2 focus:ring-blue-500
            "
            >
            More Details
            </button>

          <div className="flex gap-2">
            <button
            aria-label="Edit project"
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onEdit();
            }}
            className="
                cursor-pointer
                rounded-xl border border-slate-200 bg-white px-3 py-2
                text-sm font-medium text-slate-700 shadow-sm
                hover:bg-blue-50 hover:text-blue-700
                active:scale-95
            "
            >
            Edit
            </button>

            <button
            aria-label="Delete project"
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onDelete();
            }}
            className="
                cursor-pointer
                rounded-xl border border-red-200 bg-red-50 px-3 py-2
                text-sm font-medium text-red-700 shadow-sm
                hover:bg-red-100 hover:text-red-800
                active:scale-95
            "
            >
            Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
