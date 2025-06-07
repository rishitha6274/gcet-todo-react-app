import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos/all`);
      const data = await res.json();
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

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`${API_BASE}/todos/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodo = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/todos/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        const err = await res.json();
        setError(err.message);
      }
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        backgroundColor: "#e0f7ff",
        borderRadius: 12,
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        marginTop: 50,
      }}
    >
        <h1 style={{ color: "#0077b6"}}>Helloo :) </h1>
        <h2>Get your tasks done !</h2>
      <h2 style={{ color: "#0077b6", textAlign: "center" }}>📝 To-Do List</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}
