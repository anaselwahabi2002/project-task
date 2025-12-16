package com.projecttask.controller;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.model.User;
import com.projecttask.repository.UserRepository;
import com.projecttask.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectController(ProjectService projectService,
                             UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create(
            @Valid @RequestBody ProjectCreateRequest dto,
            Authentication authentication
    ) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(user, dto));
    }

    @GetMapping
    public List<ProjectResponse> myProjects(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return projectService.getMyProjects(user);
    }

    @GetMapping("/{id}")
    public ProjectResponse byId(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return projectService.getProjectById(id, user);
    }
}