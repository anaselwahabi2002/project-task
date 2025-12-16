package com.projecttask.service;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.exception.ResourceNotFoundException;
import com.projecttask.mapper.ProjectMapper;
import com.projecttask.model.Project;
import com.projecttask.model.User;
import com.projecttask.repository.ProjectRepository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Transactional
    public ProjectResponse createProject(User user, ProjectCreateRequest dto) {
        Project project = projectMapper.toEntity(dto);
        project.setId(null);
        project.setUser(user);
        return projectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getMyProjects(User user) {
        List<Project> projects = projectRepository.findByUserIdOrderByIdDesc(user.getId());

        List<ProjectResponse> result = new ArrayList<>();
        for (Project p : projects) {
            result.add(projectMapper.toResponse(p));
        }
        return result;
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id, User user) {
        Project project = projectRepository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        return projectMapper.toResponse(project);
    }
}
