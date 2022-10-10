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
  Active: todo => !todo.completed,
  Completed: todo => todo.completed
};
const Filtername = Object.keys(Filtermap);

function App(props) {
  const [todos, settodos] = useState(props.todos);
  const [filter, setFilter] = useState("All");
  function toggletodoCompleted(id) {
    const updatedtodos = todos.map(todo => {
      if (id === todo.id) {
        return {
          ...todo, completed: !todo.completed}
      }
      return todo;
    });
    settodos(updatedtodos);
  }

  function addtodo(name){
    const newtodo = {id: nanoid(), name, completed: false};
    settodos([...todos, newtodo]);
  }

  function deletetodo(id) {
    let newtodos = [];
    for (var i=0; i< todos.length; i++) {
      if (todos[i].id !== id) {
          newtodos.push(todos[i]);
      }
    }
    newtodos = todos.filter(todo => id !== todo.id);
    settodos(newtodos);
  }
  const CleanHandle= () => {
    const nownum = todos.length;
    let newtodos = [];
    settodos(newtodos);
  }

  function get_update() {
    return document.getElementsByClassName('todo-completed');
  }
  const todoList = todos.filter(Filtermap[filter]).map(todo => (
    <Todo
    id={todo.id}
    name={todo.name}
    completed={todo.completed}
    toggletodoCompleted={toggletodoCompleted}
    deletetodo={deletetodo}
    key={todo.id}
    />
  )
  );
  const filterList = Filtername.map(name => (
    <FilterButton 
    key={name}
    name={name}
    setFilter={setFilter}
    />
  ));

  return (
      <div className='todo-app__root'>
        <Header />
        <section role="list" className="todo-app__main">
          <Form addtodo={addtodo} />
          {todoList}
        </section>

      <footer className='todo-app__footer' id='todo-footer'>
        <div className='todo-app__total'
              style={{visibility: !todos.length && 'hidden'}}
          >
          {todoList.length} left
        </div>
        <ul className='todo-app__view-buttons'>
          {filterList}
        </ul>
        <div className='todo-app__clean'>
            <button id='Clear_completed' 
            type='button' 
            style={{visibility: !todos.length && 'hidden' }}
            onClick={CleanHandle}
            >Clear completed</button>
          </div>
      </footer>
    </div>
  );
}

export default App;
