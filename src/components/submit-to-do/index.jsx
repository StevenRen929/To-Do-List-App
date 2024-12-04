import React from 'react'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ajvFormats from 'ajv-formats' 
import '../submit-to-do/index.css'
import formSchema from '../model/form-model.jsx'


const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv); //add ajv-format support
ajvErrors(ajv);  // Add ajv-errors support
const validate = ajv.compile(formSchema);
//console.log("validate variable by doing ajv.compile()", validate);
//console.log("initial validate error",validate.errors);


export default function  SubmitToDo({addToDoItem}) {
  const [formData, setFormData] = useState({
    toDo: '',
    dueDate: '',
    //createTime: new Date().toLocaleDateString('en-AU'),
    createTime: new Date().toISOString(), // Set current time
    Complete: false, // Default to false
    Priority:'High' //default priority
  });

  const [errors, setErrors] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
   console.log(`target name:${e.target.name}`,`target Value: ${e.target.value}`);
   
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const valid = validate(formData);
    console.log(formData);
    if (!valid) {
      // If validation fails, show error messages
      //console.log(validate.errors)
      const fieldErrors = {};
      validate.errors.forEach(error=>{
      const field = error.instancePath.substring(1);
       // Remove leading '/' from instancePath
      fieldErrors[field] = error.message;
      })
     setErrors(fieldErrors);
      return
    }else{
      setErrors([]);
    }


    // Store the valid event in localStorage
    const newEvent = {
      id: uuidv4(),
      ...formData
    };

   addToDoItem(newEvent);

    // 
    //clear form after submit
    setFormData({
      toDo: '',
      dueDate: '',
      //createTime: new Date().toLocaleDateString('en-Au'),
      createTime: new Date().toISOString(), // Reset to the current date/time
      Complete: false, // Default Complete
      Priority:'High' //default priority
    });
  };

  /*
  name="dueDate"：指定输入控件的名字，确保表单字段与 formData.dueDate 绑定。
value={formData.dueDate}：将输入框的值绑定到 formData.dueDate，使得输入框的显示值由 React 状态管理。
onChange={handleInputChange}：在用户修改输入框值时触发，调用 handleInputChange 更新 React 状态，确保 formData.dueDate 与输入框的值保持同步。
  
  */
  return (
    <div className='form-container'>
      <h3>Create New Event</h3>
      <div>
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to-do-item">Event will be completed</label>
          <textarea
            className="form-control
             form-text-area"
            id="to-do-item"
            name="toDo"
            rows="3"
            value={formData.toDo}
            onChange={handleInputChange}
          ></textarea>
          {errors.toDo && <span className="text-danger">{errors.toDo}</span>}
      
        </div>

        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="due-date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
           {errors.dueDate && <span className="text-danger">{errors.dueDate}</span>}
        </div>

        <div className="input-group mt-3 priority-input-container" >
        <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="Priority">Task Priority</label>
        </div>
        <select className="custom-select" 
        id="Priority"
        name="Priority"
        value ={formData.Priority}
        onChange={handleInputChange}
        >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        </select>
        </div>


        <button className="btn btn-primary ">Create Event</button>
      </form>
      </div>
    </div>
  );

}
