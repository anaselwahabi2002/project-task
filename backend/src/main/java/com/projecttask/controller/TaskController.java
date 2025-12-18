package com.projecttask.controller;

import com.projecttask.dto.task.TaskRequestDTO;
import com.projecttask.dto.task.TaskRequestUpdateDTO;
import com.projecttask.dto.task.TaskResponseDTO;
import com.projecttask.mapper.TaskMapper;
import com.projecttask.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService taskService,
                          TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @PostMapping("/projects/{projectId}/tasks")
    public TaskResponseDTO createTask(
            @PathVariable Long projectId,
            @Valid @RequestBody TaskRequestDTO dto
    ) {
        return taskMapper.toDto(
                taskService.create(projectId, taskMapper.toEntity(dto))
        );
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskResponseDTO> getTasksByProject(
            @PathVariable Long projectId
    ) {
        return taskService.getTasksByProject(projectId);
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long taskId,
            @RequestBody @Valid TaskRequestUpdateDTO dto
    ) {
        TaskResponseDTO updatedTask = taskService.updateTask(taskId, dto);
        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/tasks/{taskId}/complete")
    public void completeTask(@PathVariable Long taskId) {
        taskService.markCompleted(taskId);
    }

    @DeleteMapping("/tasks/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long taskId) {
        taskService.delete(taskId);
    }
}
