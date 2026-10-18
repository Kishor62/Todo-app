export default function FilterTabs({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2">
      {["All", "Pending", "Completed"].map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${filter === item ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
