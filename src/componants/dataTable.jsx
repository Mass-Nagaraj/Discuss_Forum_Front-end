import React,{useEffect, useState} from 'react'
import './dataTable.css';
import Img1 from '../assets/download (1).jpeg';
import Img2 from '../assets/image(1).png';
import Img3 from '../assets/OIP.jpeg';
import Img4 from '../assets/OIP (6).jpeg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import FindDate from './FindDate';
import Cookies from 'js-cookie';
import '../Account_Pages/Recentreply.css';
import { jwtDecode } from 'jwt-decode';

export const DataTable = ({searchh}) => {
  
  // const [username,setUsername]=useState('');
  // const [email,setEmail]=useState('');
  const [languges,setLanguges]=useState([]);
  const search=searchh;

let email,username;
    
const jwt_token=Cookies.get('token');
if(jwt_token) {
  const decode_payload=jwtDecode(jwt_token);
  email =decode_payload.email
  username= decode_payload.username;

}

  const [posts,setPosts]=useState([]);
  let clastpost=[''],pylastpost=[''],javalastpost=[''],uilastpost=[''];
  let lang_lastposts=[];

  let clastpostDate=[''],clastpostTime=[''],pylastpostDate=[''],pylastpostTime=[''],javalastpostDate=[''],javalastpostTime=[''],uilastpostDate=[''],uilastpostTime=['']
  let c_count=0;
  let py_count=0;
  let java_count=0;
  let ui_count=0;
  let lang_count=0;
  let lang_lastpostDate,lang_lastpostTime;
  let showdate=new Date()

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
  const [currentHours,currentMinutes,currentsec]=displayTime.split(':');

  let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
  let arr3=[Number(currentHours),Number(currentMinutes)];
  let arr2=[];
  let arr4=[];
  let date,time,a,b,c,d;
  let [fetchDate,fetchMonth,fetchYear]=['','',''];
  let [Hours,Minutes,seconds]=['','','']


  useEffect(()=>{

    axios.get('http://localhost:2000/posts')
    .then((res) => {
      setPosts(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
 

  useEffect(()=>{

      axios.get('http://localhost:2000/getLanguages')
      .then((res) => {
        setLanguges(res.data);
        // console.log("Languages :",res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },[])


// console.log("posts :",posts)
  // {posts.map((value,index)=>{
  //   lang_count=0
  //   {languges.map((val,i)=>{


  //     if(value.language===val?.url){
  //       lang_count++;
        
  //       [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
  //       [Hours, Minutes] = value.time.split(':');
        
  //       lang_lastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
  //       lang_lastpostTime=[Number(Hours), Number(Minutes)];
        
  //       lang_lastposts.push([value.username, value.email,lang_lastpostDate, lang_lastpostTime ,value.id,value.language,value.level,lang_count]);
  //     }
  //   })}
      
  // })}

  
arr2=clastpostDate;
arr4=clastpostTime;

a=FindDate({ arr2:arr2 ,arr4:arr4 });

// arr2=pylastpostDate;
// arr4=pylastpostTime;


// b=FindDate({ arr2:arr2 ,arr4:arr4 });

// arr2=javalastpostDate;
// arr4=javalastpostTime;

// c=FindDate({ arr2:arr2 ,arr4:arr4 });

// arr2=uilastpostDate
// arr4=uilastpostTime;

// d=FindDate({ arr2:arr2 ,arr4:arr4 });

async function find_level_count(lang_id) {
  try {
    const res = await axios.get(`http://localhost:2000/getLevelCount/${lang_id}`);
   
    const level_count = res.data.length;
    
    return level_count;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

// console.log("Final :",find_level_count(1))

let Datas_=[];

{languges?.map( (value,index)=>{
  
  lang_count=0
  {posts?.forEach((val,i)=>{

      if(val?.language===value?.url) {
        lang_count++;
        if(val?.date==String) {

          [fetchDate, fetchMonth, fetchYear] = val?.date?.split("/");
        }
        [Hours, Minutes] = val.time.split(':');
        
        lang_lastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
        lang_lastpostTime=[Number(Hours), Number(Minutes)];
        lang_lastposts=([val.username, val.email,lang_lastpostDate, lang_lastpostTime ,val.id,val.language,val.level]);
        arr2=lang_lastpostDate
        arr4=lang_lastpostTime
        a=FindDate({ arr2:arr2 ,arr4:arr4 });
      }
  })}
let level2=0
  const fetch=async ()=>{
     let level =await find_level_count(value.id) // Pending... (Doubt)
     console.log("level",level)
  level2=level

  }
    
  fetch()
  console.log("level2",level2)

  Datas_.push( {"skill":`${value.name}`, "level":level2, "posts":lang_count, "lastpost_time":a,"lastpost_name":lang_lastposts[0],"lastpost_email":lang_lastposts[1] ,"lastpost_id":lang_lastposts[4] ,"lastpost_lang":lang_lastposts[5] ,"lastpost_level":lang_lastposts[6] ,"url":`${value.url}`} )
    

})}

  console.log("Final Data_ :",Datas_);

  return (
    <div className='maintable'>
      <table className='bodytable'>
     
     <thead>
         <tr>
             <th className='pskillshead' >PS Skills</th>
             <th className='levpostshead' >Levels</th>
             <th className='levpostshead'>Posts</th>
             <th className='pskillslastpost' >Last Post</th>
         </tr>
     </thead>
     <tbody> 
     {/* .filter((item)=>{
       
       return search?.toLowerCase === ''?
       item: item?.skill?.toLowerCase().includes(search.toLowerCase());

     }) */}
    { console.log(Datas_)}
     

     {Datas_.map((item,i)=>{
    
       return(
       <tr>
             <td className='pskills'><Link to={`/${item?.url}`}> {item?.skill}</Link></td>
           
       
             <td className='levposts'>{item?.level}</td>
             <td className='levposts'>{item?.posts}</td>
          
             <td className='lastpost'>
                  
                  {item.lastpost_time !="NaNYears ago"? <ul className='lapost-list'>
                 
                   <li className='lapost-date'> 
                      <NavLink to={`/${item?.lastpost_lang}/${item?.lastpost_level}/discussion?discussionId=${item?.lastpost_id}`}  style={{textDecoration:"none", color:" #00357d"}}>
                      {item?.lastpost_time} 
                      </NavLink>
                   </li>
                  
                    
                        <li className='lapost-author'>
                          
                          <NavLink to={`/Account?name=${item?.lastpost_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}>
                              <img src={Img1} alt='abc'/><span className='non-image'>{item.lastpost_name}</span>
                          </NavLink>  
                        </li>
                    
                  </ul>:  <ul> <li className='notposted'>{"No posts"}</li> <li className='notposted'>{"available !"}</li></ul> }     

            </td>

       </tr>
       
     )
        
     })}
               
     </tbody>
   </table>
    </div>
  )
}


