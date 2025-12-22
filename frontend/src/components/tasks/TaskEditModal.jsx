export default function TaskEditModal({
  open,
  loading,
  error,
  editForm,
  setEditForm,
  onCancel,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Edit Task</h2>
            <p className="text-sm text-slate-500">Update task details</p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-4"
        >
          <input
            className="w-full rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={editForm.title}
            onChange={(e) => setEditForm((s) => ({ ...s, title: e.target.value }))}
            placeholder="Title"
          />

          <textarea
            className="w-full rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={editForm.description}
            onChange={(e) =>
              setEditForm((s) => ({ ...s, description: e.target.value }))
            }
            rows={3}
            placeholder="Description"
          />

          <input
            type="date"
            className="w-full rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={editForm.dueDate}
            onChange={(e) =>
              setEditForm((s) => ({ ...s, dueDate: e.target.value }))
            }
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium
                         transition hover:bg-slate-300 active:scale-95
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white
                         transition hover:bg-indigo-700 hover:shadow-md active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
