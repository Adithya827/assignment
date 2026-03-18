import React from "react";

function TaskItem({ task, deleteTask, toggleTask }) {

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>

      <label className="checkbox-container">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <span className="checkmark"></span>

      </label>

      <span>{task.text}</span>

      <button
        className="delete"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>

    </div>
  );
}

export default TaskItem;