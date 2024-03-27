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
    let newFilteredTasks = {};

    Object.entries(tasks).forEach(([status, statusTasks]) => {
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

      newFilteredTasks[status] = filtered;
    });

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
      let task;
      const statusKeys = [
        "Pending",
        "In Progress",
        "Completed",
        "Deployed",
        "Deferred",
      ];
      for (let key of statusKeys) {
        const taskIndex = prevTasks[key].findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex > -1) {
          task = { ...prevTasks[key][taskIndex] }; // Copy the task instead of referencing it
          prevTasks = {
            // Create a new state instead of mutating the old one
            ...prevTasks,
            [key]: [
              ...prevTasks[key].slice(0, taskIndex),
              ...prevTasks[key].slice(taskIndex + 1),
            ],
          };
          break;
        }
      }
      if (!statusKeys.includes(newStatus)) {
        console.error(`Invalid status: ${newStatus}`);
        return prevTasks;
      }
      console.log("Before update", task);
      task.status = newStatus; // Update the status of the task
      task.priority = newPriority; // Update the priority of the task
      console.log("After update", task.id);
      return { ...prevTasks, [newStatus]: [...prevTasks[newStatus], task] };
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => {
      let task;
      const statusKeys = [
        "Pending",
        "In Progress",
        "Completed",
        "Deployed",
        "Deferred",
      ];
      for (let key of statusKeys) {
        const taskIndex = prevTasks[key].findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex > -1) {
          prevTasks = {
            // Create a new state instead of mutating the old one
            ...prevTasks,
            [key]: [
              ...prevTasks[key].slice(0, taskIndex),
              ...prevTasks[key].slice(taskIndex + 1),
            ],
          };
          break;
        }
      }
      return prevTasks;
    });
  };

  const getAssigneeNames = (tasks) => {
    const statusKeys = [
      "Pending",
      "In Progress",
      "Completed",
      "Deployed",
      "Deferred",
    ];
    let assigneeNames = [];

    for (let key of statusKeys) {
      const names = tasks[key].map((task) => task.assignee);
      assigneeNames = assigneeNames.concat(names);
    }

    const uniqueAssigneeNames = [...new Set(assigneeNames)];
    return uniqueAssigneeNames;
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
