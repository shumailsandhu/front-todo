import React, { useContext, useEffect, useState } from "react";
import "../styles/home.scss";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Context } from "..";
import Task from "./Task";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const DeleteTask = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/task/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.err(error.response.data.message);
      setLoading(false);
    }

  };

  const updateTask = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.err(error.response.data.message);
      setLoading(false);
    }
  };

  const taskHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/task/new",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/task/mytasks", {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [loading]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="Home-container">
      <div className="Add-task">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Title"
          id=""
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
          placeholder="Description"
          id=""
        />
        <button disabled={loading} onClick={taskHandler} type="Submit">
          ADD TASK
        </button>
      </div>

      {tasks.map((item) => {
        return (
          <Task
            id={item._id}
            DeleteTask={DeleteTask}
            updateTask={updateTask}
            isCompleted={item.isCompleted}
            key={item._id}
            title={item.title}
            description={item.description}
            key1={item._id}
          />
        );
      })}
    </div>
  );
};

export default Home;
