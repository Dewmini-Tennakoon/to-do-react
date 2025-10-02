import { useState } from "react";
import "./TodoWidget.css";

export default function TodoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");


  // Add task with "done" flag
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  // Toggle done/undone
  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };
  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
// Start editing a task 
  const startEdit = (index) => {
  setEditIndex(index);
  setEditInput(tasks[index].text);
};
// Save edited task
const saveEdit = (index) => {
  const updated = tasks.map((task, i) =>
    i === index ? { ...task, text: editInput } : task
  );
  setTasks(updated);
  setEditIndex(null);
  setEditInput("");
};

  return (
    <div className={`todo-widget ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && (
        <div className="widget-content">
          <h3>To-Do</h3>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add task..."
          />
          <button className="add-btn" onClick={addTask}>Add</button>
<ul>
  {tasks.map((task, index) => (
    <li key={index}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(index)}
      />

      {editIndex === index ? (
        <>
          <textarea
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <div className="actions">
            <button className="save-btn" onClick={() => saveEdit(index)}>💾</button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>🗑️</button>
          </div>
        </>
      ) : (
        <>
          <span className={task.done ? "task-done" : ""}>{task.text}</span>
          <div className="actions">
            <button className="edit-btn" onClick={() => startEdit(index)}>✏️</button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>🗑️</button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

        
        </div>
      )}
    </div>
  );
}
