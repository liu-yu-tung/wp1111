import React, {useEffect, useRef, useState} from 'react';
export default function Todo(props){

  const [remove, setRemove] = useState(false);
  const [checked, setChecked] = useState(props.completed);
  const removeHandle = () => {
    setRemove(!remove); 
    console.log(remove);
    props.deleteTask(props.id);
  }
  const checkHandle = () => {
    setChecked(!checked); 
    console.log(checked);
  };
  return(
    <li className={"todo-app__item ${remove &&'visibility-hidden'}"}

    >
      <div className='todo-app__checkbox'>
        <input id={props.id} 
               type="checkbox" 
               defaultChecked={props.completed}
               onClick={checkHandle}
               >

               </input>
        <label htmlFor={props.id}></label>
      </div>
      <h1 className='todo-app__item-detail' 
            style={{
                textDecoration: checked && 'line-through',
                transition: '0.3s'
            }}
            >
        {props.name}
      </h1>
          < img src={require('../img/x.png')} 
            className='todo-app__item-x'
            onClick={removeHandle}>
            </img>
      </li>
  );
};
