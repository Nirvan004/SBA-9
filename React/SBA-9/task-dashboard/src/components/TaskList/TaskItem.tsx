import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <div className="task-item">

      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <select value={task.status} onChange={handleStatusChange}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;