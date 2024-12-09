import { Description } from "@mui/icons-material";

const formSchema = {
  type: "object",
  properties: {
    toDo: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    createTime: {
      type: "string",
   // format: "date-time"
    },
    dueDate: {
      type: "string",
     // format: "date-time",
      //format: "iso-time"
    },
    Complete: {
      type: "boolean",
    },
    Priority: {
      type: "string",
    },
    Subtasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
            subTitle:{
                type: "string"
            },
            Description:{
                type: "string"
            }
           
        },
        required: ["subTitle"],
        errorMessage: {
            required: {
                subTitle: "title for this subtask is required",
    
            },
          },
      },
    },
  },
  required: ["toDo", "dueDate"],
  errorMessage: {
    required: {
      todo: "to-do item is required",
      dueDate: "Due Date is required",
    },
  },
};

export default formSchema;
