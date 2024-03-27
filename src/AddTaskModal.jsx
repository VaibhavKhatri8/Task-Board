import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      title,
      description,
      team,
      startDate: new Date().toISOString().split("T")[0],
      status,
      assignee,
      priority,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setTeam("");
    setAssignee("");
    setPriority("");
    setStatus("Pending");
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <div className="popup-header">
          <div className="popup-heading">CREATE A TASK</div>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} className="form-card">
          <div className="input-fields">
            <label className="label">Title:</label>
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <label className="label">Description:</label>
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="input-fields">
            <label className="label">Team:</label>
            <input
              className="input"
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <label className="label">Assignee:</label>
            <input
              className="input"
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <label className="label">Priority:</label>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="">Select Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </div>
          <button type="submit" className="add-task-button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
