import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../App";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const { user, setUser } = useContext(TodoContext);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos/${user.email}`);
      const data = await res.json();
      if (res.ok) {
        setTodos(data);
      } else {
        setError(data.message || "Failed to fetch todos");
      }
    } catch {
      setError("Error fetching todos");
    }
  };

  const addTodo = async (task) => {
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, task }),
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Welcome, {user?.name || user?.email}</h2>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}
