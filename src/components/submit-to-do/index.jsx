import React from 'react'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ajvFormats from 'ajv-formats' 
import '../submit-to-do/index.css'

const schema = {
  type: "object",
  properties: {
    toDo: {
      type: "string",
      minLength: 1,
      maxLength: 50
    },
    createTime: { 
      type: "string",
      format: "date-time"  
    },
    dueDate: {
      type: "string",
      format: "date" 
    },
    Complete: {
      type: "boolean"
    }
  },
  required: ["toDo","dueDate"],
  errorMessage: {
    required: {
      todo: "to-do item is required",
      dueDate: "Due Date is required",
    },
  },
}


const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv); //add ajv-format support
ajvErrors(ajv);  // Add ajv-errors support
const validate = ajv.compile(schema);
//console.log("validate variable by doing ajv.compile()", validate);
//console.log("initial validate error",validate.errors);


export default function  SubmitToDo({addToDoItem}) {
  const [formData, setFormData] = useState({
    toDo: '',
    dueDate: '',
    //createTime: new Date().toLocaleDateString('en-AU'),
    createTime: new Date().toISOString(), // Set current time
    Complete: false, // Default to false
  });

  const [errors, setErrors] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
   // console.log(e.target.name);
   // console.log(e.target.value);
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
    });
  };

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

        <button className="btn btn-primary ">Create Event</button>
      </form>
      </div>
    </div>
  );

}
