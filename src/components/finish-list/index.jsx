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
                return (<li key={index} className='list-group-item d-flex flex-wrap justify-content-between align-items-center'>
                  <b className=' col-sm-1  col-md-1' >event Name:</b> <p className='col-sm-1 col-md-2'>{event.toDo} </p> 
                <b className='col-sm-1  col-md-1'>   finish Date: </b > <p className='col-sm-1 col-md-2'>{event.finishDate}</p>
                
                <button className='revert-btn col-sm-1  col-md-1'  aria-label="revert evenet"  onClick={()=>revertComplete(event.id)}>
                <KeyboardReturnOutlinedIcon/>
                </button>
                <button className='delete-btn col-sm-1  col-md-1'  aria-label="delete evenet" onClick={() => deleteEvent(event.id)}>
                <DeleteForeverIcon />
                </button>
                </li>) 
            })
        }
        </ul>
    </div>
  )
}
