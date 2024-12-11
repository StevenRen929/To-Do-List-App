import React, { useEffect, useState } from "react";

export default function Warning(props) {
  const { timeRemain,Complete} = props;
  const [wellDone,setWellDone] = useState(null);

  // console.log(timeRemain)

  useEffect(() => {
    if(Complete){
        setWellDone(true);
    }
    else{
        setWellDone(false);
    }
  }, [timeRemain,Complete]);
  console.log(wellDone);

return(
    <div>
    {wellDone?(
    <div>
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well done!</h4>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things
          nice and tidy.
        </p>
      </div>
    </div>
  ):(
    <div>
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Warning!</h4>
        <p>
          Warning,your task is due soon, please complete ASAP.
        </p>
        <hr />
        <p className="mb-0">
        Please read through the detail of task and complete the task soon.
        </p>
      </div>
    </div>
  )}
  </div>
)
 
  
}
