// EditTaskModal.jsx
import React, { useState } from "react";

const EditTaskModal = ({ isOpen, onClose, task, onEditTask }) => {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    onEditTask(task.id, status, priority);
    // Update priority here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal">
      <div className="modal-content">
        <div className="popup-header">
          <div className="popup-heading">EDIT TASK</div>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="form-card">
          <div className="edit-fields">
            <label className="">Title:</label>
            <input
              className="non-editable"
              type="text"
              value={task.title}
              readOnly
            />
          </div>
          <div className="edit-fields">
            <label>Description:</label>
            <textarea
              className="non-editable"
              value={task.description}
              readOnly
            />
          </div>
          <div className="edit-fields">
            <label>Team:</label>
            <input
              className="non-editable"
              type="text"
              value={task.team}
              readOnly
            />
          </div>
          <div className="edit-fields">
            <label>Assignee:</label>
            <input
              className="non-editable"
              type="text"
              value={task.assignee}
              readOnly
            />
          </div>
          <div className="editable">
            <div className="structure">
              <label>Priority:</label>
              <select
                className="edit-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="structure">
              <label>Status:</label>
              <select
                className="edit-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <button className="save-btn" onClick={handleSave}>
            Submit
          </button>
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
