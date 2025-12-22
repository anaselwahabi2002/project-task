export default function ProjectDetailsCard({
  title,
  description,
  percentage = 0,
  totalTasks = 0,
  completedTasks = 0,
}) {
  return (
    <div
      className="
        group relative mb-6 overflow-hidden
        rounded-2xl border border-slate-200 bg-white
        shadow-sm transition-all duration-200
        hover:border-blue-200 hover:shadow-md
        hover:ring-4 hover:ring-blue-500/10
      "
    >
      {/* Top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left */}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Project Details
            </p>

            <h1 className="mt-1 truncate text-3xl font-bold text-slate-900">
              {title}
            </h1>

            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {description || "No description provided."}
            </p>
          </div>

          {/* Right badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {totalTasks} tasks
            </span>

            <span className="rounded-xl bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {completedTasks} completed
            </span>

            <span className="rounded-xl bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span className="font-semibold text-slate-700">
              {Math.round(percentage)}%
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* glow */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200
          group-hover:opacity-100
        "
      >
        <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
    </div>
  );
}
