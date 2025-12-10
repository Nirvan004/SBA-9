export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate?: string | null;
}

export interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  filter: TaskFilterOptions;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFormProps {
  initialValues?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
}

export interface TaskFilterProps {
  filter: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
}

export interface TaskFilterOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}