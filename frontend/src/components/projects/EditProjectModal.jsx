export default function EditProjectModal({
  open,
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Edit Project
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg border border-slate-300 p-2
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
          />

          <textarea
            className="w-full rounded-lg border border-slate-300 p-2
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Description"
          />

          <div className="flex justify-end gap-2 pt-2">
            {/* Cancel */}
            <button
              type="button"
              onClick={onCancel}
              className="
                cursor-pointer
                rounded-lg bg-slate-200
                px-4 py-2 text-sm font-medium
                transition hover:bg-slate-300
                active:scale-95
              "
            >
              Cancel
            </button>


            {/* Update */}
            <button
              type="submit"
              className="
                cursor-pointer
                rounded-lg bg-blue-600
                px-4 py-2 text-sm font-medium text-white
                transition hover:bg-blue-700
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              Update
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
