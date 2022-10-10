import './App.css';
import './styles.css';
import Todo from "./components/Todo";
import Form from "./components/Form"
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import {nanoid} from "nanoid";

const Header = () => {
  return (
      <header className="todo-app__header">
        <div className='todo-app__title'>todos</div>
      </header>
  );
};

function App(props) {
  const [num, setNum] = useState(0);
  const [tasks, setTasks] = useState(props.tasks);
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        console.log("completed");
        return {
          ...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name){
    console.log("num = " + tasks.length);
    const newTask = {id: nanoid(), name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    console.log("delete");
    let newTasks = [];
    for (var i=0; i< tasks.length; i++) {
      if (tasks[i].id !== id) {
          //console.log(id + " " + tasks[i].id);
          newTasks.push(tasks[i]);
          console.log("num = " + tasks.length);
      }
    }
    //let newTasks = tasks.filter(task => id !== task.id);
    setTasks(newTasks);
  }
  const CleanHandle= () => {
    const nownum = tasks.length;
    let newTasks = [];
    setTasks(newTasks);
    
    //TODO:
    console.log("nownum = " + nownum);
      console.log("num = " + tasks.length);
    
  }
  const taskList = tasks.map(task => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    key={task.id}
    />
  )
  );
  return (
      <div className='todo-app__root'>
        <Header />
        <section role="list" className="todo-app__main">
          <Form addTask={addTask} />
          {taskList}
        </section>

      <footer className='todo-app__footer' id='todo-footer'>
        <div className='todo-app__total'
              style={{visibility: !tasks.length && 'hidden'}}
          >
          {tasks.length} left
        </div>
        <ul className='todo-app__view-buttons'>
          <li className='todo-app__button_All'>
            <button id='All' type='button'>All</button>
          </li>
          <li className='todo-app__button_Active'>
            <button id='Active' type='button'>Active</button>
          </li>
          <li className='todo-app__button_Completed'>
            <button id='Completed' type='button'>Completed</button>
          </li>
        </ul>
        <div className='todo-app__clean'>
            <button id='Clear_completed' 
            type='button' 
            style={{visibility: !tasks.length && 'hidden' }}
            onClick={CleanHandle}
            >Clear completed</button>
          </div>
      </footer>
    </div>
  );
}

export default App;
