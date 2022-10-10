import React, { Fragment, useState } from 'react';

function FilterButton(props) {
    return (
          <li className='todo-app__button_All'>
            <button id={props.id} 
            type='button'
            onClick={()=>props.setFilter(props.name)}
            >{props.name}</button>
          </li>
    )
}
export default FilterButton;