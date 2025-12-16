package com.projecttask.mapper;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.model.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project toEntity(ProjectCreateRequest dto);

    ProjectResponse toResponse(Project project);
}
