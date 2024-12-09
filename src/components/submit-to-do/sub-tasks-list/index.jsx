import React from 'react'

export default function CurrentSubtasks({subtaskList,deleteSubtask}) {
     console.log(subtaskList);
  return (
    <div>
        {
            subtaskList.map((item,index)=>{
               return(<li key={index} className='list-group-item d-flex justify-content-between'>
                    <p>{item.subTitle}</p>
                     <button className='delete-form-sub-task-btn' type='button' onClick={()=>{deleteSubtask(index)}}>x</button>
                </li>)
            })
        }
    </div>
  )
}
