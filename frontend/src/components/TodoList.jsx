import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length)
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <div className="font-semibold text-slate-700">No tasks here yet</div>
        <p className="mt-1 text-sm text-slate-500">
          Add a task above to get started.
        </p>
      </div>
    );
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
