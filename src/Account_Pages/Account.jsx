import React,{useEffect, useState} from 'react'
// import { Recentreply } from '../components/Recentreply';
import Img1 from '../assets/download (1).jpeg';
import { Profile } from './Profile';
import { TopicsStarted } from './TopicsStarted';
import { RepliesCreated } from './RepliesCreated';
import './Account.css';

import { Footer } from '../componants/Footer';
import { NavLink, useLocation } from 'react-router-dom';
import { Header1 } from '../componants/Header1';
import axios from 'axios';
import { FirstHeader } from '../componants/Header';
import FindDate from '../componants/FindDate';
import Favourites from './Favourites';
import { Recentreply } from './Recentreply';
import { Saved } from '@blueprintjs/icons';
import Savedd from './saved';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Account = () => {

  const [selectedComponent, setSelectedComponent] = useState('0');
  let [results,setResult]=useState([])
  let [questions,setQuestions]=useState([])
  const [replies,setReplies]=useState([]);
  let showdate=new Date()
  const location=useLocation();

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  let [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
  let [currentHours,currentMinutes,currentsec]=displayTime.split(':');
  let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
  let arr3=[Number(currentHours),Number(currentMinutes)];
  let email,nowemail,nowusername;
  const MyKeyValues=window.location.search;
  const queryParams=new URLSearchParams(MyKeyValues);
  const Params1=queryParams.get('name');
  const [username,setUsername]=useState("");
  // console.log("name :",Params1+"@bitsathy.ac.in");
  let Profile_click=location.state?.Profile_click;
  // let Acc_option_selected=location.state?.selected;
  
  // console.log("Account :",Profile_click,Acc_option_selected)
  // if(Acc_option_selected!=null) {

  //   Cookies.set("Ac_select",Acc_option_selected)
  // }

  const [focusArray, setFocusArray] = useState([true, false, false, false,false]);
  const contents = ["Profile", "Topics Started", "Replies Created", "Likes","Saved"];

  const [focusArray1, setFocusArray1] = useState([true, false, false]);
  const contents1 = ["Profile", "Topics Started", "Replies Created"];
  
  let demo=Cookies.get('Ac_select')

  useEffect(()=>{
    if(demo!=null) {
      setSelectedComponent(demo);
      if(demo==0) {
        setFocusArray([true, false, false, false,false]);
        setFocusArray1([true, false, false]);
      }
      if(demo==1) {
        setFocusArray([false, true, false, false,false]);
        setFocusArray1([false, true, false]);
      }
      if(demo==2) {
        setFocusArray([false, false, true, false,false]);
        setFocusArray1([false, false, true]);
      }
      if(demo==3) {
        setFocusArray([false, false, false,true,false]);
        setFocusArray1([false, false, false]);
      }
      if(demo==4) {
        setFocusArray([false, false, false, false,true]);
        setFocusArray1([false, false, false]);
      }
      console.log("demo :",demo)
    } 
  },[demo]);


  useEffect(()=>{

    if(Profile_click!=null) {

      setSelectedComponent('0');
      
      setFocusArray([true, false, false, false,false]);
      setFocusArray1([true, false, false]);
      Profile_click=null
    }

    // const contents = ["Profile", "Topics Started", "Replies Created", "Likes","Saved"];
    // const contents1 = ["Profile", "Topics Started", "Replies Created"];
},[Profile_click])

// console.log(" Profile_click : and selected ",Profile_click,Acc_option_selected)


  // console.log("demo type:",typeof demo)

    // if(Cookies.get('Ac_select')) {
    //   setSelectedComponent(Cookies.get('Ac_select'))
    // }
  
    // console.log("Profile Click :",Profile_click,)


  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    nowemail =decode_payload.email
    nowusername= decode_payload.username;
  }
  
  // email=Params1+"@bitsathy.ac.in";
  email=Params1;
  // console.log("email passing and now_email:",email,nowemail)

  
  useEffect(()=>{
    axios.post("http://localhost:2000/getAccUsername",{email:email})
    .then((res)=>{
      // console.log(res.data)
      setUsername(res.data[0]?.username);

    })
  },[email]);

  let arr2=[],arr4=[]
  let c_count=0;
  let py_count=0;
  let java_count=0;
  let ui_count=0;
  
  let c_reply_count=0;
  let py_reply_count=0;
  let java_reply_count=0;
  let ui_reply_count=0;


  useEffect(()=>{
    axios.get('http://localhost:2000/users')
    .then((res)=>{
      setResult(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[]);


  useEffect(()=>{
    
    axios.post("http://localhost:2000/profile",{
      email:email
    })
    .then((res)=>{
      setQuestions(res.data);     
    }).catch((err)=>{
      console.log(err);
    })
  },[]);

  
useEffect(()=>{

    axios.post("http://localhost:2000/getallreplies",{
      email:email
    })
    .then((res)=>{
      setReplies(res.data);     
    }).catch((err)=>{
      console.log(err);
    })
},[]);


const handleClick =(component) =>{
  setSelectedComponent(component);
};

const changeTrueFalse = (index) => {
  setFocusArray((prev) =>
    prev.map((item, i) => (i === index ? true : false))
  );
};

const changeTrueFalse1 = (index) => {
  setFocusArray((prev) =>
    prev.map((item, i) => (i === index ? true : false))
  );
};

  let date,time,[fetchDate,fetchMonth,fetchYear,]=['','',''],[Hours,Minutes,seconds] =['','',''], a,roll_number,dept,batch;

  // console.log("userss ",results)
  {results.map((value,index)=>{
    
    <div key={index}></div>
     
    if(value.email == email){
      
          [fetchDate, fetchMonth, fetchYear] = value.date?.split("/");
          [Hours, Minutes] = value.time?.split(':');
          arr2=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
          arr4=[Number(Hours), Number(Minutes)]; 
          roll_number=value.roll_number;
          dept=value.dept;
          batch=value.batch         
    }
    
  })}

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
  
  {replies.map((value,index)=>{
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
  
  
  if(nowemail=== email){
    a="Active Now"
  }else{
    a=FindDate({ arr2:arr2 ,arr4:arr4 });
  }

  // console.log('roll',roll_number)
  
  const renderComponent = () => {
    // {console.log("before switch case :",selectedComponent)}


      switch (selectedComponent) {
        case '0':
          return <Profile email={email} nowemail={nowemail} active={a} questions={questions} replies={replies}/>
                  
        case '1':
          return <TopicsStarted c_count={c_count} py_count={py_count} java_count={java_count} ui_count={ui_count} email={email} nowemail={nowemail} questions={questions} selectedComponent={selectedComponent}/>
                  
        case '2':
          return <RepliesCreated  c_reply_count={c_reply_count} py_reply_count={py_reply_count} java_reply_count={java_reply_count} ui_reply_count={ui_reply_count} />

        case '3':
          return <Favourites email={email} nowemail={nowemail} active={a}/>

        case '4':
          return <Savedd email={email} nowemail={nowemail} active={a}/>

        default:
          return null;
      }
    };




let lastFiveRecentReplies=questions?.slice(-5).reverse();
let recentReplies=(lastFiveRecentReplies);

if(!email) {
  return  <h1>404</h1>
}

return (

    <div className='bodyy'>
      <Header1 email={nowemail} selectedComponent={selectedComponent}/>
      <div className='content-body'>
        <div className='account'>
              <div className='name'>
                  <h1>{username}</h1>
              </div>
    <div className='fundamental'>
                <div className='fundamental-img'>
                    <img src={Img1} alt='xyz'/>
                </div>
                <div className='fundamental-details'>
                    <ul>
                    <li><b>DEPARTMENT</b> : {dept}</li>
                    <li><b>ROLL NUMBER</b> : {roll_number} </li>
                    <li><b>EMAIL</b> : {email}</li>
                    </ul>
                </div>
            </div>
            <div className='account-base'>
              <div className='proflinks'>
                <ul>
                 
                 {email==nowemail ? <div> {contents.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {handleClick(`${index}`); changeTrueFalse(index)}} 
                          className={focusArray[index] ? "focused-item" : "unfocused-item"}
                        >
                          <a>{item}</a>
                        </li>
                      ))} </div> : <div> {contents1.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {handleClick(`${index}`); changeTrueFalse1(index)}} 
                          className={focusArray[index] ? "focused-item" : "unfocused-item"}
                        >
                          <a>{item}</a>
                        </li>
                      ))} </div> }
                </ul>
              </div>

              <div className='profile-details'>
                  {renderComponent()}
              </div>

            </div>
        </div>
          <Recentreply email={email} nowemail={nowemail} selectedComponent={selectedComponent}/>
      </div>
     
    </div>

   
  )
}

export default Account