
// import React, { useEffect, useState } from 'react'
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
// import axios from 'axios';
// import Img1 from '../assets/download (1).jpeg'
// import { NavLink } from 'react-router-dom';
// import Likes from './Like_componant';

// const ReplyFrom2 = ({question,question1,username,email,post_id,main_id, sub_id }) => {
    
//     const [reply,setReply]=useState('');

//     const [isOpen2, setIsOpen2] = useState(false);
//     const [file2,setFile2]=useState(null);
//     const openDrawer2 = () => setIsOpen2(true);
//     const closeDrawer2 = () => setIsOpen2(false);
    
//     // let [q_email,setQues_email]=useState(qemail);
//     const [isOpen, setIsOpen] = useState(false);
//     const openDrawer = () => setIsOpen(true);
//     let [subreplies,setSubreplies]=useState();
//     const closeDrawer = () => setIsOpen(false);
    


//     let showdate=new Date()

//     let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
//     let dt=showdate.toDateString()
//     let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
//     const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
//     const [currentHours,currentMinutes,currentsec]=displayTime.split(':');
//     let [viewDate,viewMonth,viewYear]=['', '' ,'']
    
//     let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
//     let arr2=[];

//     // console.log("subreplies in ReplyForm :",subrepliess);


    
// useEffect(()=>{
//     axios.post('http://localhost:2000/getsubreplies',{
//       post_id :post_id
//     }).then((res)=>{
      
//       setSubreplies(res.data)
//     }).catch((err)=>{
//       console.log(err);
//     })
//   },[post_id])
  

// function handleSubmit1(event){

//     event.preventDefault();
//         showdate=new Date();
//         let formData1= new FormData;
    
//         displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
//         displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
            
//         if(sub_id==null) {

//             formData1.append('to_main_replyid',main_id);
//         }
//         if(main_id==null) {
//             formData1.append('to_sub_replyid',sub_id);
//         }

//         formData1.append('username',username);
//         formData1.append('from_email',email);
//         formData1.append('post_id',post_id);
//         formData1.append('body',reply);
//         formData1.append('date',displayTodaysDate);
//         formData1.append('time',displayTime);
    
//         // console.log(formData1)
    
//         if(file2){
//         formData1.append('image', file2); 
//         }
//         else{
//         formData1.append('image', ''); 
//         }
        
//         console.log("form ",formData1)
    
//         axios.post('http://localhost:2000/subreplies',formData1)
//         .then((res)=>{
//             console.log("sub Reply added SuccessFully...!")
//             setReply('');
//             setFile2('')
                  
//         }).catch((err)=>{
//             console.log(err);
//         })
    
    
//  }
//  //  console.log(main_id,sub_id)
//  //  console.log("sub replies",subreplies)
    
//   return (
//     <div>

//           <form onSubmit={handleSubmit1}>
//                   <button className="open-btn" onClick={openDrawer2}>
//                       Reply
//                   </button>
// {/* {console.log("HI")} */}
//                   <div className={`drawer ${isOpen2 ? 'open' : ''}`}>
//                       <div className="drawer-content">
//                                               <button className="close-btn" onClick={()=>{
//                                                     closeDrawer2();
//                                                     setFile2('');   }}>      &times;    </button>
//                                       <h2>{question1} <br/> Reply to   `{question}`</h2>
                                
//                               <div className='drawer-body'>
//                                       <button
//                                             onClick={() => document.getElementById('file-upload').click()}
//                                             className="bottomupload-file">
//                                             <DriveFolderUploadIcon />
//                                             Upload File
//                                         </button>
//                                         <input 
//                                           type="file" 
//                                           id="file-upload"
//                                           className="file-upload"
//                                           accept='.jpg,.jpeg,.png' 
//                                           onChange={(e) => {
//                                           setFile2(e.target.files[0]);}}
//                                         />
//                                         {/* {console.log("image file in reply page :",file2)} */}
//                                         {file2 && <p>Selected file: {file2.name}</p>}
                          
//                                         <textarea type="text" placeholder="Type here..." className="input-field" required value={reply} onChange={e=>{
//                                                   setReply(e.target.value);
                                                  
//                                           }}/>
//                               </div>
                              
//                                   <div className="drawer-footer">
//                                           <button className="cancel-btn" onClick={()=>{
//                                               closeDrawer2();
//                                               setFile2('');  }}>
//                                                 Cancel
//                                           </button>
//                                           <button type="submit" className="save-btn"  onClick={()=>{
//                                               closeDrawer2();
                                              
//                                           }}>Save Sub Reply</button>

//                                   </div>
                                  
//                       </div>
//                   </div>
//           </form>
                 
//     </div>
//   )
// }

// export default ReplyFrom2
