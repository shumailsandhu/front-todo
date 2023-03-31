import React from "react";
import "../styles/home.scss";

const Task = ({ title, description, key1, isCompleted, DeleteTask,updateTask, id }) => {
  return (
    <div key={key1} className="all-tasks">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <article>
        <input onChange={()=>updateTask(id)} type="checkbox" checked={isCompleted} name="" id="" />
        <button onClick={()=>DeleteTask(id)}>Delete</button>
      </article>
    </div>
  );
};

export default Task;
