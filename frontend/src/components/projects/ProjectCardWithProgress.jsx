import ProjectCard from "./ProjectCard";
import { useProjectProgress } from "../../hooks/projects/useProjectProgress";

export default function ProjectCardWithProgress({
  project,
  projectId,
  onOpen,
  onEdit,
  onDelete,
}) {
  const { progress, loading: progressLoading } =
    useProjectProgress(projectId);

  // 🔒 pourcentage propre, sans virgule, entre 0 et 100
  const percent = Math.min(
    100,
    Math.max(0, Math.floor(progress?.progressPercentage ?? 0))
  );

  return (
    <ProjectCard
      project={project}
      progress={percent}
      progressLoading={progressLoading}
      onOpen={onOpen}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
