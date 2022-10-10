import './App.css';
import './styles.css';
import Todo from "./components/Todo";
import Form from "./components/Form"
import FilterButton from "./components/FilterButton"
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

const Filtermap = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const Filtername = Object.keys(Filtermap);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name){
    const newTask = {id: nanoid(), name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    let newTasks = [];
    for (var i=0; i< tasks.length; i++) {
      if (tasks[i].id !== id) {
          newTasks.push(tasks[i]);
      }
    }
    newTasks = tasks.filter(task => id !== task.id);
    setTasks(newTasks);
  }
  const CleanHandle= () => {
    const nownum = tasks.length;
    let newTasks = [];
    setTasks(newTasks);
  }

  function get_update() {
    return document.getElementsByClassName('todo-completed');
  }
  const taskList = tasks.filter(Filtermap[filter]).map(task => (
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
  const filterList = Filtername.map(name => (
    <FilterButton 
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));

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
          {taskList.length} left
        </div>
        <ul className='todo-app__view-buttons'>
          {filterList}
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
