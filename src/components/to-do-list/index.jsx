import React, { useEffect } from 'react'
//import mockDate from '../mock-data/mock-data.json'
import { useState } from 'react';
import './index.css'
//import MarkFinish from '../mark-finish';
function TodoList({ unfinishedItems,markComplete}) {
   unfinishedItems =unfinishedItems|| [];



    return (

      <div className='to-do-panel'>
      <div className='to-do-list'>
        <h3>To Do List</h3>
        <ul className="list-group">
          {unfinishedItems.map((item, index) => (
            <li key={index} className="list-group-item">
              <span><b>Event Name:</b>{item.toDo}</span>
              <br></br>
              <span><b>Due Date:</b>{item.dueDate}</span> 
             {/* child component only response to render UI and trigger the logic function */}
              <button className='btn btn-success' onClick={() => markComplete(item.id)}>Mark Done</button>
            </li>
          ))}
        </ul>
      </div>
      </div> 
    );
  }

        


   

export default TodoList;

