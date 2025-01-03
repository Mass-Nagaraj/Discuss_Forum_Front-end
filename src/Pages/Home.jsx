import React, { useEffect, useState } from 'react';
import { Footer } from '../componants/Footer';
import { DataTable } from '../componants/dataTable';
import Img1 from '../assets/download (1).jpeg'
import Img2 from '../assets/download.jpeg';
import Img5 from '../assets/image(1).png';
import Img4 from '../assets/OIP (6).jpeg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FirstHeader } from '../componants/Header';
import FindDate from '../componants/FindDate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../Account_Pages/Recentreply.css';
import Img11 from '../assets/NotYetPost.jpg'

const Home = () => {

  const location = useLocation();
  const [usernames,setUsernames]=useState([]);
  const [search,setSearch]=useState('');
  const [languagesCount,setLanguagesCount]=useState();
  const [levelCount,setLevelCount]=useState();

  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [postsCount,setPostsCount]=useState();
  const [allposts,setAllposts] =useState([]);
  let RecentPosts,FiveRecentPosts;
  const [auth, setAuth] = useState('');

  axios.defaults.withCredentials = true;
  let result='';
  const navigate=useNavigate();
  Cookies.remove('Ac_select');
  
  useEffect(()=>{

    axios.get("http://localhost:2000/protected")
    .then((res)=>{
      console.log(res.data)
      if(res.data.status=="success") {
          setAuth(true);
          setUsername(res.data.name);
          setEmail(res.data.email);
          console.log("Retrive Token Datas ",res.data)
      }
      else{
          setAuth(false);
          navigate("/");  
      }
    }).catch((err)=> console.log(err));

  },[])
  
  useEffect(()=>{
    axios.get('http://localhost:2000/usernames')
    .then((res)=>{
      setUsernames(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])


  useEffect(()=>{
    axios.get('http://localhost:2000/getallposts')
    .then((res)=>{
      setPostsCount(res.data.length);
    
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:2000/getLanguages')
    .then((res)=>{
      setLanguagesCount(res.data.length);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:2000/getLevels')
    .then((res)=>{
      setLevelCount(res.data.length);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

 
  useEffect(()=>{

      axios.get("http://localhost:2000/getallposts")
      .then((res)=>{
        setAllposts(res.data); 
      
      }).catch((err)=>{
        console.log(err);
      })
  },[])
  
  FiveRecentPosts=allposts.slice(-5).reverse();
  RecentPosts=(FiveRecentPosts);

  if(!email ) {
    return <h1>"HI ! Email  "</h1>
  }

  return (
    <div className='bodyy'>
    <FirstHeader searchh= {(data)=> setSearch(data)} content={`Welcome to the PS Discussion Forum`} Languages={languagesCount} Levels={levelCount} Posts= {postsCount} />

    <div className='content-body'>
    <DataTable searchh={search}/>
      <div className='recent-reply'>
               
        <h2>RECENT POSTS</h2>

        <table className='rr'>
          
        {RecentPosts?.map((value,index)=>{
        
          <div key={index}></div>
          let day, month, year;
          const dateObj = new Date(value.date);
          day = dateObj.getDate();             // Day of the month (1-31)
          month = dateObj.getMonth() + 1;     // Month (0-11, so add 1)
          year = dateObj.getFullYear();       // Full year (e.g., 2023)
          
          const [Hours, Minutes] = value?.time?.split(":");

            
            let a, username;

            a=FindDate({ arr2: [
              Number(day),
              Number(month),
              Number(year),
            ] ,arr4:[Number(Hours), Number(Minutes)] });
            
            {usernames.forEach((name)=>{
            
              if(name.email==value.email) {
                username=name.username
            }

            })}

            return(
                <tr>
                  <td className='imagetd'>
                      <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }} > <img src={Img1}></img> </NavLink>
                  </td>

                  <td className='columntwo'> <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }}><b>{username}</b> </NavLink> on<br/>
                      
                    <NavLink to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                          {value.title}<br/>
                          {a}
                    </NavLink>
                  </td>
                </tr>
              // </tbody>
            )
        })}
        
        {RecentPosts?.length ==0 ? <tr className='nopostsyet'>
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

export default Home
