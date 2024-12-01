import React from 'react'
import mockDate from '../mock-data/mock-data.json'
import { useState } from 'react';
export default function TodoList(props) {
    const [toDoItems, setToDoItem] = useState([...mockDate]);
  return (

<div>
<h3> To Do List</h3>
{toDoItems.map((item,index)=>{
    return(
        <li key={index} className="list-group-item">
              {item.toDo} {/* Assuming each item in mockData has a 'toDo' property */}
            </li>
    )

})}
   
</div>
    
  )
}
