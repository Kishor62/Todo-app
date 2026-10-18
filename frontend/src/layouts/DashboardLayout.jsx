import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [filter, setFilter] = useState("All");
  // Dashboard currently owns its own filter; sidebar selection is retained for navigation UI.
  return (
    <div className="min-h-screen bg-[#f4f7fc] md:flex">
      <Sidebar filter={filter} setFilter={setFilter} />
      <div className="min-w-0 flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
