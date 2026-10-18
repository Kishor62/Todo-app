import {
  CheckCircle2,
  CircleCheck,
  Clock3,
  Home,
  ListTodo,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { label: "Dashboard", icon: Home, filter: "All" },
  { label: "All Todos", icon: ListTodo, filter: "All" },
  { label: "Completed", icon: CircleCheck, filter: "Completed" },
  { label: "Pending", icon: Clock3, filter: "Pending" },
];

export default function Sidebar({ filter, setFilter }) {
  const { logout } = useAuth();
  return (
    <aside className="flex min-h-screen w-full flex-col bg-[#101b2d] px-4 py-6 text-white md:w-64 md:shrink-0">
      <div className="mb-9 flex items-center gap-3 px-2">
        <div className="grid size-11 place-items-center rounded-2xl bg-emerald-400 text-[#102039]">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <div className="text-2xl font-extrabold tracking-tight">
            Todo<span className="text-emerald-400">App</span>
          </div>
          <div className="text-sm text-slate-300">MERN Stack</div>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {navItems.map(({ label, icon: Icon, filter: itemFilter }) => (
          <button
            key={label}
            onClick={() => setFilter(itemFilter)}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition ${filter === itemFilter && label !== "All Todos" ? "bg-blue-600" : "text-slate-200 hover:bg-white/10"}`}
          >
            <Icon size={20} /> <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto hidden pt-10 md:block">
        <div className="mb-4 text-sm text-slate-300">
          Built with{" "}
          <span className="font-semibold text-emerald-400">MERN</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs text-slate-300">
          <span>MongoDB</span>
          <span>Express</span>
          <span>React</span>
          <span>Node.js</span>
        </div>
        <button
          onClick={logout}
          className="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/10"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
