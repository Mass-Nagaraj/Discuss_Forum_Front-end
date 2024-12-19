import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Bottomdrawer.css'; 
import './Questions.css'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CodeImg from '../assets/codeImage.png';
import Img1 from '../assets/download (1).jpeg'
// import Img7 from '../assets/'
import { FaBookBookmark, FaBookmark, FaHeart, FaPen, FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Header1 } from '../componants/Header1';
import BottomDrawer from './BottomDrawer';
import { Footer } from '../componants/Footer';
import axios from 'axios';
import Mainreplies from './Like_componant';
import Likes from './Like_componant';
import ReplyFrom from './ReplyFrom';
import Subreplies from './Subreplies';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ViewReplies from './ViewReplies';  
import { Deletealertbox } from './Deletealertbox';
import { TbMessageReply } from 'react-icons/tb';


function Questions() {

  const [isOpen, setIsOpen] = useState(false);
  const [file,setFile]=useState(null);
  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const [reply,setReply]=useState('');
  const [q_email,setQues_email] = useState('');
  const [q_username,setQ_username] =useState();
  const [title,setTitle] =useState();
  let [question, setQuestion] =useState() ;
  let [post_id,setPost_id] =useState() ;
  const [views,setViews]=useState(0);
  let [views_date,setView_date]=useState();
  const [image,setImage] =useState();

  let [likes,setLikes]=useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [result,setResult]=useState()
  const [mainreplies,setMainreplies]=useState([]);  
  const [liked, setLiked] = useState(false);
  const [marked,setMarked] = useState(false);
  const [subreplies,setSubreplies]=useState()
  const [yes_no,setYes_no]=useState('');
  const [yes_no1,setYes_no1]=useState('');
  const [q_level,setQ_level]=useState('');
  const [q_language,setQ_language]=useState('');

  const [editMainReply,setEditMainReply]=useState("");
  const [editReplyId,setEditReplyId]=useState(null);

  const navigate=useNavigate()
  
  let path= window.location.pathname;
  const language = path?.split("/")[1];
  const level = path?.split("/")[2];

  const MyKeysValues =window.location.search;
  const queryParams=new URLSearchParams(MyKeysValues);

  const Param1=queryParams.get('discussionId');
  const location =useLocation();
  const Click_lastReply_id=location.state?.lastReply_id;
  
  const Acc_option_selected=location.state?.selected;
  // console.log("last reply Click ",Click_lastReply_id)
  // console.log("AAcc_option_selected",Acc_option_selected)
  if(Acc_option_selected!=null) {

    Cookies.set("Ac_select",Acc_option_selected)
  }
  let email,username;

  
  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    email =decode_payload.email
    username= decode_payload.username;
  
  }
  
  useEffect(()=>{

    axios.post(`http://localhost:2000/QuestionId`,{
      id:Param1
    })
    .then((res)=>{
      console.log("Question Details...",res.data[0])
      console.log("Id details...",res.data);
      setQues_email(res.data[0].email)
      setQ_username(res.data[0].username)
      setQuestion(res.data[0].body);
      setTitle(res.data[0].title)
      setPost_id(res.data[0].id);
      setViews(res.data[0].views);
      setView_date(res.data[0].view_date);
      setImage(res.data[0].image);
      setQ_language(res.data[0].language);
      setQ_level(res.data[0].level);
      
    }).catch((err)=>{
      console.log(err);
    })
  },[Param1]);



  useEffect(()=>{

    axios.post('http://localhost:2000/check_likeExist',{email:email, id:post_id})
    .then((res)=>
      {
        console.log("now put like? ",post_id,"  ",res.data.status,typeof res.data.status);
        if(res.data.status=="no") {
          setLiked(!liked);
          setYes_no("no")
        }else {
          setLiked(liked);
          setYes_no("yes");
        }
      })
      .catch((err)=>console.log(err));
  
  },[email,post_id]);

  console.log("Liked...",liked)

  useEffect(()=>{

    
    axios.post('http://localhost:2000/check_saveExist',{email:email, id:post_id})
    .then((res)=>
      {

        console.log("now put saved? ",post_id,"  ",res.data.status);

        if(res.data.status=="no") {
          setMarked(!marked);
          setYes_no1("no")
        }else{
          setMarked(marked);
          setYes_no1("yes");
        }
      })
      .catch((err)=>console.log(err));
  
  },[email,post_id]);


  const toggleLike = () => {

  setLiked(!liked);
  
  if(!liked) {

    setLikes((likes)=>(likes+1));
    if(yes_no=="yes") {

        axios.post('http://localhost:2000/addlike',{ email: email, id: post_id})
        .then((res)=>{
          console.log(res.data)
        }).catch(err=>console.log(err)); 
    }

  }
    else{
      
      setLikes((like)=>(like-1));
      axios.post("http://localhost:2000/delLike",{ email: email, id: post_id})
      .then((res)=>{
          console.log("Removed form like table..")
      }).catch((err)=>console.log(err));

    }
  
  };

  const toggleBmark = () => {

    setMarked(!marked);
    
    if(!marked) {
      // setMarked((likes)=>(likes+1));

      if(yes_no1=="yes") {

          axios.post('http://localhost:2000/saved',{ email: email, id: post_id})
          .then((res)=>{
            console.log(res.data)
          }).catch(err=>console.log(err));
          
      }

    }
    else{
      
      // setMarked((mar)=>(like-1));
      axios.post("http://localhost:2000/delSave",{ email: email, id: post_id})
      .then((res)=>{
          console.log("Removed form save table..")
      }).catch((err)=>console.log(err));

    }
  
  };

  useEffect(()=>{
    axios.post("http://localhost:2000/post_likes",{ post_id:post_id })
    .then((res)=>{
      console.log("likes length" ,res.data.length);
      setLikes(res.data.length)
    }).catch((err)=>console.log(err))
  },[post_id]);

    let showdate=new Date()

    let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    let dt=showdate.toDateString()
    let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
    const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
    const [currentHours,currentMinutes,currentsec]=displayTime.split(':');
    let [viewDate,viewMonth,viewYear]=['', '' ,'']
    
    let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
    let arr2=[];
    let a,count=0;
    let flag;


 const postViewData = ()=>{
        axios.post('http://localhost:2000/postViewData', {
          username: username,
          email: email,
          view_id: post_id,
          view_date: displayTodaysDate
      }).then((result) => {

        if(result){
          if(result.data.Status==='Success') {
                setViews((view)=>(view+1));
                views_date=displayTodaysDate       
              }
              else if(result.data.Status==='Failed'){
                views=views;
                views_date =displayTodaysDate;
                console.log("views Already added");
              }
    }
   
}).catch(err => console.log(err));
 } 
                 

   useEffect(() => {
   if(username && email && post_id && displayTodaysDate){
       console.log("Datas required for postview Data : ",username , email ,post_id, displayTodaysDate)
      postViewData();
      
   }
  }, [post_id]); 

  
