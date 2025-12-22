import { useEffect, useState } from "react";

export default function CreateProjectModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onCreate({ title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Add Project</h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded px-3 py-1 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="mb-3 w-full rounded border border-slate-300 p-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="mb-4 w-full rounded border border-slate-300 p-2
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded bg-slate-200 px-4 py-2
                         transition hover:bg-slate-300 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white
                         transition hover:bg-blue-700 active:scale-95"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
