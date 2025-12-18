package com.projecttask.dto.task;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class TaskRequestDTO {

    @NotBlank
    private String title;

    private String description;

    private LocalDate dueDate;

    public TaskRequestDTO() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
}
