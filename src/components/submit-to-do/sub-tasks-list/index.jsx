import React from 'react'
import './index.css'
export default function CurrentSubtasks({subtaskList,deleteSubtask}) {
        

  return (
    <div className='form-subtask-windows'>
        {
            subtaskList.map((item,index)=>{
               return(<li key={index} className='list-group-item d-flex justify-content-between subtask-title-style'>
                    <strong>{item.subTitle}</strong>
                     <button className='delete-form-sub-task-btn' type='button' onClick={()=>{deleteSubtask(index)}}>delete</button>
                </li>)
            })
        }
    </div>
  )
}
