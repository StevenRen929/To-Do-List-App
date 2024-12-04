import React, { useEffect, useState } from 'react'
import './index.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function FinshList({finishedItems,revertComplete,deleteEvent}) {

    finishedItems = finishedItems || [];

    return (
    <div className='finsh-list-container'>
        <ul className='list-group'>
        {
            finishedItems.map((event,index)=>{
                return (<li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                  <b className='col-md-3' >event Name:</b> {event.toDo} 
                <b>   finish Date: </b > {event.finishDate}
                
                <button className='revert-btn'  aria-label="revert evenet"  onClick={()=>revertComplete(event.id)}>
                <KeyboardReturnOutlinedIcon/>
                </button>
                <button className='delete-btn'  aria-label="delete evenet" onClick={() => deleteEvent(event.id)}>
                <DeleteForeverIcon />
                </button>
                </li>) 
            })
        }
        </ul>
    </div>
  )
}
