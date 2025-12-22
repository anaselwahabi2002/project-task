import { useMemo } from "react";

export default function TaskItemContent({ task, isOverdue, onOpenDetails }) {
  const description = task?.description || "No description";

  const MAX_LEN = 140;
  const isLongDescription = useMemo(
    () => (description?.trim()?.length || 0) > MAX_LEN,
    [description]
  );

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        {/* Clickable title */}
        <button
          type="button"
          onClick={onOpenDetails}
          className="truncate text-left text-base font-semibold text-slate-900
                     hover:text-blue-700 hover:underline cursor-pointer"
          title="Open task details"
        >
          {task?.title ?? task?.name ?? "Untitled Task"}
        </button>

        {task?.completed && (
          <span className="rounded-xl bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
            Completed
          </span>
        )}

        {isOverdue && (
          <span className="rounded-xl bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200">
            Overdue
          </span>
        )}
      </div>

      {/* Description (clickable) */}
      <button
        type="button"
        onClick={onOpenDetails}
        className="mt-2 line-clamp-2 w-full text-left text-sm leading-relaxed text-slate-600
                   hover:text-blue-700 cursor-pointer"
        title="Open task details"
      >
        {description}
      </button>

      {/* Read More (only if long) */}
      {isLongDescription && (
        <button
          type="button"
          onClick={onOpenDetails}
          className="mt-2 inline-flex cursor-pointer items-center gap-1
                     text-xs font-semibold text-blue-700
                     hover:text-blue-800 hover:underline focus:outline-none"
          title="Read full description"
        >
          Read more <span aria-hidden="true">→</span>
        </button>
      )}

      {task?.dueDate && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={`rounded-lg px-2 py-1 font-semibold ${
              isOverdue ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            Due: {String(task.dueDate).slice(0, 10)}
          </span>
        </div>
      )}
    </div>
  );
}
