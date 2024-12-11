import React from "react";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ajvFormats from "ajv-formats";
import "../submit-to-do/index.css";
import formSchema from "../model/form-model.jsx";
import AddSubtaskPanel from "./sub-tasks/add-subtask.jsx";
import CurrentSubtasks from "./sub-tasks-list/index.jsx";
import formatISOtoDate from "../format-method/formatISOtoDate.js";

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv); //add ajv-format support
ajvErrors(ajv); // Add ajv-errors support
const validate = ajv.compile(formSchema);
//console.log("validate variable by doing ajv.compile()", validate);
//console.log("initial validate error",validate.errors);

export default function SubmitToDo({ addToDoItem }) {
  const [formData, setFormData] = useState({
    toDo: "",
    dueDate: "",
   createTime: new Date().toLocaleString(),
    Complete: false, // Default to false
    Priority: "High", //default priority
    Subtasks: [],
  });

  const [errors, setErrors] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    // console.log(
    //   `target name:${e.target.name}`,
    //   `target Value: ${e.target.value}`
    // );

    const { name, value } = e.target;
    // if (name === "dueDate") {
    //   let date = new Date(value);
    //   let ISOdate = date.toISOString();
    //   setFormData({
    //     ...formData,
    //     [name]: ISOdate,
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  //state used to control subtask panel
  const [subpanelOpen, setSubpanelOpen] = useState(false);
  //const [subpanelClose,setSubpanelClose] = useState(true);

  const handelSubpanel = (e) => {
    !subpanelOpen ? setSubpanelOpen(true) : setSubpanelOpen(false);
  };
  const addSubTask = (newSubtask) => {
    setFormData((prevState) => ({
      ...prevState,
      Subtasks: [...prevState.Subtasks, newSubtask],
    }));
  };


//需要根据之前值的都要setform一个callback
  const deleteSubtask = (indexToDelete) => {
    //console.log(index)
    const updatedSubtasks = formData.Subtasks.filter((_, index) => index !== indexToDelete);
    setFormData((prevState)=>({
      ...prevState,
      Subtasks: updatedSubtasks,
    }))

  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const valid = validate(formData);
    console.log(formData);
    if (!valid) {
      // If validation fails, show error messages
      console.log(validate.errors);
      const fieldErrors = {};
      validate.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    } else {
      setErrors([]);
    }

    // Store the valid event in localStorage
    const newEvent = {
      id: uuidv4(),
      ...formData,
    };

    addToDoItem(newEvent);

    //
    //clear form after submit
    setFormData({
      toDo: "",
      dueDate: "",
      //createTime: new Date().toLocaleDateString('en-Au'),
      createTime: new Date().toLocaleString(), // Reset to the current date/time
      Complete: false, // Default Complete
      Priority: "High", //default priority
      Subtasks: [],
    });
  };

  /*
  name="dueDate"：指定输入控件的名字，确保表单字段与 formData.dueDate 绑定。
value={formData.dueDate}：将输入框的值绑定到 formData.dueDate，使得输入框的显示值由 React 状态管理。
onChange={handleInputChange}：在用户修改输入框值时触发，调用 handleInputChange 更新 React 状态，确保 formData.dueDate 与输入框的值保持同步。
  
  */
  return (
    <div className="form-container">
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
              type="datetime-local"
              className="form-control"
              id="due-date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
            {errors.dueDate && (
              <span className="text-danger">{errors.dueDate}</span>
            )}
          </div>

          <div className="input-group mt-3 priority-input-container">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="Priority">
                Task Priority
              </label>
            </div>
            <select
              className="custom-select"
              id="Priority"
              name="Priority"
              value={formData.Priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="subtask-panel">
            <div className="subtask-list">
              <span>Subtask Amount: {formData.Subtasks.length}</span>
              <CurrentSubtasks
                subtaskList={formData.Subtasks}
                deleteSubtask={deleteSubtask}
              />
            </div>

            <button type="button" onClick={handelSubpanel}>
              +add sub-task
            </button>

            {/* false&&anything=>false , true && anything =>anything */}
            {subpanelOpen && (
              <div className="panel-overlay">
                <div className="panel-content">
                  <AddSubtaskPanel
                    addSubTask={addSubTask}
                    setSubpanelOpen={setSubpanelOpen}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                  <button type="button"  className = "btn btn-secondary mb-2"onClick={handelSubpanel}>
                    Close
                  </button> 
                </div>
              </div>
            )}
          </div>

          <button className="btn btn-primary ">Create Event</button>
        </form>
      </div>
    </div>
  );
}
