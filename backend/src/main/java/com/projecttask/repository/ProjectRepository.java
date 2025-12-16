package com.projecttask.repository;


import com.projecttask.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUserIdOrderByIdDesc(Long userId);

    Optional<Project> findByIdAndUserId(Long id, Long userId);
}