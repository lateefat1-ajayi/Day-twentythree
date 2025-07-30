import { useState } from "react";
import { toast } from "react-toastify";

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM"
];

export default function Planner() {
  const [tasks, setTasks] = useState(
    timeSlots.reduce((acc, time) => {
      acc[time] = "";
      return acc;
    }, {})
  );

  const [categories, setCategories] = useState(
    timeSlots.reduce((acc, time) => {
      acc[time] = "General";
      return acc;
    }, {})
  );

  const handleInputChange = (time, value) => {
    setTasks({ ...tasks, [time]: value });
  };

  const handleCategoryChange = (time, value) => {
    setCategories({ ...categories, [time]: value });
  };

  const handleSave = (time) => {
    const newTask = {
      hour: time,
      text: tasks[time],
      category: categories[time]
    };

    const prev = JSON.parse(localStorage.getItem("savedTasks")) || [];
    localStorage.setItem("savedTasks", JSON.stringify([...prev, newTask]));
    toast.success(`Saved task for ${time}`);
    setTasks({ ...tasks, [time]: "" }); // Optionally clear input
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">Daily Planner</h1>
      {timeSlots.map((time) => (
        <div
          key={time}
          className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="font-medium text-emerald-800 w-24">{time}</div>
          <input
            type="text"
            value={tasks[time]}
            onChange={(e) => handleInputChange(time, e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border rounded px-3 py-2"
          />
          <select
            value={categories[time]}
            onChange={(e) => handleCategoryChange(time, e.target.value)}
            className="border rounded px-2 py-1 bg-white"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>
          <button
            onClick={() => handleSave(time)}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
