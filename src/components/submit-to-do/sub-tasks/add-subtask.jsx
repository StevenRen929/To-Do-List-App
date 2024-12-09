import React, { useState } from 'react'

import './index.css'
export default function AddSubtaskPanel({addSubTask,setSubpanelOpen,errors}) {
      console.log(errors);
  
    //console.log(setSubpanelOpen);
    const[subFormData,setSubFormData] = useState(
      {
        subTitle:'',
        description:'' 
      }
    );
    
    const handleSubTaskInputChange  = (e) => {
      const {name,value} = e.target;
      //destruct the name and value from subform
      //console.log(`title:${name}, description:${value}`)
      setSubFormData(
        {
        ...subFormData,
        [name]:value
        }
      )

    }
   

    const submitSubtask = (e)=>{
      e.preventDefault();
      const newSubtask = { ...subFormData };
    
      // 通过 addSubTask 回调传递给父组件
      addSubTask(newSubtask);
      setSubFormData(
        {
          subTitle:'',
          description:'' 
        } 
      )
      setTimeout(()=>{
        alert('subtasks was added')
        setSubpanelOpen(false)},1000);
    
    }


  return (

    <div>
      <label htmlFor="sub-task-item ">Sub-task-title</label>
      <input type="text" 
      id= "sub-task-item"
      onChange={handleSubTaskInputChange}
      name = 'subTitle'
      value={subFormData.subTitle} />
      <br />

      <br/>
      <label htmlFor="description">Description:</label>
    <textarea name="description"
     id="description"
     onChange={handleSubTaskInputChange}
     value={subFormData.description}>
     </textarea>
     {/* type = button prevent from submit main form */}
     <button type="button" onClick={submitSubtask}>Add subtask</button>
    </div>

  )
}
