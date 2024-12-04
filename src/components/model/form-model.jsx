
const formSchema = {
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
      },
      Priority:{
        type : "string"
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

  export default formSchema;  