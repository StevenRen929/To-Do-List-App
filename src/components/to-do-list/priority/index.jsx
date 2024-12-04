import React from 'react'
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

import '../priority/index.css'

export default function Priority({priorityLevel}) {
    console.log(priorityLevel);
    return (
        <span><b>Priority:</b>
            {priorityLevel === "High" ? (
                <span className="high">
                    <PriorityHighOutlinedIcon  />
                    <span className='text'>High</span>
                </span>
            ) : priorityLevel === "Medium" ? (
                <span className="medium">
                    < PriorityHighOutlinedIcon />
                    <span className='text'>Medium</span>
                </span>
            ) : priorityLevel === "Low" ? (
                <span className="low">
                    <PriorityHighOutlinedIcon />
                    <span className='text'>Low</span>
                </span>
            ) : null}
        </span>
    )
}