export default function TodoList({ todos }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo._id} style={{ marginBottom: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              style={{ marginRight: 10 }}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
}