useEffect(()=>{
    
    axios.post('http://localhost:2000/view',{
          views:views,
          id:post_id,
          email:email,
          date:views_date
      }).then((res)=>{
        // console.log(res.data)
      }).catch((err)=>{
         console.log(err);
      })
      // }

},[views]);


function handleSubmit(event){
  event.preventDefault();
  showdate=new Date();
  let formData= new FormData();

  displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
       
  formData.append('username',username);
  formData.append('from_email',email);
  formData.append('to_email',q_email);
  formData.append('language',language)
  formData.append('level',level)
  formData.append('post_id',post_id);
  formData.append('body',reply);
  formData.append('date',displayTodaysDate);
  formData.append('time',displayTime);
  // formData.append('likes',likes_count);

  if(file){
    formData.append('image', file); 
  }
  else{
    formData.append('image', ''); 
  }
  
  // console.log("Edited Image bring or null:",file);

if(editReplyId==null) {
 
  axios.post('http://localhost:2000/mainreplies',formData)
    .then((res)=>{
      console.log(res,"Reply added SuccessFully...!")
      
      setReply('');
      setFile('');

  }).catch((err)=>{
      console.log(err);
  })
}else{
  
  formData.append('editReplyId',editReplyId);
  axios.post('http://localhost:2000/EditMainReply',formData)
    .then((res)=>{
      console.log(res.data);
      
      setReply('');
      setFile('');

  }).catch((err)=>{
      console.log(err);
  })
}
  
         

}

