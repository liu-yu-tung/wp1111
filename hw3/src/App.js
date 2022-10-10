import './App.css';
import './styles.css';
import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';


const Header = (props) => {
  return (
      <header className="todo-app__header">
        <div className='todo-app__title'>todos</div>
      </header>
  );
};
function Item(props){
  console.log(props);
  return(
    <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input id={props.id} type="checkbox" defaultChecked={props.status}></input>
        <label htmlFor={props.id}></label>
      </div>
      <h1 className='todo-app__item-detail'>
        {props.name}
      </h1>
          <img src={require('./img/x.png')} className='todo-app__item-x'></img>
      </li>
  );
};

function Input(props) {
  const [name, setName] = useState("");

  function handleChange(event){
    setName(event.target.value);
  };
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      if (name === "") {
        console.log("none");
      }
      else {
        event.preventDefault();
        props.addTask(name);
        console.log("name: " + name);
        setName("");
      }
    }
  };
  return(
      <input className="todo-app__input" 
        placeholder="What needs to be done?" 
        type="text"
        name="text"
        autoComplete='off'
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        >
      </input>
  );
};

function App() {
  //let DATA = [];
  const [tasks, setTasks] = useState();
  const [num, setNum] = useState(0);
  function addTask(name){
    console.log("add new task: " + name);
    setNum(num + 1);
    const newTask = {id: num, name, completed: false}; 
    setTasks([...tasks, newTask]);
    console.log("print tasklist");
    console.log(taskList);
  }
  const taskList = tasks.map((task) => (
    <Item 
    id={task.id}
    name={tasks.name}
    completed={task.completed}
    key={num}
    />
  )
  );
  return (
      <div className='todo-app__root'>
        <Header />
        <section role="list" className="todo-app__main">
          <Input addTask={addTask} />
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
