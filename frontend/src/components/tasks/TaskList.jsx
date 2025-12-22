import TaskListControls from "./TaskListControls";
import { TaskPagination } from "./TaskPagination";
import TaskItem from "./TaskItem";
import TaskEditModal from "./TaskEditModal";
import { useTaskListController } from "../../hooks/tasks/useTaskListController";
import { useParams } from "react-router-dom";

export default function TaskList({ tasks, loading, onComplete, onDelete, onEdit }) {
  const { projectId, id } = useParams(); // selon tes routes (/projects/:id) ou (/projects/:projectId)
  const pid = projectId ?? id; // ✅ support les deux

  const {
    search,
    showOverdueOnly,
    overdueCount,
    onChangeSearch,
    clearSearch,
    toggleOverdue,

    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,

    editingId,
    editForm,
    setEditForm,
    startEdit,
    cancelEdit,
  } = useTaskListController(tasks);

  return (
    <div className="space-y-4">
      <TaskListControls
        search={search}
        onSearchChange={onChangeSearch}
        onClearSearch={clearSearch}
        showOverdueOnly={showOverdueOnly}
        onToggleOverdue={toggleOverdue}
        overdueCount={overdueCount}
      />

      {paginatedItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-center text-slate-600">
          {showOverdueOnly ? "No overdue tasks." : "No tasks to display."}
        </div>
      ) : (
        <ul className="space-y-2">
          {paginatedItems.map((task) => {
            const taskId = task?.id ?? task?._id;
            if (!taskId) return null;

            return (
              <TaskItem
                key={taskId}
                task={task}
                taskId={taskId}
                projectId={pid}
                loading={loading}
                onComplete={async () => {
                  await onComplete(taskId);
                }}
                onDelete={async () => {
                  await onDelete(taskId);
                }}
                onStartEdit={() => startEdit(taskId, task)}
              />
            );
          })}
        </ul>
      )}

      <TaskPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />

      <TaskEditModal
        open={!!editingId}
        loading={loading}
        error={null}
        editForm={editForm}
        setEditForm={setEditForm}
        onCancel={cancelEdit}
        onSave={async () => {
          if (!editingId) return;
          const ok = await onEdit(editingId, editForm);
          if (ok) cancelEdit();
        }}
      />
    </div>
  );
}
