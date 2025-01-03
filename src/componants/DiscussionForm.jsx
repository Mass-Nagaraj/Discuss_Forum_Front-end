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

    const [languages,setLanguages]= useState([]);
    const [selectId,setSelectId]= useState();
    const [selectLevelId,setSelectLevelId]= useState();
    const [levels,setLevels]= useState([]);
    const [language_id, setLanguageID] = useState();
    const [level_id, setLevelID] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [error,setError] =useState('')
    const [file,setFile]=useState();
    const [EditingDatas,setEditingDatas]=useState([]);
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

  
  // Get Levels for selected language
  
  useEffect(()=>{
    axios.get("http://localhost:2000/getLevelForLanguage",{
      params:{
        lang_id:selectId
      }
    })
    .then((res)=>{
      setLevels(res.data)
    }).catch((err)=>{
        console.log(err);
    });

  },[selectId])


  // Fetch languages
  useEffect(() => {
    axios
      .get("http://localhost:2000/getLanguages")
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(()=>{

    if( EditPostId != null) {
      
      axios.post('http://localhost:2000/QuestionId',{
        id:EditPostId
      }).then((res)=>{
        console.log("Editing Datas :",res.data);
        setEditingDatas(res.data);
        setEditor(res.data[0]?.email);
        setLanguageID(res.data[0]?.language_id);
        setLevelID(res.data[0]?.level_id);
        setTitle(res.data[0]?.title);
        setBody(res.data[0]?.body);
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

  useEffect(() => {
    if (language_id) {
      axios.get("http://localhost:2000/getLanguage", {
        params: {
          language_id: language_id,
        },
      })
      .then((res) => {
        console.log("Language :",res.data)
        // setLanguage(res.data[0]?.label); 
        setSelectedLanguage(res.data[0]?.name); 
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [language_id]);
  

if(EditPostId!=null) {
  
    if(editor!=email) {
      return <p>Questions Editing Only Access For Question poster...</p>
    }
}
    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =year+"-"+mes+"-"+dia;
  
    var hour=today.getHours();
    var minutes=today.getMinutes();
    var seconds=today.getSeconds();
    var fecha1 =hour+":"+minutes+":"+seconds;

    console.log("Before :",language_id,level_id);

    formData.append('email',email);
    // These are edit from already added Post (language_id,level_id)
    formData.append('language_id',Number(language_id));
    formData.append('level_id', Number(level_id));
    formData.append('title', title);
    formData.append('body', body);
    formData.append('date', fecha);
    formData.append('time', fecha1); 

    if(file){
      formData.append('image', file); 
    }
    else{
      formData.append('image', ''); 
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { email,language_id,level_id, title, body,fecha,fecha1,file });
    console.log("Form data File : ",file?.name)
    
    if(EditPostId==null) {
      // console.log("True ...Form datas..",formData)

    
        axios.post("http://localhost:2000/Discussion",formData)
        .then((res)=>{
            console.log("Question added SuccessFully...!")
        }).catch((err)=>{
            console.log(err);
        });

    }
    
    else{  
      formData.append('edit_id',EditPostId);
      if(pre_image!=null) {

        formData.append('pre_image',pre_image);
      }     
      
        axios.post("http://localhost:2000/EditDiscussion",formData)
        .then((res)=>{
          console.log("Question Edited SuccessFully...!");
          navigate(`/${language_id}/${level_id}/discussion?discussionId=${EditPostId}`);

        }).catch((err)=>{
          console.log(err);
        })
    }
      setLanguageID('');
      setLevelID('');
      setTitle('');
      setBody('');
      setFile('');  
    
  };
  
  function cancel() {
      
    setLanguageID('');
    setLevelID('');
    setTitle('');
    setBody('');
    setFile('');

  }

  function notify(){
    if(!(selectId && selectLevelId && title && body)){
      setError('Enter Your Email and Password')
    } 
    else{
      setError('')
    }

    if(selectId && selectLevelId && title && body) {
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
              <select required value={selectedLanguage} onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedSubject = languages.find(
                  (subject) => subject.label == selectedValue
                );
                if (selectedSubject) {
                  console.log(selectedSubject.id)
                  setSelectId(selectedSubject.id);
                  setLanguageID(selectedSubject.id);
                }
                setSelectedLanguage(selectedValue);
              }}>
              
              <option value="">Select Language</option>

                {languages.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                          {subject.label}
                      </option>
                ))}
              </select>
              <h4>LEVEL</h4>
              <select required value={selectedLevel} onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedSubject = levels.find(
                  (subject) => subject.label == selectedValue
                );
                if (selectedSubject) {
                  console.log(selectedSubject.id)
                  setSelectLevelId(selectedSubject.id);
                  setLevelID(selectedSubject.id);
                }
                setSelectedLevel(selectedValue);
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

          {file && <p className='file-upload-para-bold'> <b>Selected file: </b> {file.name}</p>} 
      <div className='button-container'>

              <button type="button" className='discussion-cancel-btn' onClick={cancel}>CANCEL</button>
              {EditPostId==null ?  <Button  onClick={notify} intent="primary" type="submit" className='discussion-cancel-btn'>SUBMIT</Button>:
               <Button  onClick={notify} intent="primary" type="submit" className='discussion-cancel-btn'>Edit</Button>}
      </div>
                    
            </form>
          </div>
      </div>
  );
};

export default Discussionform;

