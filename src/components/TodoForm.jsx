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
      <button type="submit" style={{ padding: "8px 16px", marginLeft: 10 }}>
        Add
      </button>
    </form>
  );
}
