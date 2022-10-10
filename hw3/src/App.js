import './App.css';
import './styles.css';
import Todo from "./components/Todo";
import Form from "./components/Form"
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';


const Header = (props) => {
  return (
      <header className="todo-app__header">
        <div className='todo-app__title'>todos</div>
      </header>
  );
};

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [num, setNum] = useState(0);
  function addTask(name){
    setNum(num + 1);
    const newTask = {id: num, name: name, completed: false}; 
    setTasks([...tasks, newTask]);
  }
  const taskList = tasks.map(task => (
    <Todo
    id={num}
    name={task.name}
    completed={task.completed}
    key={num}
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
        <div className='todo-app__total'></div>
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
            <button id='Clear_completed' type='button'>Clear completed</button>
          </div>
      </footer>
    </div>
  );
}

export default App;