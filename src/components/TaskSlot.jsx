import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskSlot({ hour }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("work");
  const navigate = useNavigate();

  const saveTask = () => {
    if (!text.trim()) return;

    const savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
    const newTask = {
      hour,
      text,
      category,
      completed: false,
    };

    localStorage.setItem(
      "savedTasks",
      JSON.stringify([...savedTasks, newTask])
    );

    // Redirect to /saved
    navigate("/saved");
  };

  const categoryColors = {
    work: "border-blue-500",
    study: "border-green-500",
    leisure: "border-yellow-500",
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-2 p-2 border-l-4 rounded shadow-sm bg-white ${
        categoryColors[category]
      }`}
    >
      <div className="w-20 font-semibold">{hour}</div>
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 rounded border"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded border"
      >
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="leisure">Leisure</option>
      </select>
      <button
        onClick={saveTask}
        className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Save Task
      </button>
    </div>
  );
}
