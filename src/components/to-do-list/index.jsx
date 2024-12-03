import React, { useEffect } from 'react'
//import mockDate from '../mock-data/mock-data.json'
import { useState } from 'react';
//import MarkFinish from '../mark-finish';
 function TodoList(props) {
    
const [toDoItems, setToDoItem] = useState([]);
useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('eventsList'));
    if (storedEvents) {
        //if there is  eventList in local stroage,
        //set toDoiTem
        setToDoItem(storedEvents);
    }
}, []); 

const markComplete = (id) => {
    const updatedItems = toDoItems.map((item) =>
        item.id === id ? { ...item, Status: true , finishDate: new Date().toLocaleDateString()} : item
    );
    setToDoItem(updatedItems);
    localStorage.setItem('eventsList', JSON.stringify(updatedItems));
  };

return (
<div>
    <h3>To Do List</h3>
    <ul className='list-group-item'>
    
        {
        toDoItems.length===0?(<li>You have complete all item</li>):(
            toDoItems
            .filter((item)=>item.Status === false)
                 .map((unfinishedItem,index)=>{
                     return (
                        <li key={index} className="list-group-item">
                        <span>{unfinishedItem.toDo}</span>
                        <span>{unfinishedItem.dueDate}</span> {/* Render 'dueDate' */}
                        <button onClick={()=>{markComplete(unfinishedItem.id)}}>mark Done</button>
                        </li>
                    )
                }
            )
        )
        }
    </ul>
      
  
</div>
)

        

}
   

export default TodoList;

