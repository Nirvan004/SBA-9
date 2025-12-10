import React, { useState, useMemo } from "react";
import type { Task, TaskFormData, TaskFilterOptions } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilterOptions>({});
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddOrUpdateTask = (data: TaskFormData) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id ? { ...t, ...data } : t
        )
      );
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const stats = useMemo(() => {
    const statusCount: Record<string, number> = {};
    const priorityCount: Record<string, number> = {};

    tasks.forEach(task => {
      statusCount[task.status] = (statusCount[task.status] || 0) + 1;
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
    });

    return { statusCount, priorityCount };
  }, [tasks]);

  return (
    <div className="dashboard-container">

      <div className="dashboard-form">
        <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
        <TaskForm
          initialValues={editingTask ?? undefined}
          onSubmit={handleAddOrUpdateTask}
        />
      </div>

      <div className="dashboard-filter">
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>

      <div className="dashboard-list">
        <TaskList
          tasks={tasks}
          filter={filter}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      </div>

      <div className="dashboard-stats">
        <h3>Task Statistics</h3>
        <div className="stats-section">
          <h4>Status</h4>
          <ul>
            <li>To Do: {stats.statusCount["todo"] || 0}</li>
            <li>In Progress: {stats.statusCount["in-progress"] || 0}</li>
            <li>Done: {stats.statusCount["done"] || 0}</li>
          </ul>
        </div>
        <div className="stats-section">
          <h4>Priority</h4>
          <ul>
            <li>Low: {stats.priorityCount["low"] || 0}</li>
            <li>Medium: {stats.priorityCount["medium"] || 0}</li>
            <li>High: {stats.priorityCount["high"] || 0}</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;