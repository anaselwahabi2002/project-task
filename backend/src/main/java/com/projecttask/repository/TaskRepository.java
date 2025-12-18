package com.projecttask.repository;


import com.projecttask.model.Project;
import com.projecttask.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProject(Project project);

    long countByProject(Project project);

    long countByProjectAndCompletedTrue(Project project);
}
