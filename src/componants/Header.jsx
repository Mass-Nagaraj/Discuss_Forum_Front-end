import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink,Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import {Searchbar} from './Searchbar';
import axios from 'axios';
import { IoHome, IoLogOutSharp } from 'react-icons/io5';
import { MdAccountCircle, MdForum } from 'react-icons/md';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


export const FirstHeader = ( {content,Languages,Level,Posts,...props }) => {
  
  const [users,setUsers]=useState('');
  // const [username,setUsername]=useState('');
  // const [email,setEmail]=useState('');
  const [search,setSearch]=useState('');
  props?.searchh(search);
  axios.defaults.withCredentials = true;
  
  const navigate = useNavigate();

   
// useEffect(()=>{

//   axios.get("http://localhost:2000/")
//   .then((res)=>{
//     if(res.data.status=="success") {
       
//         setUsername(res.data.name);
//         setEmail(res.data.email);
//         console.log("Retrive Token Datas ",res.data)
//     }

// }).catch((err)=> console.log(err));

// },[]);

let email,username;
    
const jwt_token=Cookies.get('token');
if(jwt_token) {
  const decode_payload=jwtDecode(jwt_token);
  email =decode_payload.email
  username= decode_payload.username;

}

  
  let result='';

  function handleDelete() {
    axios.get("http://localhost:2000/logout",{ params :{ email:email }})
    .then((res)=> {
        console.log(res.data);
        navigate('/')
    })
    .catch((err)=> console.log(err));
  }

  useEffect(()=>{
      axios.get("http://localhost:2000/users")
      .then((res)=>{
        setUsers(res.data);
      }).catch((err)=>{
        console.log(err);
      }) 
  },[])
  
 
 

  return (
    <>
    
    {/*<div className="header">*/}
        <div className="contentfix">
        <div className="head">
            <h2>DISCUSSION FORUM</h2>  
        </div>
        
        <nav className="navbar">
        <ul>
            <li><NavLink to='/Home'>
              <span className='navtext'>HOME</span>
              <span className='navicon'><IoHome/></span>
                </NavLink></li>
            <li><NavLink to={`/Account?name=${email}`} >
                  <span className='navtext'>MY PROFILE</span>
                  <span className='navicon'><MdAccountCircle/></span>
                </NavLink></li>

            <li><NavLink to='/Start_Discuss'>
              <span className='navtext'>START DISCUSSION</span>
              <span className='navicon'><MdForum/></span>
                </NavLink></li>

            <li className='logout-button'>
              <button type='button' onClick={handleDelete} > 
                  <span className='navtext' >LOG OUT</span>
                  <span className='navicon'><IoLogOutSharp/></span>
              </button> 
              </li>
          </ul>
        </nav> 
      </div>
      <hr/>
      <div className="headerbody">
        <div className='left-content'>
          <div className="welcomemsg">
            {content}
          </div>
          <div className='searchbar'>
          <Searchbar searchh= {(data)=> setSearch(data)} />
          </div>
        </div>
       
      <div className="headcolumn">
          <table>
            <tr>
              <th>Registered Users</th>
              <td>{users.length}</td>
            </tr>
            <tr>
              <th>Language</th>
              <td>{Languages}</td>
            </tr>
            <tr>
              <th>Level</th>
              <td>{Level}</td>
            </tr>
            <tr>
              <th>Posts</th>
              <td>{Posts}</td>
            </tr>
          </table>
          </div>
        </div>
      {/* </div> */}
      </>

  )
}


