
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';
import { NavLink } from 'react-router-dom';

export const RepliesCreated = ({ c_reply_count,py_reply_count,java_reply_count,ui_reply_count ,email}) => {
 
  const [replies,setReplies]=useState(null);
  let recentReplies, lastFiveRecentReplies;
  const [questions,setQuestion]=useState(null);
  

useEffect(()=>{

    axios.get("http://localhost:2000/getRecentPosts")
    .then((res)=>{
      setQuestion(res.data); 
    
    }).catch((err)=>{
      console.log(err);
    })
},[])


useEffect(()=>{

  axios.post("http://localhost:2000/getallreplies",{
    email:email
  })
  .then((res)=>{
    setReplies(res.data);     
  }).catch((err)=>{
    console.log(err);
  })
},[]);

lastFiveRecentReplies=replies?.slice(-5).reverse();
recentReplies=(lastFiveRecentReplies);

let title;
  return (
    <>
      <div className='accdetails'>
          <h1>REPLIES CREATED</h1>
              <p><b>C Programming</b>: {c_reply_count}</p>
              <p><b>Python Programming</b>: {py_reply_count}</p>
              <p><b>Java Programming</b>: {java_reply_count}</p>
              <p><b>UI/UX</b>: {ui_reply_count}</p>
      </div>
    
    </>
  )
}


