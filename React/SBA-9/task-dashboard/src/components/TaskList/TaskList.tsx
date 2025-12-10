import React, { useState, useMemo } from "react";
import type { TaskListProps, Task } from "../../types";
import TaskItem from "./TaskItem";

const TaskList: React.FC<TaskListProps> = ({ tasks, filter, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {

        if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }

        if (filter.status && task.status !== filter.status) {
          return false;
        }

        if (filter.priority && task.priority !== filter.priority) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "priority") {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return 0;
      });
  }, [tasks, filter, search, sortBy]);

  const handleAddTask = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: "New Task",
      description: "",
      status: "todo",
      priority: "medium",
      createdAt: new Date().toISOString(),
      dueDate: null,
    };
    onUpdate(newTask);
  };

  return (
    <div className="task-list-container">

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="task-search"
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
        <option value="date">Sort by Date Created</option>
        <option value="priority">Sort by Priority</option>
      </select>

      <button onClick={handleAddTask}>Add Task</button>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p style={{ opacity: 0.7 }}>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;