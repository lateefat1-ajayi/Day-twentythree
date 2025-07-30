import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Daily Planner 🗓️</h2>
      <p className="mb-6">Stay organized, focused, and productive—hour by hour.</p>
      <Link
        to="/planner"
        className="px-6 py-3 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700 transition"
      >
        Go to Planner
      </Link>
    </div>
  );
}
