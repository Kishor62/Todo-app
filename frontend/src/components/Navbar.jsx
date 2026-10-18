import { CircleUserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
      <span className="font-semibold text-slate-500 md:hidden">TodoApp</span>
      <span className="hidden text-sm text-slate-400 md:block">
        Your personal productivity space
      </span>
      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm font-medium text-slate-700"
      >
        <CircleUserRound className="text-slate-400" /> {user?.name || "Account"}{" "}
        <span className="text-slate-400">⌄</span>
      </button>
    </header>
  );
}
