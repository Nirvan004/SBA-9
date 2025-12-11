Task Dashboard
This project implements a React + TypeScript task management dashboard with fully typed components and reusable UI patterns. Components include: TaskItem, TaskList, TaskFilter, TaskForm, and Dashboard. All components are strictly typed using TypeScript interfaces and demonstrate component composition, prop handling, event handling, conditional rendering, state management, and reusable UI patterns.

Components
1. TaskItem
Displays an individual task with title, description, status, priority, and due date. Includes controls for changing task status and deleting tasks.
Props:
type TaskStatus = "pending" | "in-progress" | "completed";
interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

2. TaskList
Renders a list of TaskItem components. Handles proper key management and passes event handlers down to each TaskItem. Displays a message if no tasks match the current filters
Props:
interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

3. TaskFilter
Allows users to filter tasks by status and priority. Calls a callback whenever filter values change.
Props:
interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

4. TaskForm
Controlled form for adding and editing tasks. Handles validation, submission, and shows feedback.
Props:

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

5. Dashboard
Composes all components into a cohesive interface. Handles state management, local storage persistence, light/dark mode toggle, and task statistics.
Props: None (main container)

Features
Task list rendering with unique keys
Filtering by status and priority
Task status updates and deletions
Light/dark mode toggle
Local storage persistence
Visual indicators for task priority and status
Conditional rendering for empty task lists
Fully typed with TypeScript interfaces
Responsive layout for desktop and mobile

Styling
Simple CSS with class-based styling (App.css)
Hover and active states for buttons and task cards
Priority badges with color coding
Status text colored by task status
Light/dark mode implemented with a toggle switch


Reflection: 
I used react and typecript for strict typing as well as using props that were easily importable to other parts of the project. Using react also really helped for real time updates especially when styling my css. Also through react was using hooks which helped with managing local state. This sba was mostly easy but I acccidently sent most of my commits to my lab 9.1 file while trying to fix a missing component in that lab. This happened because I forgot to git init and all of those commits were floating around in a way higher folder which led to a lot of headache trying to work through getting those commits back but I now know how to use git cherry-pick as well as go through git commit historys and a lot of usless knowledge unless I do that again so that was fun. Other than that, a lot of work was done easier because this is similar to the previous lab (lab 9.3) and some of those components were used as inspiration. For component composition as I said I looked at the older lab for the baseline and worked off that but for state management a lot of it was looking back at the lessons to refresh my memory so I did everything correctly. 
