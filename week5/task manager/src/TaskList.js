import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask, setTasks }) {

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("taskIndex", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("taskIndex");

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks[draggedIndex];

    updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(index, 0, draggedTask);

    setTasks(updatedTasks);
  };

  return (
    <div className="task-list">

      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDrag(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
        >

          <TaskItem
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />

        </div>
      ))}

    </div>
  );
}

export default TaskList;