export default function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          style={{
            marginBottom: 12,
            backgroundColor: "#caf0f8",
            padding: 12,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          <label style={{ flexGrow: 1, cursor: "pointer" }}>
            <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => toggleComplete(todo._id, todo.completed)}
  style={{
    marginRight: 10,
    width: "20px",         
    height: "20px",         
    accentColor: "#00b4d8", 
    cursor: "pointer",
  }}
/>

            {todo.task}
          </label>
          <button
  onClick={() => deleteTodo(todo._id)}
  style={{
    background: "linear-gradient(to right, #ff6b6b, #f06543)",
    border: "none",
    borderRadius: "8px",
    padding: "6px 12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
  }}
  onMouseOver={(e) =>
    (e.target.style.background = "linear-gradient(to right, #f06543, #d62828)")
  }
  onMouseOut={(e) =>
    (e.target.style.background = "linear-gradient(to right, #ff6b6b, #f06543)")
  }
>
  ❌
</button>

        </li>
      ))}
    </ul>
  );
}
