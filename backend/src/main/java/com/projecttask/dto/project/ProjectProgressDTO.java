package com.projecttask.dto.project;

public class ProjectProgressDTO {

    private long totalTasks;
    private long completedTasks;
    private double progressPercentage;

    public ProjectProgressDTO(long totalTasks, long completedTasks, double progressPercentage) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.progressPercentage = progressPercentage;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }
}

