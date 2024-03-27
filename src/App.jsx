import React, { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState({
    Pending: [],
    "In Progress": [],
    Completed: [],
    Deployed: [],
    Deferred: [],
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [openDropdownTask, setOpenDropdownTask] = useState(null);

  const handleDropdownToggle = (task) => {
    setOpenDropdownTask((prevTask) =>
      prevTask && prevTask.id === task.id ? null : task
    );
  };

  useEffect(() => {
    const filterTasks = (statusTasks) => {
      let filtered = statusTasks;

      if (selectedAssignee) {
        filtered = filtered.filter(
          (task) => task.assignee === selectedAssignee
        );
      }

      if (selectedPriority) {
        filtered = filtered.filter(
          (task) => task.priority === selectedPriority
        );
      }

      if (selectedFromDate) {
        const fromDate = new Date(selectedFromDate);
        filtered = filtered.filter(
          (task) => new Date(task.startDate) >= fromDate
        );
      }

      if (selectedToDate) {
        const toDate = new Date(selectedToDate);
        filtered = filtered.filter(
          (task) => new Date(task.startDate) <= toDate
        );
      }

      return filtered;
    };

    const newFilteredTasks = Object.fromEntries(
      Object.entries(tasks).map(([status, statusTasks]) => [
        status,
        filterTasks(statusTasks),
      ])
    );

    setFilteredTasks(newFilteredTasks);
  }, [
    selectedAssignee,
    selectedPriority,
    selectedFromDate,
    selectedToDate,
    tasks,
  ]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      Pending: [...prevTasks.Pending, newTask],
    }));
    setIsModalOpen(false);
  };

  const handleEditTask = (taskId, newStatus, newPriority) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Find and update the task
      for (const key in updatedTasks) {
        const tasks = updatedTasks[key];
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          const task = {
            ...tasks[taskIndex],
            status: newStatus,
            priority: newPriority,
          };
          tasks.splice(taskIndex, 1);
          updatedTasks[newStatus] = [...(updatedTasks[newStatus] || []), task];
          return updatedTasks;
        }
      }

      console.error(`Task with ID ${taskId} not found.`);
      return prevTasks; // Return previous tasks if task not found
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Iterate through each status key
      for (const key in updatedTasks) {
        const tasks = updatedTasks[key];
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1); // Remove task from tasks array
          return updatedTasks;
        }
      }

      console.error(`Task with ID ${taskId} not found.`);
      return prevTasks; // Return previous tasks if task not found
    });
  };

  const getAssigneeNames = (tasks) => {
    const assigneeNames = Object.values(tasks).flatMap((tasks) =>
      tasks.map((task) => task.assignee)
    );

    return [...new Set(assigneeNames)];
  };

  return (
    <div className="main">
      <div className="heading-text">
        <h1>Task Board</h1>
      </div>
      <div className="main-container">
        <div className="filter-container">
          <div className="filter-fields">
            <div className="filter-text">Filter By:</div>
            <select
              className="assignee-select"
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
            >
              <option value="">Assignee Name</option>
              {getAssigneeNames(tasks).map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <select
              className="priority-select"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </div>
          <div className="date-box">
            <label>
              From:
              <input
                className="date-input"
                type="date"
                onChange={(e) => setSelectedFromDate(e.target.value)}
              />
            </label>
            <label>
              To:
              <input
                className="date-input"
                type="date"
                onChange={(e) => setSelectedToDate(e.target.value)}
              />
            </label>
          </div>
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            Add New Task
          </button>
        </div>
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />
        <div className="task-list-container">
          {Object.keys(filteredTasks).map((status) => (
            <TaskList
              key={status}
              title={status}
              tasks={filteredTasks[status]}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              openDropdownTask={openDropdownTask}
              onDropdownToggle={handleDropdownToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
