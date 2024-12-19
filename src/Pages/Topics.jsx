import React, { useEffect, useState } from 'react';
// import { Header } from './components/Header';
import { Footer } from '../componants/Footer';
import { DataTable } from '../componants/dataTable';
import Img1 from '../assets/download (1).jpeg'
import Img2 from '../assets/download.jpeg';
import Img5 from '../assets/image(1).png';
import Img4 from '../assets/OIP (6).jpeg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FirstHeader, Header } from '../componants/Header';
import { Header1 } from '../componants/Header1';
import { Searchbar } from '../componants/Searchbar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import FindDate from '../componants/FindDate';
import '../Account_Pages/Recentreply.css';
import Img11 from '../assets/NotYetPost.jpg'

const Language = () => {

  const [questions,setQuestions] =useState([]);
  const location=useLocation();
  const [replies,setReplies] =useState([]);
  let recentReplies, lastFiveRecentReplies;
  const [users,setUsers]=useState('');
  const [posts,setPosts]=useState('');
  const [search,setSearch]=useState('');
  const [viewsArray, setViewsArray] = useState([]);
  const [replies_details,setReplies_details]=useState([]);
  let count=0,last_date="",last_time="",[fetchDate,fetchMonth,fetchYear]=['','',''], [Hours,Minutes,seconds]=['','',''],arr2=[],arr4=[],a;
  let title="",ques_email=""
   
  let path= window.location.pathname;
  const language = path?.split("/")[1];
  const level = path?.split("/")[2];

  
  let email,username;
  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    email =decode_payload.email
    username= decode_payload.username;

  }
  
  Cookies.remove('Ac_select');
  
 useEffect(()=>{

   axios.post(`http://localhost:2000/${language}/levels`,{
     language:language,
     level:level
    })
    .then((res)=>{
      setQuestions(res.data);
      console.log(res.data)
      
    }).catch((err)=>{
      console.log(err);
    })
  },[]);


  useEffect(()=>{

    axios.get("http://localhost:2000/users")
    .then((res)=>{
      setUsers(res.data);
    }).catch((err)=>{
      console.log(err);
    }) 
  },[]);


useEffect(()=>{

  axios.post('http://localhost:2000/getlevel',{
    language:language,
    level:level
  })
  .then((res)=>{
    
    setReplies_details(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[language,level])


lastFiveRecentReplies=replies_details.slice(-5).reverse();
recentReplies=(lastFiveRecentReplies);
 

  return (
    <div className='bodyy'>

      <FirstHeader searchh= {(data)=> setSearch(data)} content={`${language} Programming`} Languages={language} Levels={level} Posts={questions.length} />
  
    <div className='content-body'>

  <div className='maintable'>
      <table className='bodytable'>
        <thead>
          <tr>
          <th className='pskillshead' >Topics</th>
          <th className='levpostshead'>Views</th>
          <th className='levpostshead'>Replies</th>
          <th className='pskillslastpost' >Last Reply</th>
          </tr>
        </thead>
    
      {questions?.filter((value,i)=>{
        return search?.value ===''?
        value: value.title.toLowerCase().includes(search.toLowerCase());
        }).map((value,index)=>{
            let lastReply_username,lastReply_id,lastReply_email;
            count=0;
            a=""
            { replies_details?.forEach(reply_details => {
            
              
              // if ((reply_details.to_email === value.email) && (reply_details.post_id === `${value.id}`)) {
              
              if ((reply_details.post_id === `${value.id}`)) {
                    count += 1;
                    last_date=reply_details.date;
                    [fetchDate,fetchMonth,fetchYear]=last_date.split("/");

                    arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]
                
                    last_time=reply_details.time;
                    [Hours,Minutes,seconds]=last_time.split(':');
                    arr4=[Number(Hours),Number(Minutes)];
                    lastReply_username=reply_details?.username;
                    lastReply_id=reply_details?.id;
                    lastReply_email=reply_details?.from_email;
                    a=FindDate({ arr2:arr2 ,arr4:arr4 });
              }
                      
            }) 
            }  

        return(  <tbody>
          
          <tr key={index}>

                <td className='pskills' >
                    <Link to={`/${language}/${level}/discussion?discussionId=${value.id}`}  > 
                        
                          {value.title}
                      
                    </Link>
                </td>
              
                <td className='levposts'>{value.views}</td>
                <td className='levposts'>{count}</td>
                <td className='lastpost'>
                  <ul className='lapost-list'>

                    {a? <div>
                            <li className='lapost-date' >
                                <NavLink to={`/${language}/${level}/discussion?discussionId=${value.id}`} state={{lastReply_id: lastReply_id}} style={{ textDecoration: 'none',  color: "#11297f" }}>
                                      {a}
                                </NavLink>
                            </li> 

                        <li className='lapost-author'>
                            <NavLink to={`/Account?name=${lastReply_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}>
                              <img src={Img1} alt='abc'/> <span className='non-image'>  {lastReply_username} </span>
                            </NavLink>
                        </li>
                        </div> 
                    : <ul> <li className='notposted'>{"No replies"}</li> <li className='notposted'>{"available !"}</li></ul> }  
                    
                    
                  </ul>
                </td>
            </tr>
          
          </tbody>
        )

      })}

      {questions?.length ==0 ? <tr>
        <td colSpan="4" className='notyetinteracted'>
          <img src={Img11 }/><br/>
              No Interactions yet ! <br/> Feel free to make one
        </td>
        </tr>: null}
          
        
      </table>
  </div>
    
    
      <div className='recent-reply'>
        <h2>RECENT REPLIES</h2>
        <table className='rr'>
        
             {recentReplies?.map((value,index)=>{
                { questions.forEach(ques_details => {

                  ques_email=ques_details.email
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

            <td>  <NavLink to={`/Account?name=${value.from_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                        <img src={Img1}></img> 
                  </NavLink></td>
            <td>  <NavLink to={`/Account?name=${value.from_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
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

            {recentReplies?.length ==0 ? <tr className='nopostsyet'>
                  <img src={Img11}/>
                      No Interactions yet ! <br/> Feel free to make one
                </tr>: null}
              

        </table>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default Language
