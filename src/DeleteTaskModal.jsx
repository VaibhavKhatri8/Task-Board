// DeleteTaskModal.jsx
import React from "react";

const DeleteTaskModal = ({ isOpen, onClose, task, onDeleteTask }) => {
  const handleDelete = () => {
    onDeleteTask(task.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <div className="popup-header">
          <div className="popup-heading">DELETE TASK</div>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="form-card">
          <div>Do You Wish to Delete Task</div>
          <div className="delete-fields">
            <div className="task-title">{task.title}</div>
            <div className="dlt-box">
              <button className="dlt-btn" onClick={handleDelete}>
                Yes
              </button>
              <button className="dlt-btn" onClick={onClose}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
