import React from "react";
import type { TaskFilterProps, TaskStatus, TaskPriority } from "../../types";

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {

  const handleChange = (
    key: keyof typeof filter,
    value: TaskStatus | TaskPriority | string | undefined
  ) => {
    onFilterChange({
      ...filter,
      [key]: value || undefined,
    });
  };

  return (
    <div className="task-filter">

      <input
        type="text"
        placeholder="Search tasks..."
        value={filter.search ?? ""}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      <select
        value={filter.status ?? ""}
        onChange={(e) => handleChange("status", e.target.value as TaskStatus)}
      >
        <option value="">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filter.priority ?? ""}
        onChange={(e) => handleChange("priority", e.target.value as TaskPriority)}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="active-filters">
        {filter.status && <span className="filter-indicator">Status: {filter.status}</span>}
        {filter.priority && <span className="filter-indicator">Priority: {filter.priority}</span>}
        {filter.search && <span className="filter-indicator">Search: {filter.search}</span>}
      </div>

    </div>
  );
};

export default TaskFilter;