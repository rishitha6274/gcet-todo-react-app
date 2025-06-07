import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={submitHandler} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Add new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ width: "80%", padding: "8px" }}
      />
      <button
  type="submit"
  style={{
    padding: "10px 20px",
    marginLeft: 10,
    background: "linear-gradient(to right, #00b4d8, #0096c7)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  }}
  onMouseOver={(e) =>
    (e.target.style.background = "linear-gradient(to right, #0096c7, #0077b6)")
  }
  onMouseOut={(e) =>
    (e.target.style.background = "linear-gradient(to right, #00b4d8, #0096c7)")
  }
>
  Add
</button>

    </form>
  );
}
