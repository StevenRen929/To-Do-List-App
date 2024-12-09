import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import formatDateToIso from '../../format-method/formatDateToIso';

export default function ItemDetail(props) {
    const{id} = useParams();
    const[postDetail,setPostDetail] = useState(null);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('eventsList'));
        const item = data.find((item)=>item.id === id);//get particular item from event list
        console.log(item);
        setPostDetail(item);
    },[id]);

    
    if (!postDetail) {
        return <div>404 Not found</div>; 
    }


  return (
    <div>
        <h1 className='post-title'>
            {postDetail.toDo}  
        </h1>
        <h2>Date Created: {postDetail.createTime}</h2>
        <h2>Due Date: {formatDateToIso(postDetail.dueDate)}</h2>


    </div>
  )
}
