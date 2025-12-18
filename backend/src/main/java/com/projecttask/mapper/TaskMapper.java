package com.projecttask.mapper;


import com.projecttask.dto.task.TaskRequestDTO;
import com.projecttask.dto.task.TaskRequestUpdateDTO;
import com.projecttask.dto.task.TaskResponseDTO;
import com.projecttask.model.Task;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "completed", ignore = true)
    Task toEntity(TaskRequestDTO dto);

    TaskResponseDTO toDto(Task task);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "project", ignore = true)
    })
    void updateEntity(TaskRequestUpdateDTO dto, @MappingTarget Task task);
}
