import { useTaskCreateForm } from "../../hooks/tasks/useTaskCreateForm";

export default function TaskCreateForm({ onCreate, loading, error, onClose }) {
  const { form, handleChange, handleSubmit } = useTaskCreateForm(onCreate);

  const onSubmit = async (e) => {
    await handleSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="border-l-4 border-blue-600 pl-3 text-lg font-semibold text-slate-800">
            Add Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-slate-500 transition
                       hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        {/* Form */}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-slate-200 px-4 py-2 text-sm
                         transition hover:bg-slate-300 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white
                         transition hover:bg-blue-700 active:scale-95
                         disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
