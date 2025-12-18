package com.projecttask.mapper;

import com.projecttask.dto.project.ProjectCreateRequest;
import com.projecttask.dto.project.ProjectResponse;
import com.projecttask.dto.project.ProjectUpdateRequest;
import com.projecttask.model.Project;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project toEntity(ProjectCreateRequest dto);

    ProjectResponse toResponse(Project project);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProjectUpdateRequest dto, @MappingTarget Project project);

}
