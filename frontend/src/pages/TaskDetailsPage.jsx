import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ✅ Example service (replace with your real one)
async function getTaskById(taskId) {
  // Example:
  // const { data } = await api.get(`/tasks/${taskId}`);
  // return data;

  throw new Error("No API implemented: implement getTaskById(taskId)");
}

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, taskId } = useParams();

  // ✅ if we navigated with state, task is already here
  const stateTask = location.state?.task ?? null;

  const [task, setTask] = useState(stateTask);
  const [loading, setLoading] = useState(!stateTask);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (stateTask) return;

      try {
        setLoading(true);
        setError("");
        const t = await getTaskById(taskId);
        if (mounted) setTask(t);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load task.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, [taskId, stateTask]);

  if (loading) return <p className="p-6 text-slate-600">Loading task...</p>;

  if (error)
    return (
      <div className="p-6">
        <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to project
        </button>
      </div>
    );

  if (!task)
    return (
      <div className="p-6">
        <p className="text-slate-600">Task not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
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

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400" />

          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {task?.title ?? task?.name ?? `Task #${taskId}`}
            </h1>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
              {task?.description || "No description."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {task?.dueDate && (
                <span className="rounded-xl bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                  Due: {String(task.dueDate).slice(0, 10)}
                </span>
              )}

              {task?.completed && (
                <span className="rounded-xl bg-green-50 px-3 py-1 font-semibold text-green-700 ring-1 ring-green-200">
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
