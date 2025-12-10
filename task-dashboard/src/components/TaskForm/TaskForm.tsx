import React, { useState } from "react";
import type { TaskFormProps, TaskFormData} from "../../types";

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit }) => {

  const [formData, setFormData] = useState<TaskFormData>(
    initialValues ?? {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: null,
    }
  );

  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { title?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      {errors.title && <p className="error-text">{errors.title}</p>}

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      <label>
        Priority:
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate ?? ""}
          onChange={handleChange}
        />
      </label>

      <button type="submit">
        {initialValues ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;