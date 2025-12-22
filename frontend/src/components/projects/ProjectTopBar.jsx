export default function ProjectTopBar({ onBack, onAddTask, addDisabled }) {
  return (
    <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-xl bg-slate-100/80 py-2 backdrop-blur">
      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex cursor-pointer items-center gap-2
          rounded-xl bg-white px-4 py-2
          text-sm font-medium text-slate-700
          shadow-sm transition-all duration-200
          hover:bg-blue-50 hover:text-blue-700 hover:shadow-md
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500/40
        "
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <button
        type="button"
        onClick={onAddTask}
        disabled={addDisabled}
        className="
          cursor-pointer rounded-lg bg-blue-600 px-4 py-2
          text-sm font-medium text-white shadow-sm
          transition-all duration-200
          hover:bg-blue-700 hover:shadow-md
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        + Add Task
      </button>
    </div>
  );
}
