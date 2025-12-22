import { useNavigate } from "react-router-dom";
import TaskItemContent from "./TaskItemContent";
import TaskItemActions from "./TaskItemActions";

export default function TaskItem({
  task,
  taskId,
  projectId,
  loading,
  onComplete,
  onDelete,
  onStartEdit,
}) {
  const navigate = useNavigate();

  // Normalize dates (ignore time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = task?.dueDate ? new Date(task.dueDate) : null;
  if (dueDate) dueDate.setHours(0, 0, 0, 0);

  // Overdue rule (today or past) + not completed
  const isOverdue = !!(dueDate && dueDate <= today && !task?.completed);

  const openDetails = () => {
    if (!projectId || !taskId) return;

    navigate(`/projects/${projectId}/tasks/${taskId}`, {
      state: { task },
    });
  };

  return (
    <li
      className={`
        group relative overflow-hidden rounded-2xl border p-5
        shadow-sm transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${
          isOverdue
            ? "border-red-200 bg-red-50/60 hover:ring-4 hover:ring-red-500/10"
            : "border-slate-200 bg-white hover:border-blue-200 hover:ring-4 hover:ring-blue-500/10"
        }
      `}
    >
      {/* Top accent line */}
      <div
        className={`absolute left-0 top-0 h-1.5 w-full ${
          isOverdue
            ? "bg-gradient-to-r from-red-500 via-red-400 to-orange-300"
            : "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"
        }`}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <TaskItemContent task={task} isOverdue={isOverdue} onOpenDetails={openDetails} />

        <TaskItemActions
          task={task}
          isOverdue={isOverdue}
          loading={loading}
          onComplete={onComplete}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
        />
      </div>
    </li>
  );
}
