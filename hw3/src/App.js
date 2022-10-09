import './App.css';
import './styles.css';
import React, { Fragment } from 'react';
import { useState } from 'react';


const Header = (props) => {
  return (
      <header className="todo-app__header">
        <div className='todo-app__title'>todos</div>
      </header>
  );
};
const Item = (props) => {
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

const Input = () => {
  const [input, setInput] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setInput(input + 1);
      console.log('do validate')
      console.log(input);
    }
  }
  return(
    <Fragment>
    <input className="todo-app__input" 
      placeholder="What needs to be done?" 
      onKeyDown={handleKeyDown}></input>
        <ul className='todo-app__list' id="todo-list">
          <Item 
            name={"todo-"+input} 
            id={"todo"+input}
            status={false}
          />
        </ul>
      </Fragment>
  );
};
function App(props) {
  return (
      <div id="root" className='todo-app__root'>
        <Header />
        <section className="todo-app__main">
          <Input />
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
