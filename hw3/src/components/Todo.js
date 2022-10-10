import React, {useEffect, useRef, useState} from 'react';
export default function Todo(props){
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
          <img src={require('../img/x.png')} className='todo-app__item-x'></img>
      </li>
  );
};
