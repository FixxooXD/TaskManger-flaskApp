import React, { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (title) => {
    await API.post("/tasks", { title });
    fetchTasks();
  };

  const handleToggle = async (id, done) => {
    await API.put(`/tasks/${id}`, { done: !done });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white border border-yellow-300 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
          📝 Task Manager
        </h2>
        <AddTaskForm onAdd={handleAdd} />
        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks yet. Add one!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
