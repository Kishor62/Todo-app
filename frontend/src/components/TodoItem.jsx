import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  async function save() {
    const trimmed = title.trim();
    if (trimmed && trimmed !== todo.title)
      await onEdit(todo._id, { title: trimmed });
    setEditing(false);
  }

  return (
    <article
      className={`flex items-start gap-3 rounded-xl border p-4 transition sm:items-center ${todo.completed ? "border-emerald-100 bg-emerald-50/70" : "border-slate-200 bg-white hover:border-blue-200"}`}
    >
      <button
        aria-label={todo.completed ? "Mark pending" : "Mark completed"}
        onClick={() => onToggle(todo)}
        className={`mt-1 grid size-6 shrink-0 place-items-center rounded-md border sm:mt-0 ${todo.completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent hover:border-blue-500"}`}
      >
        <Check size={16} />
      </button>
      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="flex gap-2">
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && save()}
              className="w-full rounded-lg border border-slate-300 px-2 py-1 outline-none focus:border-blue-500"
            />
            <button onClick={save} className="text-emerald-600">
              <Check size={18} />
            </button>
            <button
              onClick={() => {
                setTitle(todo.title);
                setEditing(false);
              }}
              className="text-slate-400"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div
            className={`break-words font-semibold ${todo.completed ? "text-slate-500 line-through" : "text-slate-800"}`}
          >
            {todo.title}
          </div>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays size={15} />{" "}
          {new Date(todo.createdAt || Date.now()).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric", year: "numeric" },
          )}
        </div>
      </div>
      <span
        className={`hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${todo.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
      >
        {todo.completed ? "Completed" : "Pending"}
      </span>
      <div className="flex shrink-0 gap-1">
        <button
          aria-label="Edit task"
          onClick={() => setEditing(true)}
          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
        >
          <Pencil size={17} />
        </button>
        <button
          aria-label="Delete task"
          onClick={() => onDelete(todo._id)}
          className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
