import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

const Task = ({
  task,
  onEditTask,
  onDeleteTask,
  isOpenDropdown,
  onDropdownToggle,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    onDropdownToggle();
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    onDropdownToggle(); // Close dropdown when delete is clicked
  };

  return (
    <div className="task-container">
      <div className="task">
        <div className="task-header">
          <div className="task-title">{task.title}</div>
          <div className="task-priority">{task.priority}</div>
        </div>
        <hr className="separator" />
        <p className="task-desc">{task.description}</p>
        <div className="below-desc">
          <div className="task-ass">@{task.assignee}</div>
          <button className="dots-btn" onClick={onDropdownToggle}>
            &#8942;
          </button>
          {isOpenDropdown && (
            <div className="dropdown-menu">
              <button
                className="btns-new"
                onClick={handleEditClick}
                disabled={task.status === "Completed"}
              >
                Edit
              </button>
              <hr className="separator-2" />
              <button
                className="btns-new"
                onClick={handleDeleteClick}
                disabled={task.status === "Completed"}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="sts-btn">{task.status}</div>
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={task}
          onEditTask={onEditTask}
        />
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          task={task}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
};

export default Task;
