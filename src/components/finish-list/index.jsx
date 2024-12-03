import React, { useEffect, useState } from 'react'

export default function FinshList(props) {
    const [finishItems,setFinishItems] = useState([]);
    useEffect(()=>{
        const data  =  JSON.parse(localStorage.getItem("eventsList"));
        const finishList = data.filter(element => element.Complete === true);
        //console.log(finishList);
        setFinishItems(finishList);

    },[]
    )

    return (
    <div>
        <ul className='list-group'>
        {
            finishItems.map((item,index)=>{
                return(<li key={index} className='list-group-item'>
                    <span>{item.toDo}</span>
                    <span>{item.dueDate}</span>
                    {item.finishDate ? (
                     <span>{item.finishDate}</span> // 如果有 finishDate 显示 finishDate
                    ) : (
                     <span>No finish time</span> // 如果没有 finishDate，显示默认文本
                    )}

                    </li>)
            })
        }
        </ul>
    </div>
  )
}
