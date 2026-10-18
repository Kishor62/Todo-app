import { CheckCircle2, ClipboardList, Clock3 } from "lucide-react";

export default function TaskSummary({ todos }) {
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;
  const stats = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Total tasks",
      value: todos.length,
      icon: ClipboardList,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Task summary</h2>
      <div className="space-y-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`flex items-center justify-between rounded-xl ${bg} px-4 py-3`}
          >
            <div className="flex items-center gap-3">
              <Icon className={color} size={21} />
              <span className="text-sm text-slate-700">{label}</span>
            </div>
            <strong className="text-lg">{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
