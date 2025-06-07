import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching todos...");
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos/all`);
      const data = await res.json();
      console.log("Received data:", data);
      if (res.ok) setTodos(data);
      else setError(data.message);
    } catch {
      setError("Error fetching todos");
    }
  };

  const addTodo = async (task) => {
  try {
    const res = await fetch(`${API_BASE}/todos/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }), 
    });

    if (res.ok) {
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } else {
      const err = await res.json();
      setError(err.message || "Failed to add todo");
    }
  } catch {
    setError("Error adding todo");
  }
};
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>To-Do List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}
