export default function TaskItemActions({
  task,
  isOverdue,
  loading,
  onComplete,
  onDelete,
  onStartEdit,
}) {
  if (isOverdue) return null;

  return (
    <div className="flex flex-wrap gap-2 sm:justify-end">
      {!task?.completed && (
        <button
          type="button"
          disabled={loading}
          onClick={onComplete}
          className="
            inline-flex cursor-pointer items-center justify-center gap-2
            rounded-xl bg-green-600 px-3.5 py-2
            text-sm font-semibold text-white
            shadow-sm transition-all duration-200
            hover:bg-green-700 hover:shadow-md
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-green-500/40
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          ✓ Complete
        </button>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={onStartEdit}
        className="
          inline-flex cursor-pointer items-center justify-center
          rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700
          shadow-sm transition-all duration-200
          hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500/30
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        Edit
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={onDelete}
        className="
          inline-flex cursor-pointer items-center justify-center
          rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-700
          shadow-sm transition-all duration-200
          hover:bg-red-100 hover:text-red-800
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-red-400/40
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        Delete
      </button>
    </div>
  );
}
