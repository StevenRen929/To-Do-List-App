import React, { useEffect, useState } from 'react'
import './index.css'

export default function FinshList({finishedItems,revertComplete}) {

    finishedItems = finishedItems || [];

    return (
    <div className='finsh-list-container'>
        <ul className='list-group'>
        {
            finishedItems.map((event,index)=>{
                return (<li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                  <b className='col-md-3' >event Name:</b> {event.toDo} 
                <b>   finish Date: </b > {event.finishDate}
                <button className='revert-btn' onClick={()=>revertComplete(event.id)}>Revert Event</button>
                </li>) 
            })
        }
        </ul>
    </div>
  )
}
