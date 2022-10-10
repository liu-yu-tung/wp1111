import React, {useEffect, useRef, useState} from 'react';
export default function Todo(props){

  const [remove, setRemove] = useState(false);
  const [checked, setChecked] = useState(props.completed);
  const removeHandle = () => {
    setRemove(!remove); 
    console.log(remove);
    props.deletetodo(props.id);
  }
  const checkHandle = () => {
    props.toggletodoCompleted(props.id);
    setChecked(!checked); 
    //console.log("props completed" + props.completed);
  };
  return(
    <li className={"todo-app__item"}
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
      <h1 className={'todo-app__item-detail'}
            style={{
                textDecoration: checked && 'line-through',
                opacity: '50%',
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
