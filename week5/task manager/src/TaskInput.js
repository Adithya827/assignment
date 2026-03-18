
import React, { useState } from "react";

function TaskInput({ addTask }) {

  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(task.trim() === "") return;

    addTask(task);
    setTask("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e)=>setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;
