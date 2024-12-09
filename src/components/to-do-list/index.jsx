import React, { useEffect } from 'react'
//import mockDate from '../mock-data/mock-data.json'
import { useState } from 'react';
import './index.css'
import Priority from './priority';
//import MarkFinish from '../mark-finish';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { useNavigate } from 'react-router-dom';
import formatDateToIso from '../format-method/formatDateToIso';

function TodoList({ unfinishedItems,markComplete}) {
   unfinishedItems =unfinishedItems|| [];

   //don't open anything until uuid of event was set to state
   const [SubTaskWindowsToBeOpen,setSubTaskWindowsToBeOpen] = useState(null);
  const navigate = useNavigate();

    return (

      <div className='to-do-panel'>
      <div className='to-do-list'>
        <h3>To Do List</h3>
        <div className='list-overflow-control'>
        <ul className="list-group">
          {unfinishedItems.length>0?
          unfinishedItems.map((item, index) => 
          (
            <li key={index} className="list-group-item ">
              <span><b>Event Name:</b>{item.toDo}</span>
              <br/>
              <span><b>Due Date:</b>{item.dueDate}</span> 
              <br/>
              <Priority priorityLevel ={item.Priority} >
              </Priority>
              <br/>
              <div className='subtask'>
              <button className='view-detail-btn'  
              aria-label="click add subtask"
              onClick={()=>{
                navigate(`/todo-detail/${item.id}`);  
              }}
              >
                <PageviewOutlinedIcon />
                view detail
              </button>
              </div>
              {/* <div className='sub-task-section'>

              {
             SubTaskWindowsToBeOpen&&(item.id === SubTaskWindowsToBeOpen)?(<AddSubtaskPanel/>):(<span></span>)
            }
            </div> */}
              <button className='btn btn-success' onClick={() => markComplete(item.id)}>Mark Done</button>
            </li>
          )) 
          
          :(<b>You have completed All items</b>) 
          }
        </ul>
        </div>
      </div>
  
      </div> 
    );


  }

        


   

export default TodoList;

