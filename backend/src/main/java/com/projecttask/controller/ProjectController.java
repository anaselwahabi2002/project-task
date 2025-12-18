package com.projecttask.controller;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectProgressDTO;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.dto.project.ProjectUpdateRequest;
import com.projecttask.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create (@Valid @RequestBody ProjectCreateRequest dto) {
         return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(dto));
    }

    @GetMapping
    public List<ProjectResponse> myProjects() {
        return projectService.getMyProjects();
    }

    @GetMapping("/{id}")
    public ProjectResponse byId(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(@PathVariable Long id,
                                         @Valid @RequestBody ProjectUpdateRequest dto) {
        return projectService.updateProject(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @GetMapping("/{id}/progress")
    public ProjectProgressDTO getProjectProgress(
            @PathVariable Long id
    ) {
        return projectService.getProjectProgress(id);
    }
}