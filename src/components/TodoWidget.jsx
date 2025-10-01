import { useState } from "react";
import "./TodoWidget.css";

export default function TodoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
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
              <input type="checkbox" />
              <span>{task}</span>
            </li>
          ))}
          
        </ul>




        </div>
      )}
    </div>
  );
}
