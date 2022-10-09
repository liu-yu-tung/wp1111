import './App.css';
import './styles.css';
import React from 'react';
const { useState } = React;

const Item = () => {
    <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input type="checkbox"></input>
          <label></label>
      </div>
      <h1 className='todo-app__item-detail'></h1>
      <img src={require('./img/x.png')} className='todo-app__item-x'></img>
    </li>
};

const Input = () => {
    <input className="todo-app__input"  placeholder="What needs to be done">
        <ul className='todo-app__list' id="todo-list">
          <Item />
        </ul>
        </input>
};
function App() {
  return (
      <div className='todo-app__root'>
      <header className="todo-app__header">
        <div className='todo-app__title'>todos</div>
      </header>
      <section className="todo-app__main">
        <input className="todo-app__input"></input>
        <ul className='todo-app__list' id="todo-list">
    <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input type="checkbox"></input>
          <label></label>
      </div>

      <h1 className='todo-app__item-detail'></h1>
      <img src={require('./img/x.png')} className='todo-app__item-x'></img>
    </li>
        </ul>
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
