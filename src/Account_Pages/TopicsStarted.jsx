import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';

export const TopicsStarted = ({c_count,py_count,java_count,ui_count}) => {


  return (
    <>
      <div className='accdetails'>
          <h1>TOPICS STARTED</h1>
          <p><b>C Programming</b>: {c_count}</p>
          <p><b>Python Programming</b>: {py_count}</p>
          <p><b>Java Programming</b>: {java_count}</p>
          <p><b>UI/UX</b>: {ui_count}</p>
      </div> 
    </>
  )
}

