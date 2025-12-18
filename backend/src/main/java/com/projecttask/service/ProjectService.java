package com.projecttask.service;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectProgressDTO;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.dto.project.ProjectUpdateRequest;
import com.projecttask.exception.ResourceNotFoundException;
import com.projecttask.mapper.ProjectMapper;
import com.projecttask.model.Project;
import com.projecttask.model.User;
import com.projecttask.repository.ProjectRepository;
import com.projecttask.repository.TaskRepository;
import com.projecttask.security.CurrentUserProvider;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final CurrentUserProvider currentUserProvider;
    private final TaskRepository taskRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper, CurrentUserProvider currentUserProvider, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.currentUserProvider = currentUserProvider;
        this.taskRepository = taskRepository;
    }

    public ProjectResponse createProject(ProjectCreateRequest dto) {
        User user = currentUserProvider.getCurrentUser();
        Project project = projectMapper.toEntity(dto);
        project.setId(null);
        project.setUser(user);

        return projectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getMyProjects() {
        User user = currentUserProvider.getCurrentUser();
        List<Project> projects =
                projectRepository.findByUserIdOrderByIdDesc(user.getId());

        List<ProjectResponse> result = new ArrayList<>();
        for (Project p : projects) {
            result.add(projectMapper.toResponse(p));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Project project = projectRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        return projectMapper.toResponse(project);
    }

    @Transactional(readOnly = true)
    public Project getProjectEntityById(Long id) {
        User user = currentUserProvider.getCurrentUser();
        return projectRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    }

    public ProjectResponse updateProject(Long id, ProjectUpdateRequest dto) {

        User user = currentUserProvider.getCurrentUser();

        Project project = projectRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        projectMapper.updateEntity(dto, project);

        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponse(updatedProject);
    }

    public void deleteProject(Long id) {
        User user = currentUserProvider.getCurrentUser();
        Project project = projectRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        projectRepository.delete(project);
    }

    @Transactional(readOnly = true)
    public ProjectProgressDTO getProjectProgress(Long projectId) {

        Project project = getProjectEntityById(projectId);

        long totalTasks = taskRepository.countByProject(project);
        long completedTasks = taskRepository.countByProjectAndCompletedTrue(project);
        double progressPercentage = totalTasks == 0
                ? 0.0
                : (completedTasks * 100.0) / totalTasks;

        return new ProjectProgressDTO(
                totalTasks,
                completedTasks,
                progressPercentage
        );
    }
}
