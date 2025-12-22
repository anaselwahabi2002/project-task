import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/projects/useProject";
import { useFetchTasks } from "../hooks/tasks/useFetchTasks";
import { useProjectTasks } from "../hooks/tasks/useProjectTasks";
import { useProjectProgress } from "../hooks/projects/useProjectProgress";
import TaskList from "../components/tasks/TaskList";
import TaskCreateForm from "../components/tasks/TaskCreateForm";
import ProjectTopBar from "../components/projects/ProjectTopBar";
import ProjectDetailsCard from "../components/projects/ProjectDetailsCard";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Project
  const { project, loading: projectLoading, error: projectError } = useProject(id);

  // Tasks (fetch initial)
  const { tasksData, loading: tasksLoading, error: tasksError } = useFetchTasks(id);

  // Tasks actions (local state + CRUD)
  const projectTasksApi = useProjectTasks(tasksData, id) || {};
  const {
    tasks = [],
    actionLoading,
    actionError,
    addTask,
    markCompleted,
    removeTask,
    editTask,
  } = projectTasksApi;

  // Progress (backend)
  const {
    progress,
    loading: progressLoading,
    error: progressError,
    refresh: refreshProgress,
  } = useProjectProgress(id);

  // Global loading
  if (projectLoading || tasksLoading || progressLoading) {
    return <p className="p-6">Loading...</p>;
  }

  // Global error
  if (projectError || tasksError || progressError) {
    return (
      <p className="p-6 text-red-600">
        {projectError || tasksError || progressError}
      </p>
    );
  }

  if (!project) return <p className="p-6">Project not found</p>;

  const percentage = progress?.progressPercentage ?? 0;
  const totalTasks = progress?.totalTasks ?? 0;
  const completedTasks = progress?.completedTasks ?? 0;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ProjectTopBar
        onBack={() => navigate("/projects")}
        onAddTask={() => setOpen(true)}
        addDisabled={actionLoading}
      />

      <ProjectDetailsCard
        title={project.title}
        description={project.description}
        percentage={percentage}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      {actionError && (
        <p className="mb-3 rounded bg-red-50 p-3 text-sm text-red-700">
          {actionError}
        </p>
      )}

      <TaskList
        projectId={id}
        tasks={tasks}
        loading={actionLoading}
        onComplete={async (taskId) => {
          await markCompleted(taskId);
          await refreshProgress();
        }}
        onDelete={async (taskId) => {
          await removeTask(taskId);
          await refreshProgress();
        }}
        onEdit={async (taskId, payload) => {
          const ok = await editTask(taskId, payload);
          return ok;
        }}
      />

      {open && (
        <TaskCreateForm
          onCreate={async (payload) => {
            const ok = await addTask(payload);
            if (ok) {
              await refreshProgress();
              setOpen(false);
            }
            return ok;
          }}
          loading={actionLoading}
          error={actionError}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
