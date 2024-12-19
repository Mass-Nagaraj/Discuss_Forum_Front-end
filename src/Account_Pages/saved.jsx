import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, NavLink } from 'react-router-dom'
import Img1 from '../assets/download (1).jpeg';
import FindDate from '../componants/FindDate';

const Savedd = ({email,nowemail,active}) => {

  
  const [save,setSave]=useState([]);
  const [replysave,setReplySave]=useState([]);

  

useEffect(()=>{
    // setSave(null)
    axios.post("http://localhost:2000/fetch_saved", {email :email})
   .then((res)=>{
        // console.log("Questions Saved ... ",res.data);
        setSave(res.data)
    }).catch((err)=> console.log(err));
  
},[])

  useEffect(()=>{
    // setReplySave(null) 
  axios.post("http://localhost:2000/fetch_Replysaved", {email :email})
   .then((res)=>{
        // console.log("Replies Saved ... ",res.data);
        setReplySave(res.data);
    }).catch((err)=> console.log(err));
  
},[])

 
  return (
    <>
    <div className='accdetails'>               
            <div>   <h1>SAVED</h1> 
                <p><b>Total Saved</b>: {save?.length + replysave?.length }</p>
                <p><b>Saved on Questions</b>: {save?.length} </p>
                <p><b>Saved on Replies</b>: {replysave?.length} </p>
            </div>
    </div>
    
        
        {/* <div className='recent-reply'>
                <h2>Likes</h2>
                <table className='rr'>
                  
                    {recentfav?.map((value,index)=>{
                
                        <div key={index}></div>
                        const date=value.date;

                        [fetchDate,fetchMonth,fetchYear]=date.split("/");

                        arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]

                        const time=value.time;
                        [Hours,Minutes,seconds]=time.split(':');
                        arr4=[Number(Hours),Number(Minutes)];

                        a=FindDate({ arr2:arr2 ,arr4:arr4 });
                        let name=value.email;

                        return(
                            <tbody>
                            <tr>
                                <td><img src={Img1}></img></td>
                                
                                <td> 
                                   <NavLink to={`/Account?name=${name}`} style={{ textDecoration: 'none',  color: "#11297f" }}><b>{value.username}</b> </NavLink> on<br/>
                                    <NavLink to={`/${value.language}/${value.level}/discussion?discussionId=${value.id}`}  state={{ username :value.username, data :value.email }}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                                        <b>  {value.title} </b><br/>
                                            {a}
                                    </NavLink>
                                </td>
                                
                                </tr> 
                                
                            </tbody>
                        )
                    })}
                    
                    
            {RecentReplyfav?.map((value,index)=>{
                { questions?.forEach(ques_details => {
                 
                    if(ques_details.id==value.post_id) {
                        title=ques_details.title;
                        language=ques_details.language;
                        level= ques_details.level;
                    }
                 
                  }) 
                }  
              const date=value.date;

              if(date) {
                const [fetchDate,fetchMonth,fetchYear]=date.split("/");

                let arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]
                let a;

                const time=value.time;
                const [Hours,Minutes,seconds]=time.split(':');
                let arr4=[Number(Hours),Number(Minutes)];
                
                a=FindDate({ arr2:arr2 ,arr4:arr4 });
       return(
              
          <tr>

            <td>  <NavLink to='/Account' style={{ textDecoration: 'none',  color: "#11297f" }}> 
                        <img src={Img1}></img> 
                  </NavLink></td>
            <td>  <NavLink to='/Account' style={{ textDecoration: 'none',  color: "#11297f" }}> 
                         <b>{value.username}</b>
                  </NavLink> on<br/>
                  
                  <NavLink to={`/${language}/${level}/discussion?discussionId=${value.post_id}`}  style={{ textDecoration: 'none',  color: "#11297f" }}>
          
                      {title}<br/>
                      {a}
                   </NavLink>
            </td>

          </tr>
        )
              }else{
                console.log("Date is not available")
              }
              })}

                
                </table>
        </div>
 */}


    </>
  )
}

export default Savedd
