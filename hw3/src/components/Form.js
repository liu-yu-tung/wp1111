import React, {useEffect, useRef, useState} from 'react';

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(event){
    setName(event.target.value);
  };

  function handleSubmit(event){
    event.preventDefault();
    if (!name.trim()) {
        return;
    }
    props.addtodo(name);
    setName("");
  };

  return(
    <form onSubmit={handleSubmit}>
      <input className="todo-app__input todo-item-input"  
        placeholder="What needs to be done?" 
        type="text"
        name="text"
        autoComplete='off'
        value={name}
        onChange={handleChange}
        >
      </input>
    </form>
  );
};

export default Form;