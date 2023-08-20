import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import Head from "next/head";

const NewTask = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const [reminder, setReminder] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !duration) {
      alert("Please fill in all fields before adding or updating a task.");
      return;
    }

    if (editedTask) {
      const updatedTask = {
        ...editedTask,
        title,
        description,
        duration,
        reminder,
        assignedTo,
      };

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? updatedTask : task
        )
      );

      setEditedTask(null);
      toast.success("Task updated successfully!");
    } else {
      const newTask = {
        id: idCounter,
        title,
        description,
        duration,
        reminder,
        assignedTo,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setIdCounter((prevId) => prevId + 1);
      toast.success("Task added successfully!");
    }

    setTitle("");
    setDescription("");
    setDuration("");
    setReminder("");
    setAssignedTo("");
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDuration(task.duration);
    setReminder(task.reminder);
    setAssignedTo(task.assignedTo);
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    const completedTask = tasks.find((task) => task.id === taskId);
    if (completedTask && completedTask.completed) {
      toast.info(`Task "${completedTask.title}" is now completed!`);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <Fragment>
      <Head>
        <title>New-task</title>
      </Head>
      <div>
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Office Daily Tasks</h1>
          <button
            onClick={() => router.push("/")}
            style={{
              marginLeft: "10px",
              padding: "4px 8px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Home
          </button>
        </header>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="title">Task Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="description">Task Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="duration">Duration (in hours):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="reminder">Reminder Date:</label>
            <input
              type="date"
              id="reminder"
              name="reminder"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="assignedTo">Assigned To:</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {editedTask ? "Update Task" : "Add Task"}
          </button>
        </form>

        <h2 style={{ textAlign: "center" }}>Task List</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: task.completed ? "#d3ffd3" : "#fff",
              }}
            >
              <strong>{task.title}</strong>: {task.description}
              <br />
              Duration: {task.duration} hours
              <br />
              Reminder: {task.reminder}
              <br />
              Assigned to: {task.assignedTo}
              <button
                onClick={() => handleCompleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {task.completed ? "Incomplete" : "Complete"}
              </button>
              <button
                onClick={() => handleEditTask(task)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default NewTask;
