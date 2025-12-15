import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Task Management Dashboard</h1>

        <button
          className="theme-toggle"
          onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <Dashboard />
    </div>
  );
}
export default App;
