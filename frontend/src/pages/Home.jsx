import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoService.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import TaskSummary from "../components/TaskSummary.jsx";
import FilterTabs from "../components/FilterTabs.jsx";

export default function Home() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTodos() {
    try {
      setError("");
      const { data } = await getTodos();
      setTodos(data.todos);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load todos. Check the backend and MongoDB.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(title) {
    try {
      const { data } = await createTodo({ title });
      setTodos((old) => [data.todo, ...old]);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add task.");
    }
  }
  async function toggleTodo(todo) {
    try {
      const { data } = await updateTodo(todo._id, {
        completed: !todo.completed,
      });
      setTodos((old) => old.map((t) => (t._id === todo._id ? data.todo : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Could not update task.");
    }
  }
  async function editTodo(id, payload) {
    try {
      const { data } = await updateTodo(id, payload);
      setTodos((old) => old.map((t) => (t._id === id ? data.todo : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Could not edit task.");
    }
  }
  async function removeTodo(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTodo(id);
      setTodos((old) => old.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete task.");
    }
  }

  const visibleTodos = useMemo(
    () =>
      todos.filter(
        (t) =>
          filter === "All" ||
          (filter === "Completed" ? t.completed : !t.completed),
      ),
    [todos, filter],
  );

  return (
    <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Hello, {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="mt-2 text-slate-500">
          Manage your tasks and stay productive.
        </p>
      </div>
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          <span>{error}</span>
          <button onClick={() => setError("")} className="font-bold">
            ×
          </button>
        </div>
      )}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <TodoForm onAdd={addTodo} />
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-xl font-bold text-slate-900">
                Your todos{" "}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  ({visibleTodos.length})
                </span>
              </h2>
              <FilterTabs filter={filter} setFilter={setFilter} />
            </div>
            {loading ? (
              <div className="py-10 text-center text-slate-500">
                Loading your tasks…
              </div>
            ) : (
              <TodoList
                todos={visibleTodos}
                onToggle={toggleTodo}
                onDelete={removeTodo}
                onEdit={editTodo}
              />
            )}
          </section>
        </div>
        <div className="space-y-5">
          <TaskSummary todos={todos} />
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold text-slate-800">
              Small steps, big progress ✨
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your tasks organized. Complete one thing at a time and build
              momentum every day.
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{
                  width: `${todos.length ? (todos.filter((t) => t.completed).length / todos.length) * 100 : 0}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {todos.length
                ? Math.round(
                    (todos.filter((t) => t.completed).length / todos.length) *
                      100,
                  )
                : 0}
              % of tasks completed
            </p>
          </section>
        </div>
      </div>
      <footer className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TodoApp · Built with React, Tailwind CSS v4
        and the MERN stack
      </footer>
    </div>
  );
}