useEffect(()=>{

  axios.post('http://localhost:2000/getmainreplies',{
    post_id :post_id
  }).then((res)=>{
    
    setMainreplies(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[post_id])
  

useEffect(()=>{
  axios.post('http://localhost:2000/getsubreplies',{
    post_id :[post_id]
  }).then((res)=>{
    
    setSubreplies(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[post_id])

// console.log("Subreplies : ",subreplies);

// {console.log(email,q_email)}

function delt() {
  axios.post('http://localhost:2000/delt',{
    id:Param1
  }).then((res)=>{
    console.log(res.data);
    navigate(`/${language}/${level}`)
  }).catch((err)=> console.log(err));
  

}

function deltReply(Main_ReplyId) {

  axios.post('http://localhost:2000/deltReply',{
    MainReplyId: Main_ReplyId
  }).then((res)=>{
    console.log(res.data);
  }).catch((err)=> console.log(err));
    
}

function edit() {

  navigate(`/Start_Discuss?EditPostId=${Param1}`);

}

function EditReply(e,id) {
    e.preventDefault();
    axios.post('http://localhost:2000/EditReply',{id:id})
      .then((res)=>{

        console.log("Editing Main reply..",res.data);
        setEditReplyId(res.data[0].id)
        setReply(res.data[0].body);
        if(res.data[0].image) {
          setFile({name: res.data[0].image ,type:`image/${res.data[0].image?.split(".")[1]}`});
        }else{

          setFile('');
        }
        openDrawer();

    }).catch((err)=> console.log(err));

}

  return (
          <div className='bodyy'>
              <Header1 email={email}/>
          <div className='secbody'>
          <div className='secquesh1'>
            
   <h1> QUESTION <BsFillQuestionCircleFill className='ques-icon'/></h1>
            </div>
            <div className='sech1'>
                  <div className='ques-account'>
                            <div className='ques-account-img'> <NavLink to={`/Account?name=${q_email}`} state={{Profile_click:"yes"}} > <img src={Img1}/>  </NavLink></div>
                            <div className='ques-account-name' ><p><NavLink to={`/Account?name=${q_email}`} state={{Profile_click:"yes"}} >{q_username}</NavLink></p></div>
                  </div>
                  <div className='seciconh1'>
                     <h1> {title}</h1>
            </div>


            </div>
            <div className='secpara'>
                  <p>{question}</p> 
            </div>
            <div className='secimg'>
              {/* {console.log("Image :",image)} */}
                {(image!=null)? <img src={`http://localhost:2000/images/${image}`} alt='xy'/> : null} 
            </div>     

      <div className='actions'>
            <div className='likes'>
                <button ><FaHeart className='likeicon' onClick={toggleLike}
                  style={{
                    color: liked ? 'rgb(239, 67, 63)' : 'rgb(179,179,179)',   
                  }}/></button> {likes}
            </div>
            <div className='bookmark'>
                  <button ><FaBookmark className='bm-icon' onClick={toggleBmark}
                    style={{ 
                      color: marked ?  'rgb(239, 67, 63)' : 'rgb(179,179,179)',  
                     }}/></button>
            </div>

            {(q_email== email) ?
           
                <div className='edit'>
                    <button type="button" onClick={edit}><FaPen className='edit-icon'/></button>
                </div>
            :null }

            {(q_email== email) ?
                <div className='delete'>
                  <Deletealertbox  senddd={(data)=> {
                    if(data=="yes") {
                      delt();
                    }
                  }}/> {/*onClick={delt} */}
                </div>
           
            :null }

<div className='replybutton'>
          
          {(q_email!== email) ?  <div>
                    <form onSubmit={handleSubmit}> 

                                    <button className="open-btn" onClick={openDrawer}>
                                        Reply
                                    </button>
                                    {isOpen && <div className="overlay1" onClick={closeDrawer}></div>}
                                    <div className={`drawer ${isOpen ? 'open' : ''}`}>
                                      <div className="drawer-content">
                                        <button className="close-btn" type="button" onClick={()=>{
                                            closeDrawer();
                                            setFile('');
                                        }}>
                                          &times;
                                        </button>
                                        <h2>Reply to {question}</h2> <br/>
                                        <div className='drawer-body'>
                                          <button
                                              type="button"
                                              onClick={() => document.getElementById('file-upload').click()}
                                              className="bottomupload-file">
                                              <DriveFolderUploadIcon />
                                                 Upload File
                                          </button>
                                                            
                                        {file &&  <button style={{"margin":"2px", "padding":"3px" }}type="button" onClick={()=>{
                                          setFile('');
                                           }}>
                                              &times;
                                              </button>}
                                        <input
                                            type="file" 
                                            id="file-upload"
                                            className="file-upload"
                                            accept='.jpg,.jpeg,.png' 
                                            onChange={(e) => {
                                               setFile(e.target.files[0]);
                                            }}
                                          />

                                         

                                          {file && <p>Selected file: {file.name}</p>}

                                        <textarea type="text" placeholder="Type here..." className="input-field" required value={reply} onChange={e=>{
                                                      setReply(e.target.value)
                                                  }} />
                                        </div>
                                        
                                            <div className="drawer-footer">
                                              <button className="cancel-btn" type="button" onClick={()=>{
                                                  closeDrawer();
                                                  setFile('');
                                            }}>
                                                Cancel
                                              </button>
                                              <button className="save-btn" type="submit" onClick={(e)=>{
                                                  handleSubmit(e);
                                                  closeDrawer();

                                              }}>Save</button>
                                            </div>

                                      </div>
                                    </div>
                    </form>

          </div> :null}     

    </div>
      </div>
<br/>
        

      <div className='secreplies'>
          
          
          <div className='secreph1'>
              <h1>REPLIES <TbMessageReply className='reply-icon'/></h1>
          </div>

           {mainreplies?.map((value,index)=>{
             
             return( 
                 <div className='secrepexample' >

                        <div className='secrephead'>
                            <p><NavLink to={`/Account?name=${value.from_email}`} state={{Profile_click:"yes"}} > <img src={Img1}/>{value.username} </NavLink></p>
                        </div>
                        <div className='secreppara'>
                                <p>{value.body}</p> 
                                <div className='secimg'>
                                      { (value.image!=null)? <img src={`http://localhost:2000/images/${value.image}`} alt='xyz'/> : null} 
                                </div>
                                <div className='actions'>
                          <Likes email={email} post_id={post_id} MainReplyId={value.id}/>

                          {/* {console.log("Checking Questions and Main Reply Email :",email,value.from_email)} */}
                          <div  className='actions'>
                           
                            {(value.from_email== email) ?
                            
                                      <div className='actions'>
                                            <div className='edit'>
                                                <button type="button" onClick={(e)=>EditReply(e,value.id)} ><FaPen className='edit-icon'/></button>
                                            </div>
                                            <div className='delete'>
                                                              <Deletealertbox  senddd={(data)=> {
                                            if(data=="yes") {
                                                deltReply(value.id);
                                            }
                                          }}/> {/*onClick={deltReply} */}
                                            </div>
                                      
                                      </div>:null }
                                      {(email !== value.from_email) ?  <div className='replybutton'>
                        
                                        <ReplyFrom toreply_email={value.from_email} question={value.username} question1={question} username={username} email={email} post_id={post_id} main_id={value.id} />

                                    </div>:null}  
                              </div>
                          </div>

                        </div>
                    
                   
                   <div> 
         <br/>
              <div className='replybutton'>
                   <ViewReplies MainReplyId={value.id}  MainReplyUsername={value.username} post_id={post_id} email={email} username={username} question1={question} />              
                </div>
                </div>
                
              </div>

            )
                  
            })}
      </div>
    </div>
        {/* <Footer/> */}
    </div>
  )
}

export default Questions;