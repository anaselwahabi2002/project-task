package com.projecttask.service;

import com.projecttask.dto.task.TaskRequestUpdateDTO;
import com.projecttask.dto.task.TaskResponseDTO;
import com.projecttask.exception.ResourceNotFoundException;
import com.projecttask.mapper.TaskMapper;
import com.projecttask.model.Project;
import com.projecttask.model.Task;
import com.projecttask.model.User;
import com.projecttask.repository.TaskRepository;
import com.projecttask.security.CurrentUserProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final CurrentUserProvider currentUserProvider;
    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository,
                       ProjectService projectService,
                       CurrentUserProvider currentUserProvider, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
        this.currentUserProvider = currentUserProvider;
        this.taskMapper = taskMapper;
    }

    public Task create(Long projectId, Task task) {
        Project project = projectService.getProjectEntityById(projectId);
        task.setProject(project);
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getTasksByProject(Long projectId) {
        Project project = projectService.getProjectEntityById(projectId);

        return taskRepository.findByProject(project)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    public void markCompleted(Long taskId) {
        User user = currentUserProvider.getCurrentUser();
        Task task = getTaskOwnedByUser(taskId, user);
        task.setCompleted(true);
    }

    public TaskResponseDTO updateTask(Long taskId, TaskRequestUpdateDTO dto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        taskMapper.updateEntity(dto, task);
        taskRepository.save(task);

        return taskMapper.toDto(task);
    }

    public void delete(Long taskId) {
        User user = currentUserProvider.getCurrentUser();
        Task task = getTaskOwnedByUser(taskId, user);
        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    private Task getTaskOwnedByUser(Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getProject().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Forbidden");
        }
        return task;
    }
}
