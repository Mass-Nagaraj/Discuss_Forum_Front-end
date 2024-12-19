import React,{useEffect, useState} from 'react'
// import { Recentreply } from '../components/Recentreply';
import Img1 from '../assets/download (1).jpeg';
import { Profile } from './Profile';
import { TopicsStarted } from './TopicsStarted';
import { RepliesCreated } from './RepliesCreated';
import './Recentreply.css';

import { Footer } from '../componants/Footer';
import { NavLink, useLocation } from 'react-router-dom';
import { Header1 } from '../componants/Header1';
import axios from 'axios';
import { FirstHeader } from '../componants/Header';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import FindDate from '../componants/FindDate';
import Favourites from './Favourites';
import Img11 from '../assets/NotYetPost.jpg'

export const Recentreply = ( {email,nowemail,selectedComponent} ) => {

  let [questions,setQuestions]=useState([])
  let [allquestions,setAllQuestions]=useState([])
  const [replies,setReplies]=useState([]);
  const [fav,setFav]=useState(null);
  const [replyfav,setReplyfav]=useState(null);
  let lastFiveRecentFav=fav?.slice(-5).reverse();
  let recentfav=(lastFiveRecentFav);
  let lastFiveRecentReplyfav=replyfav?.slice(-5).reverse();
  let RecentReplyfav=(lastFiveRecentReplyfav);

  const [save,setSave]=useState(null);
  const [replysave,setReplySave]=useState(null);
  let lastFiveRecentsave=save?.slice(-5).reverse();
  let recentsave=(lastFiveRecentsave);

  let lastFiveRecentReplysave=replysave?.slice(-5).reverse();
  let RecentReplysave=(lastFiveRecentReplysave);
  

  let c_count=0;
  let py_count=0;
  let java_count=0;
  let ui_count=0;
  
  let c_reply_count=0;
  let py_reply_count=0;
  let java_reply_count=0;
  let ui_reply_count=0;
  let level,language;
  
  
  useEffect(()=>{
    // setFav(null)
    axios.post("http://localhost:2000/favourites", {email :email})
   .then((responce)=>{
        console.log("Questions Favourites ... ",responce.data);
        setFav(responce.data)
    }).catch((err)=> console.log(err));
  
  },[email])
  
  useEffect(()=>{
    // setReplySave(null)
    axios.post("http://localhost:2000/ReplyFavourites", {email :email} )
    .then((responce)=>{
        console.log("Reply Favourites ... ",responce.data);
        setReplyfav(responce.data)
    })
    .catch((err)=> console.log(err));
    
  },[email]);


  useEffect(()=>{
    // setQuestions(null)
    axios.post("http://localhost:2000/profile",{
      email:email
    })
    .then((res)=>{
      setQuestions(res.data);     
    }).catch((err)=>{
      console.log(err);
    })
  },[email]);


  useEffect(()=>{

    axios.get("http://localhost:2000/getRecentPosts")
    .then((res)=>{
      setAllQuestions(res.data); 
    
    }).catch((err)=>{
      console.log(err);
    })
},[email])

   
useEffect(()=>{
  // setReplies(null)
  axios.post("http://localhost:2000/getallreplies",{
    email:email
  })
  .then((res)=>{
    setReplies(res.data);     
  }).catch((err)=>{
    console.log(err);
  })
},[email]);


useEffect(()=>{
  // setSave(null)
  axios.post("http://localhost:2000/fetch_saved", {email :email})
 .then((res)=>{
      console.log("Questions Saved ... ",res.data);
      setSave(res.data)
  }).catch((err)=> console.log(err));

},[email])


useEffect(()=>{
  // setReplySave(null)
  axios.post("http://localhost:2000/fetch_Replysaved", {email :email})
 .then((res)=>{
      console.log("Replies Saved ... ",res.data);
      setReplySave(res.data);
  }).catch((err)=> console.log(err));

},[email])


{questions?.map((value,index)=>{
  <div key={index}></div>
 
  if(value.language==='C'){
        c_count++;                  
    }
  if(value.language==='Python'){
        py_count++;      
    }
  if(value.language==='Java'){
        java_count++;       
    }
  if(value.language==='UI/UX'){
        ui_count++;        
    }
  
})}

{replies?.map((value,index)=>{
  <div key={index}></div>
 
  if(typeof value.language === 'string') {
  
  if(value.language==='C'){
        c_reply_count++;                  
    }
  if(value.language==='Python'){
        py_reply_count++;      
    }
  if(value.language==='Java'){
        java_reply_count++;       
    }
  if(value.language==='UI/UX'){
        ui_reply_count++;        
    }
  }
  
  })}

  let date,time,[fetchDate,fetchMonth,fetchYear,]=['','',''],[Hours,Minutes,seconds] =['','',''], a="",arr2=[],arr4=[];
  
  let lastFiveRecentPosts=questions?.slice(-5).reverse();
  let recentPosts=(lastFiveRecentPosts);
  
  let lastFiveRecentReplies=replies?.slice(-5).reverse();
  let recentReplies=(lastFiveRecentReplies);


  if(nowemail=== email){
    a="Active Now"
  }else{
    a=FindDate({ arr2:arr2 ,arr4:arr4 });
  }
  let title;

  return (

    <>

      {selectedComponent=='1' || selectedComponent=='0' ?  <div className='recent-reply'>
        {(nowemail=== email)? <h2>MY RECENT POSTS</h2>:<h2>RECENT POSTS</h2>}
          <table className='rr'>
        
          {recentPosts?.map((value,index)=>{
        
        <div key={index}></div>
          const date=value.date;

        [fetchDate,fetchMonth,fetchYear]=date.split("/");

        arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]

        const time=value.time;
        [Hours,Minutes,seconds]=time.split(':');
        arr4=[Number(Hours),Number(Minutes)];

        a=FindDate({ arr2:arr2 ,arr4:arr4 });

            return(
            
                  <tr>
                    <td className='imagetd'><img src={Img1}></img></td>
                    <td className='columntwo'> 
                    
                    <NavLink to={`/${value.language}/${value.level}/discussion?discussionId=${value.id}`} state={{ selected:selectedComponent}}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                        <b>  {value.title} </b>  <br/>
                              {a}
                    </NavLink>
                  </td>
                  </tr>
              
            )
          })}
          {recentPosts?.length ==0 ? <tr className='nopostsyet'>
          <img src={Img11}/>
              No Interactions yet ! <br/> Feel free to make one
        </tr>: null}
        
          </table>
      </div> :null }
    
          
      {selectedComponent =='2' ? <div className='recent-reply'>
        {(nowemail=== email)? <h2>MY RECENT REPLIES</h2>:<h2>RECENT REPLIES</h2>}
        <table className='rr'>
          
            {recentReplies?.map((value,index)=>{

              { allquestions?.forEach(ques_details => {

                  if(ques_details.id==value.post_id) {
                      title=ques_details.title;
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

          <td>  <NavLink to={`/Account?name=${email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                      <img src={Img1}></img> 
                </NavLink></td>
          <td>           
                                  
                <NavLink to={`/${value?.language}/${value?.level}/discussion?discussionId=${value.post_id}`} state={{ selected:selectedComponent}}  style={{ textDecoration: 'none',  color: "#11297f" }}>
        
                <b> {title} </b> <br/>
                    {a}
                </NavLink>
          </td>

        </tr>
      )
            }else{
              console.log("Date is not available")
            }
            })}

            {recentReplies?.length ==0 ? <tr className='nopostsyet'>
              <img src={Img11}/>
                  No Interactions yet ! <br/> Feel free to make one
            </tr>: null}

          </table>
      </div> :null}

      {selectedComponent =='3' ?  <div className='recent-reply'>
              <h2>LIKES </h2>
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

                    // {console.log("selecting in likes :",selectedComponent)}
                    return(
                        // <tbody>
                        <tr>
                          <td>  <NavLink to={`/Account?name=${value.email}`} state={{Profile_click:"yes", selected: selectedComponent }}  style={{ textDecoration: 'none',  color: "#11297f" }}> 
                                    <img src={Img1}></img> 
                              </NavLink></td>
                
                            <td> 
                                <NavLink to={`/Account?name=${value.email}`} state={{Profile_click:"yes", selected: selectedComponent}} style={{ textDecoration: 'none',  color: "#11297f" }}><b>{value.username}</b> </NavLink> on<br/>
                                <NavLink to={`/${value.language}/${value.level}/discussion?discussionId=${value.id}`} state={{ selected:selectedComponent}}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                                    <b>  {value.title} </b><br/>
                                        {a}
                                </NavLink>
                            </td>
                            
                            </tr> 
                            
                        // </tbody>
                    )
                })}
                
                  
                {RecentReplyfav?.map((value,index)=>{
                    { allquestions?.forEach(ques_details => {
                    
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

                <td>  <NavLink to={`/Account?name=${value.form_email}`} state={{Profile_click:"yes", selected:  selectedComponent}} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                            <img  src={Img1}></img> 
                      </NavLink></td>
                <td> 
                      <NavLink to={`/Account?name=${value.from_email}`} state={{Profile_click:"yes", selected: selectedComponent}} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                            <b>{value.username}</b>
                      </NavLink> on<br/>
                      
                      <NavLink to={`/${language}/${level}/discussion?discussionId=${value.post_id}`}  state={{ selected:selectedComponent}} style={{ textDecoration: 'none',  color: "#11297f" }}>
              
                        <b>  {title}  </b><br/>
                          {a}
                      </NavLink>
                </td>

              </tr>
            )
                  }else{
                    console.log("Date is not available")
                  }
                  })}

              {recentfav?.length ==0 && RecentReplyfav?.length==0 ? <tr className='nopostsyet'>
                  <img src={Img11}/>
                      No Interactions yet ! <br/> Feel free to make one
                  </tr>: null}
              
              </table>
      </div>:null}

      {selectedComponent =='4' ?  <div className='recent-reply'>
                  <h2>SAVED </h2>
                  <table className='rr'>
                    
                      {recentsave?.map((value,index)=>{
                  
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
                              <td>  <NavLink to={`/Account?name=${value.email}`} state={{ Profile_click: "yes" }} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                                        <img src={Img1}></img> 
                                    </NavLink></td>
                                  <td> 
                                    <NavLink to={`/Account?name=${value.email}`} state={{ Profile_click: "yes" }} style={{ textDecoration: 'none',  color: "#11297f" }}><b>{value.username}</b> </NavLink> on<br/>
                                      <NavLink to={`/${value.language}/${value.level}/discussion?discussionId=${value.id}`}  state={{ selected:selectedComponent}}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                                          <b>  {value.title} </b><br/>
                                              {a}
                                      </NavLink>
                                  </td>
                                  
                                  </tr> 
                                  
                              </tbody>
                          )
                      })}

                      {RecentReplysave?.map((value,index)=>{
                          { allquestions.forEach(ques_details => {
                          
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
                      <td>  <NavLink to={`/Account?name=${value.from_email}`} state={{ Profile_click: "yes" }} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                                  <img src={Img1}></img> 
                            </NavLink></td>
                      <td>  <NavLink to={`/Account?name=${value.from_email}`} state={{ Profile_click: "yes" }} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                                  <b>{value.username}</b>
                            </NavLink> on<br/>
                            
                            <NavLink to={`/${language}/${level}/discussion?discussionId=${value.post_id}`}  state={{ selected:selectedComponent}} style={{ textDecoration: 'none',  color: "#11297f" }}>
                    
                          <b>  {title}  </b><br/>
                                {a}
                            </NavLink>
                      </td>

                    </tr>
                  )
                        }else{
                          console.log("Date is not available")
                        }
                        })}
                         
                      {recentsave?.length ==0 && RecentReplysave?.length==0 ? <tr className='nopostsyet'>
                      <img src={Img11}/>
                            No Interactions yet ! <br/> Feel free to make one
                      </tr>: null}

                  
                  </table>
      </div>:null}
      
    </>
    
  )
}