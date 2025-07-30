import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `px-4 py-1.5 rounded-md transition font-medium ${
      pathname === path
        ? "bg-emerald-600 text-white shadow"
        : "text-emerald-700 hover:bg-emerald-100"
    }`;

  return (
    <nav className="bg-white border-b border-emerald-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-700">Daily Planner</h1>
        <div className="flex gap-3">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/planner" className={linkClasses("/planner")}>
            Planner
          </Link>
          <Link to="/saved" className={linkClasses("/saved")}>
            Saved
          </Link>
        </div>
      </div>
    </nav>
  );
}
