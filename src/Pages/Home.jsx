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
  const [search,setSearch]=useState('');

  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [posts,setPosts]=useState([]);
  const [allposts,setAllposts] =useState([]);
  let recentReplies,lastFiveRecentReplies;
  const [auth, setAuth] = useState('');

  axios.defaults.withCredentials = true;
  let result='';
  const navigate=useNavigate();
  // let email,username;
    
  // const jwt_token=Cookies.get('token');
  // if(jwt_token) {
  //   const decode_payload=jwtDecode(jwt_token);
  //   email =decode_payload.email
  //   username= decode_payload.username;

  // }

  // console.log("coming ...",email,username)

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
      // else if(res.data.status=="expirederror") {
        
      // }
      else{
          setAuth(false);
          navigate("/"); 
          // history.replace('/'); 
      } 
  }).catch((err)=> console.log(err));

  },[]);




  useEffect(()=>{
    axios.get('http://localhost:2000/posts')
    .then((res)=>{
      setPosts(res.data);
    
    }).catch((err)=>{
      console.log(err);
    })
},[])

 
  useEffect(()=>{

      axios.get("http://localhost:2000/getRecentPosts")
      .then((res)=>{
        setAllposts(res.data); 
      
      }).catch((err)=>{
        console.log(err);
      })
  },[])
  
  
  lastFiveRecentReplies=allposts.slice(-5).reverse();
  recentReplies=(lastFiveRecentReplies);

  if(!email ) {
    return <h1>"HI ! Email  "</h1>
  }

  return (
    <div className='bodyy'>
    <FirstHeader searchh= {(data)=> setSearch(data)} content={`Welcome to the PS Discussion Forum`} Languages={4} Levels={16} Posts= {posts.length} />

    <div className='content-body'>
    <DataTable searchh={search}/>
      <div className='recent-reply'>
        
       
        <h2>RECENT POSTS</h2>

        <table className='rr'>
          
        {recentReplies?.map((value,index)=>{
        
          <div key={index}></div>
            const date=value?.date || "";
            const [fetchDate,fetchMonth,fetchYear]=date? date.split("/") : [];

            let arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]
            let a, name;

            const time=value?.time || "";
            const [Hours,Minutes,seconds]=time? time.split(':') : [] ;
            let arr4=[Number(Hours),Number(Minutes)];

            a=FindDate({ arr2:arr2 ,arr4:arr4 });
  
              name=value.email;            
              return(

                    <tr>
                      <td className='imagetd'>
                          <NavLink to={`/Account?name=${name}`} style={{ textDecoration: 'none',  color: "#11297f" }} > <img src={Img1}></img> </NavLink>
                      </td>

                      <td className='columntwo'> <NavLink to={`/Account?name=${name}`} style={{ textDecoration: 'none',  color: "#11297f" }}><b>{value.username}</b> </NavLink> on<br/>
                          
                        <NavLink to={`/${value.language}/${value.level}/discussion?discussionId=${value.id}`}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                              {value.title}<br/>
                              {a}
                        </NavLink>
                      </td>
                    </tr>
                // </tbody>
              )
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

export default Home
