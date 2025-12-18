package com.projecttask.service;

import com.projecttask.dto.task.TaskRequestUpdateDTO;
import com.projecttask.dto.task.TaskResponseDTO;
import com.projecttask.mapper.TaskMapper;
import com.projecttask.model.Project;
import com.projecttask.model.Task;
import com.projecttask.model.User;
import com.projecttask.repository.TaskRepository;
import com.projecttask.security.CurrentUserProvider;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Collections;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TaskServiceTest {

    @Mock
    TaskRepository taskRepository;
    @Mock
    ProjectService projectService;
    @Mock
    TaskMapper taskMapper;
    @Mock
    CurrentUserProvider currentUserProvider;

    @InjectMocks
    TaskService taskService;

    @Test
    public void getTasksByProject_ok() {
        Project project = new Project();
        when(projectService.getProjectEntityById(1L)).thenReturn(project);
        when(taskRepository.findByProject(project))
                .thenReturn(Collections.emptyList());

        assertEquals(0, taskService.getTasksByProject(1L).size());
    }

    @Test
    public void markCompleted_ok() {
        User user = new User();
        user.setId(1L);
        when(currentUserProvider.getCurrentUser()).thenReturn(user);

        Project project = new Project();
        project.setUser(user);

        Task task = new Task();
        task.setProject(project);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        taskService.markCompleted(1L);

        assertTrue(task.isCompleted());
    }

    @Test
    public void updateTask_ok() {
        Task task = new Task();
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        when(taskMapper.toDto(task)).thenReturn(new TaskResponseDTO());

        TaskResponseDTO dto =
                taskService.updateTask(1L, new TaskRequestUpdateDTO());

        assertNotNull(dto);
    }

    @Test
    public void delete_ok() {
        User user = new User();
        user.setId(1L);
        when(currentUserProvider.getCurrentUser()).thenReturn(user);

        Project project = new Project();
        project.setUser(user);

        Task task = new Task();
        task.setProject(project);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        taskService.delete(1L);

        verify(taskRepository).delete(task);
    }
}
