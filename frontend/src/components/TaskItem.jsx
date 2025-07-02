function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between bg-yellow-50 border border-yellow-200 shadow-sm p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id, task.done)}
          className="w-5 h-5 accent-yellow-500"
        />
        <span
          className={`text-base ${
            task.done
              ? "line-through text-gray-400"
              : "text-gray-800 font-medium"
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-sm text-yellow-600 hover:text-yellow-800"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
