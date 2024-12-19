import React, { useEffect, useState } from 'react';
import {Button, EditableText, InputGroup, Toaster} from '@blueprintjs/core'
import './DiscussionForm.css'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Header1 } from './Header1';
import FileUpload from './FileUpload';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Discussionform = () => {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [error,setError] =useState('')
    const [insertDate,setInsertDate]=useState('');
    const [insertMonth,setInsertMonth]=useState('');
    const [insertYear,setInsertYear]=useState('');
    const location=useLocation();
    const [file,setFile]=useState();
    const [EditingDatas,setEditingDatas]=useState([]);
    const [views,setViews]=useState(0);
    const [likes,setLikes]=useState(0);
    const [editing_postId,setEditing_postId]=useState();
    const [editor,setEditor]=useState();
    const [pre_image,setPre_image]=useState(null)
    const navigate=useNavigate();
    let formData = new FormData();
   
    let email,username;
   
    const jwt_token=Cookies.get('token');
    if(jwt_token) {
      const decode_payload=jwtDecode(jwt_token);
      email =decode_payload.email
      username= decode_payload.username;
    
    }
    
    Cookies.remove('Ac_select');
    
    const MyKeyValues=window.location.search;
    const queryParams=new URLSearchParams(MyKeyValues);
    const EditPostId=queryParams.get("EditPostId");
  
  
  useEffect(()=>{

    if( EditPostId != null) {
      
      axios.post('http://localhost:2000/edit',{
        id:EditPostId
      }).then((res)=>{
        // console.log("Eding Datas :",res.data);
        setEditingDatas(res.data);
        setEditor(res.data[0]?.email);
        setLanguage(res.data[0]?.language);
        setLevel(res.data[0]?.level);
        setTitle(res.data[0]?.title);
        setBody(res.data[0]?.body);
        setViews(res.data[0]?.views)
        setLikes(res.data[0]?.likes);
        // setEditing_postId(EditPostId);
        
        if(res.data[0]?.image==null) {
          setFile(null);
        }
        else{
          setPre_image(res.data[0]?.image)
          setFile({ name: res.data[0]?.image,type:`image/${res.data[0]?.image.split(".")[1]}` });
        }
      
      }).catch((err)=> console.log(err));
      
    }

  },[EditPostId]);
  
  
if(EditPostId!=null) {

  if(editor!=email) {
    return <p>Questions Editing Only Access For Question poster...</p>
  }

}
    let showdate=new Date()

    let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    let dt=showdate.toDateString()
    let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
    
    // console.log(displayTodaysDate," ",dt);
    // console.log(displayTime);

    const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
    // console.log("Todays Date:"+ currentDate,currentMonth,currentYear);
    


  const languages = [
    { value: 'C', label: 'Programming C' },
    { value: 'Python', label: 'Programming Python' },
    { value: 'Java', label: 'Programming Java' },
    { value: 'UIUX', label: 'UIUX' },
  ];

  const levels = 
     [
      { value: 'Level1', label: 'Level 1' },
      { value: 'Level2', label: 'Level 2' },
      { value: 'Level3', label: 'Level 3' },
      { value: 'Level4', label: 'Level 4'},
      { value: 'Level5', label: 'Level 5' },
    ];

 

    formData.append('username',username);
    // console.log("form data username :",formData.get('username'))
    formData.append('email',email);
    formData.append('language', language);
    formData.append('level', level);
    formData.append('title', title);
    formData.append('body', body);
    formData.append('date', displayTodaysDate);
    formData.append('time', displayTime); 

    formData.append('views',views);
    formData.append('likes',likes);



    if(file){
      formData.append('image', file); 
    }
    else{
      formData.append('image', ''); 
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { username,email,language,level, title, body,displayTodaysDate,displayTime,file });
    console.log("Form data File : ",file?.name)
    
    if(EditPostId==null) {
      // console.log("True ...Form datas..",formData)

        axios.post("http://localhost:2000/Discussion",formData)
        .then((res)=>{
            console.log("Question added SuccessFully...!")
        }).catch((err)=>{
            console.log(err);
        });

    }else{  
      
      
      formData.append('edit_id',EditPostId);
      if(pre_image!=null) {

        formData.append('pre_image',pre_image);
      }     
      
        axios.post("http://localhost:2000/EditDiscussion",formData)
        .then((res)=>{
          console.log("Question Edited SuccessFully...!");
          navigate(`/${language}/${level}/discussion?discussionId=${EditPostId}`);

        }).catch((err)=>{
          console.log(err);
        })
    }
      setLanguage('');
      setLevel('');
      setTitle('');
      setBody('');
      setFile('');  
    
  };
  
  function cancel() {
      
    setLanguage('');
    setLevel('');
    setTitle('');
    setBody('');
    setFile('');

  }

  function notify(){
    if(!(language && level && title && body)){
      setError('Enter Your Email and Password')
    } 
    else{
      setError('')
    }

    if(language && level && title && body) {
      let toastMsg='Success..!';
      if(EditPostId!=null) {
        toastMsg='Edited Success..!';
      }
      toast.success(toastMsg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      
      // toast.warn('Warning..!', {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      //   transition: Bounce,
      //   });
    }
    else{
        toast.error('Enter the below Details..!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
  }
}
// console.log("Editing datas is :",EditingDatas)

// console.log("Image File :",file)

return (
    <div>

      <Header1  email={email}/>
            <div className='form-container'>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                  />
            <div>
                <h2 >DISCUSSION FORM</h2>
                <br/>
            </div>
         
<br/>
            <form className='form-group' onSubmit={handleSubmit}>
              
              <h4>SKILL</h4>
              <select required value={language} onChange={(e) => {
                                                setLanguage(e.target.value);
                                                setSelectedLanguage(e.target.value);
              }}>
              
              <option value="">Select Language</option>

                {languages.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                          {subject.label}
                      </option>
                ))}
              </select>
              <h4>LEVEL</h4>
              <select required value={level} onChange={(e) => {
                                                  setLevel(e.target.value);
                                                  setSelectedLevel(e.target.value);
              }}>
                
              <option value="">Select Level</option>
                {levels.map((chapter) => (
                    <option key={chapter.value} value={chapter.value}>
                      {chapter.label}
                    </option>
                ))} 

              </select>
              <h4>SUBJECT</h4>
              <input type="text" placeholder="Subject" value={title} onChange={(e) => setTitle(e.target.value)} required />
              
              <h4>CONTENT</h4>  
              <textarea required placeholder="Provide your content here" value={body} onChange={(e) => 
                                                          setBody(e.target.value)} 
              />

        <h4>ATTACHMENTS</h4>
        <button
            onClick={() => document.getElementById('file-upload').click()}
            type='button'
            className='formfile-upload'>
            <DriveFolderUploadIcon />
            Upload File
        </button>
        <input 
          type="file" 
          id="file-upload" 
          accept='.jpg,.jpeg,.png'
          className='upload-file' 
          onChange={(e) => {
          setFile(e.target.files[0]);}}
        />
        {file &&  <button style={{"margin":"2px", "padding":"3px" }}type="button" onClick={()=>{
                                                 setFile('');
                                                 setPre_image('')
                                              }}>
                                            &times;
          </button>}
       
        {/* {console.log(file)} */}
          {file && <p className='file-upload-para-bold'> <b>Selected file: </b> {file.name}</p>} 
      <div className='button-container'>

              <button type="button" className='discussion-cancel-btn' onClick={cancel}>CANCEL</button>
              {EditPostId==null ?  <Button  onClick={notify} intent="primary" type="submit" className='discussion-cancel-btn'>SUBMIT</Button>:
               <Button  onClick={notify} intent="primary" type="submit" className='discussion-cancel-btn'>Edit</Button>}
             
      </div>
                    
            </form>
          </div>
      {/* <Footer/> */}
      </div>
  );
};

export default Discussionform;

