import React, { useEffect, useState } from 'react'
import './Page.css'
import { arrow, closeicon } from '../../assets';
import { v4 as uuidv4 } from "uuid";

const PageMain = () => {

    const [taskInpt, setTaskInpt] = useState("");
  const [tasksTodo, setTasksTodo] = useState([]);


    
    useEffect(() => {
      if (localStorage.getItem("localTasks")) {
        const storedList = JSON.parse(localStorage.getItem("localTasks"));
        setTasksTodo(storedList);
      }
    }, []);

   const addTask = (e) => {
     if (taskInpt) {
       const newTask = { completed: false, id: uuidv4(), title: taskInpt };
       setTasksTodo([...tasksTodo, newTask]);
       localStorage.setItem(
         "localTasks",
         JSON.stringify([...tasksTodo, newTask])
       );
       setTaskInpt("");
       console.log("taskInpt.id:", taskInpt.id);
     }
   };
const handleComplete = (taskId) => {
  const updatedTasks = tasksTodo.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed,
      };
    }
    return task;
  });
  setTasksTodo(updatedTasks);
};


     const handleKeyPress = (e) => {
       if (e.key === "Enter") {
         addTask();
       }
     };

  const handleDelete = (task) => {
    const deleted = tasksTodo.filter((t) => t.id !== task.id);
    setTasksTodo(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  
  return (
    <div className="main-div" id="maindiv">
      <div className="wrapper">
        <div className="input-txt-div">
          <input
            type="text"
            placeholder="Add new task"
            value={taskInpt}
            id="testinput"
            onChange={(e) => setTaskInpt(e.target.value)}
            onKeyPress={handleKeyPress}
            contentEditable
          />
          <div className="enter">
            <button
              className="add-btn"
              id="add-butn"
              type="button"
              onClick={addTask}
            >
              <img src={arrow} alt="" />
            </button>
          </div>
        </div>
        <div className="completed-txt" id="uncompleted">
          To Do List
        </div>
        {/* input div exit */}
        <div className="list-item" id="item">
          {tasksTodo.map((task) => (
            <React.Fragment key={task.id}>
              <div
                id="list-ts"
                className={`ts ${task.completed ? "completed" : ""}`}
                onClick={() => handleComplete(task.id)}
                type="button"
              >
                <span className="list-cont" id="list-cont">
                  {task.title}
                </span>
                {/* <img
                  src={closeicon}
                  alt=""
                  id="closeicon"
                  onClick={() => handleDelete(task)}
                /> */}
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* list-item div exit */}
        <div className="completed-txt" id="completed">
          Completed
        </div>
        <div className="list-item" id="completeditem">
          {tasksTodo
            .filter((task) => task.completed)
            .map((task) => (
              <React.Fragment key={task.id}>
                <div id="list-ts" className="ts">
                  <span className="list-cont" id="list-cont-complete">
                    {task.title}
                  </span>
                  <img
                    src={closeicon}
                    alt=""
                    id="closeicon"
                    onClick={() => handleDelete(task)}
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PageMain