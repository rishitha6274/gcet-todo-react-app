export default function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          style={{
            marginBottom: 10,
            textDecoration: todo.completed ? "line-through" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label style={{ flexGrow: 1 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              style={{ marginRight: 10 }}
            />
            {todo.task}
          </label>
          <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}
