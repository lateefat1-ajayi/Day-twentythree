import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SavedTasks() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedTasks")) || [];
    setTasks(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("savedTasks", JSON.stringify(updated));
    toast.success("Task deleted");
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const handleEditSave = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, text: editedTask } : task
    );
    setTasks(updated);
    localStorage.setItem("savedTasks", JSON.stringify(updated));
    setEditingIndex(null);
    toast.info("Task updated");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Saved Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`p-4 border rounded-lg flex justify-between items-center ${
                task.category === "Work"
                  ? "bg-emerald-50"
                  : task.category === "Study"
                  ? "bg-blue-50"
                  : "bg-yellow-50"
              }`}
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="border px-2 py-1 rounded w-full mr-2"
                />
              ) : (
                <span>{task.text}</span>
              )}
              <div className="flex gap-2">
                {editingIndex === index ? (
                  <button
                    onClick={() => handleEditSave(index)}
                    className="bg-emerald-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(index)}
                    className="text-emerald-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
