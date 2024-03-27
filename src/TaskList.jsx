import React, { useState } from "react";
import Task from "./Task";

const TaskList = ({
  title,
  tasks,
  onEditTask,
  onDeleteTask,
  openDropdownTask,
  onDropdownToggle,
}) => {
  const getHeaderColor = (title) => {
    switch (title) {
      case "Pending":
        return "#575757";
      case "In Progress":
        return "#ff7d00";
      case "Completed":
        return "#17d817";
      case "Deployed":
        return "#8c0e8c";
      case "Deferred":
        return "#ff7373";
      default:
        return "#575757";
    }
  };

  const headerColor = tasks.length > 0 ? getHeaderColor(title) : "#575757";

  return (
    <div className="task-list">
      <div className="card-header" style={{ backgroundColor: headerColor }}>
        {title}
      </div>
      <div className="task-list-content">
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            isOpenDropdown={openDropdownTask && openDropdownTask.id === task.id}
            onDropdownToggle={() => onDropdownToggle(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
