import React, { useEffect, useState } from 'react';

import { Footer } from '../componants/Footer';
import { DataTable } from '../componants/dataTable';
import Img1 from '../assets/download (1).jpeg'
import Img2 from '../assets/download.jpeg';
import Img5 from '../assets/image(1).png';
import Img4 from '../assets/OIP (6).jpeg';
import { Link, NavLink, useLocation, useResolvedPath } from 'react-router-dom';
import axios from 'axios';
import { FirstHeader, Header } from '../componants/Header';
import { Header1 } from '../componants/Header1';
import { Searchbar } from '../componants/Searchbar';
import FindDate from '../componants/FindDate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../Account_Pages/Recentreply.css';


const Level = () => {

  let Datas_=[]
  const [questions,setQuestions] =useState([]);
  const location=useLocation();
  const [lastpost,setLastPost] =useState([]);
  let recentPosts,lastFiveRecentPosts;
  const [users,setUsers]=useState('');
  const [posts,setPosts]=useState('');
  const [search,setSearch]=useState('');
  const [levels,setLevels]=useState([])

  const [reply_count,setReply_count]=useState([]);
  const [auth, setAuth] = useState('');
  let email,username;
    
  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    email =decode_payload.email
    username= decode_payload.username;
    
  }
  
  Cookies.remove('Ac_select');
  // console.log("puss..",email,username)
    
  let path= window.location.pathname;
  const language=path?.split("/")[1];

let level_count=0;
let level_username,level_email,level_lastpostDate,level_lastpostTime,level_Lastpost=[];
let level_reply_count=0;
  
  let showdate=new Date()

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
  const [currentHours,currentMinutes,currentsec]=displayTime.split(':');
  

  let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
  let arr3=[Number(currentHours),Number(currentMinutes)];
  let arr2,arr4,a,b,c,d;
  let level1_reply_count=0,level2_reply_count=0,level3_reply_count=0  ,level4_reply_count=0
  

useEffect(()=>{
  axios.post(`http://localhost:2000/${language}`,{
    language:language
  })
  .then((res)=>{
      setQuestions(res.data);
     
  }).catch((err)=>{
      console.log(err);
  })

},[]);


useEffect(()=>{
  axios.post("http://localhost:2000/getRecentReplies",{
    language:language
    
  }).then((res)=>{
    setLastPost(res.data);
     
  }).catch((err)=>{
    console.log(err);
    
  })
},[])
  
useEffect(()=>{
  axios.get("http://localhost:2000/users")
  .then((res)=>{
     setUsers(res.data);
  }).catch((err)=>{
    console.log(err);
  }) 
},[])

  useEffect(()=>{

    axios.get(`http://localhost:2000/posts/${language}`)
    .then((res)=>{
      setPosts(res.data);
    }).catch((err)=>{
      console.log(err);
    }) 
  },[])
    

  useEffect(()=>{

    axios.post('http://localhost:2000/getlang_reply',{
      language:language,
    })
    .then((res)=>{
      
      setReply_count(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[language])

  useEffect(()=>{

    axios.get(`http://localhost:2000/getLevels/${language}`,{
      language:language,
    })
    .then((res)=>{
      // console.log("Result :",res.data)
      setLevels(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[language])


lastFiveRecentPosts=lastpost.slice(-5).reverse();
recentPosts=lastFiveRecentPosts;
   

levels.map((level,index)=>{
  level_count=0
  lastpost.forEach((val,i)=>{
    console.log(val.level,level.url)
    if(val.level=== level.url){
          level_count++;
          level_username=val.username
          level_email=val.email;
          
          const [fetchDate, fetchMonth, fetchYear] = val.date.split("/");
          const [Hours, Minutes] = val.time.split(':');
          
          level_lastpostDate=([Number(fetchDate), Number(fetchMonth), Number(fetchYear)]);
          level_lastpostTime=([Number(Hours), Number(Minutes)]);
          
          level_Lastpost=([val.username, val?.email, level_lastpostDate, level_lastpostTime,val.id,val.level]);
          arr2=level_lastpostDate
          arr4=level_lastpostTime
          a=FindDate({ arr2:arr2 ,arr4:arr4 });
      }
  })
      
  reply_count.forEach((reply,indexx)=>{
    if(reply.level==`${level.url}`){
      level_reply_count++;
    }
  })
  

   Datas_.push({"language":language, "level":`${level.name}`,"posts":level_count, "replies":level_reply_count, "lastpost_name":level_username , "lastpost_email":level_Lastpost[1], "lastpost_date":a,"lastpost_id":level_Lastpost[4] ,"url":`/${language}/${level.url}`})
})


  console.log("Final :",Datas_);

  return (
    <div className='bodyy'>

       <FirstHeader searchh= {(data)=> setSearch(data)} content={`${language} Programming`} Languages={language} Levels={4} Posts= {posts.length} />

    <div className='content-body'>

    <div className='maintable'>
    <table className='bodytable'>
        <thead>
            <tr>
              <th className='pskillshead'>Levels</th>
              <th className='levpostshead'>Posts</th>
              <th className='levpostshead'>Replies</th>
              <th className='pskillslastpost'>Last Post</th>
            </tr>
        </thead> 
            <tbody>
            
            {console.log(Datas_)}
            {Datas_.filter((item,i)=>{
              console.log("item :",item)
              return !search || search.trim() === '' ?
              true :
              item?.level?.toLowerCase().includes(search.toLowerCase());


              }).map((item,i)=>{
              return(
                <tr>
                        <td className='pskills'>
                            <Link to={item?.url} > 
                                  {item?.level}
                            </Link>
                        </td>
                
                    <td className='levposts'>{item?.posts}</td>
                    <td className='levposts'>{item?.replies}</td>
                    <td className='lastpost'>
                    
                        { item.lastpost_date !="NaNYears ago"? <ul className='lapost-list'>

                            <li className='lapost-date'> 
                                <NavLink to={`${item?.url}/discussion?discussionId=${item?.lastpost_id}`} style={{textDecoration:"none", color:" #00357d"}}>
                                    { item?.lastpost_date } 
                                </NavLink>
                            </li>
                      
                        <li className='lapost-author'>
                            <NavLink to={`/Account?name=${item?.lastpost_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}>
                              <img src={Img1} alt='abc'/> <span className='non-image'> {item?.lastpost_name} </span>
                            </NavLink> 
                        </li>
                        
                        </ul>: <ul> <li className='notposted'>{"No posts"}</li> <li className='notposted'>{"available !"}</li></ul> }     

                  </td>

                </tr>
              )
            })}
            
        </tbody>
        
      </table>
    </div>
      

      <div className='recent-reply'>
        <h2>RECENT POSTS</h2>
        <table className='rr'>
        
        {recentPosts.map((value,index)=>{
            <div key={index}></div>
                const date=value.date;
                const [fetchDate,fetchMonth,fetchYear]=date.split("/");

                let arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]
                let a;

                const time=value.time;
                const [Hours,Minutes,seconds]=time.split(':');
                let arr4=[Number(Hours),Number(Minutes)];
                a=FindDate({ arr2:arr2 ,arr4:arr4 });

                return(

                  
                <tr>
                      <td> <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                              <img src={Img1}></img> 
                          </NavLink></td>
                          
                      <td> <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                            <b>{value.username}</b>
                          </NavLink> on<br/>
                      
                          <NavLink to={`/${language}/${value.level}/discussion?discussionId=${value.id}`}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                    
                              {value.title}<br/>
                              {a}
                          </NavLink>
                      </td>
                    
                </tr>

                )
          })}
          
        </table>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default Level;
