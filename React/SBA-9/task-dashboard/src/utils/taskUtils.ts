import type { Task, TaskFilterOptions, TaskPriority} from "../types";

export const filterTasks = (
  tasks: Task[],
  filter: TaskFilterOptions
): Task[] => {
  return tasks.filter(task => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase()))
      return false;
    return true;
  });
};

export const sortTasks = (
  tasks: Task[],
  sortBy: "date" | "priority" = "date"
): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "priority") {
      const priorityOrder: Record<TaskPriority, number> = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });
};

export const validateTaskForm = (data: Partial<Task>): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!data.title || !data.title.trim()) {
    errors.title = "Title is required.";
  }

  if (data.dueDate) {
    const due = new Date(data.dueDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if (due < today) {
      errors.dueDate = "Due date cannot be in the past.";
    }
  }

  return errors;
};

export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};