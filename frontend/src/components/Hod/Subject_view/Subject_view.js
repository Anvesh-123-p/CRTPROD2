import React from "react";
import styles from './Subject_view.module.css';  
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import axios from "axios";
import {BiSearch} from 'react-icons/bi'

import { useNavigate } from "react-router-dom";

const Subject_view = () => {
    let navigate=useNavigate()

    const[d,setd]=useState([]);
    const[ch,setch]=useState([]);
    const[duration,setduration]=useState("");

    const[showForm2,setShowForm2]=useState(false);
    const[showForm,setShowForm]=useState(false);
    const[subname,setsubname]=useState(false);
    const[patchid,setpatchid]=useState(false);
    const[classes,setclasses]=useState([])
    const[topicname,settopicname]=useState("");
    const[status2,setstatus2]=useState("");

    const [fac,setfac]=useState([]);
    const [clsid,setclsid]=useState("");
    const [facid,setfacid]=useState("");
    const [dura,setdura]=useState("");
    const [sdate,setsdate]=useState("");
    const[Search,setSearch]=useState('')
    const[hpw,sethpw]=useState(0)
    const[showreje,setShowreje]=useState(false);
    const[showlsp,setShowlsp]=useState(false);
    const[lspid,setlspid]=useState("");
    const[tdata,settdata]=useState([])
    const[tdata7,settdata7]=useState([])
    const[s,sets]=useState(false)
    const[reid,setreid]=useState('0');
    const[showlsp2,setShowlsp2]=useState(false);



let url ="http://localhost:8000/api/subjects/";

    const subjectname=(e)=>{
        setsubname(e.target.value)
      }
      const handlestat=(e)=>{
        setstatus2(e.target.value)
      }
      const hpwname=(e)=>{
        sethpw(e.target.value)
      }
    const handleSubmit=(e)=>{
      if(localStorage.getItem('token')!=null){
        const localdata = JSON.parse(localStorage.getItem("token"));

        if(facid!="" ){
          if(clsid!=""){


        let data={
            
          "name": subname,
           "faculty_id": facid,
        "class_id": clsid,
        "hoursperweek":hpw,
        "totalhours":dura,
        "startdate":sdate


 
       
   
    
   }


        axios.post(url,data).then(
            (response)=>{
              
              setch(1+ch)
                setShowForm(false);
                alert("subject created")
  
              }
            
            ).catch((err) => console.log(err))
            
            

}
else{
  alert("Please Select Class to assign the subject")
}

    }
    else{
      alert("Please Select Faculty to assign the subject")
    }
    e.preventDefault();

  
  }}





  const handleOpenreje=(targ)=>{
    setShowreje(true);
    setreid(targ)
    
    
  }
  const dur=(e)=>{
    console.log(e)
    console.log(e.target.value)
    setduration(e.target.value)
  }
  const tname=(e)=>{
    console.log(e)
    console.log(e.target.value)
    settopicname(e.target.value)
  }
  const createlsp=()=>{
    console.log("hello")
    let topicdata={
      "LessonPlan_id":lspid,
      "name":topicname,
      "hours":duration

    }
    let url="http://localhost:8000/api/u/"

    
    axios.post(url,topicdata).then(
      (response)=>{
          console.log(response)
          setduration("")
          settopicname("")
          settdata(response.data.data)


        }
      
      ).catch((err) => console.log(err))
    
  }




  const handleSubmit2=(e)=>{
    if(localStorage.getItem('token')!=null){
      const localdata = JSON.parse(localStorage.getItem("token"));

      if(facid!="" ){
        if(clsid!=""){


      let data={
          
        "name": subname,
         "faculty_id": facid,
      "class_id": clsid,
      "hoursperweek":hpw,
      "totalhours":dura,
      "startdate":sdate,
      "sub_id":patchid,



     
 
  
 }


      axios.patch(url,data).then(
          (response)=>{
            
            setch(9+ch)
              setShowForm2(false);

            }
          
          ).catch((err) => console.log(err))
          
          

}
else{
alert("Please Select Class to assign the subject")
}

  }
  else{
    alert("Please Select Faculty to assign the subject")
  }
  e.preventDefault();


}}
    
    const Clsid=(e)=>{
        console.log(e)
        console.log(e.target.value)
        setclsid(e.target.value)
      }
      const Facid=(e)=>{
        console.log(e)
        console.log(e.target.value)
        setfacid(e.target.value)
      }
      const durat=(e)=>{
        console.log(e)
        console.log(e.target.value)
        setdura(e.target.value)
      }
      const sdat=(e)=>{
        console.log(e)
        console.log(e.target.value)
        setsdate(e.target.value)
      }
      const logout=()=>{
        localStorage.clear()
        setTimeout(() => {
            navigate('/login');
            }, 2000);

    }
    
    const formopen2=(pid,name,fa,cla,std,hopw,duratt)=>{
 setpatchid(pid)
 console.log(name)
 setsubname(name)
 setdura(duratt)
 sethpw(hopw)
 console.log(std)
 setsdate(std)

 



      setShowForm2(true);
      if(localStorage.getItem('token')!=null){
      const localdata = JSON.parse(localStorage.getItem("token"));
      console.log(localdata.dept)
      let classesurl="http://localhost:8000/api/class/?dept="+localdata.dept
      let facurl="http://localhost:8000/api/users/?user_type=FAC"


      axios.get(classesurl).then((response)=>{
            if(response.data.data.length!=0)
          setclasses(response.data.data)
        })
        axios.get(facurl).then((response)=>{
          if(response.data.data.length!=0)
        setfac(response.data.data)
      })
  }}
  const deletesub=()=>{
    let delurl=url+"?sub_id="+reid
    axios.delete(delurl).then(
      (response)=>{
          alert(
            response.data.message
            

          )
          setShowreje(false)
          setch(1+ch)

        }
      
      ).catch((err) => alert(JSON.stringify(err.response.data)))

  
    
  }
  const toic=(e)=>{
    setShowlsp(true)
    setlspid(e)

  let url = "http://127.0.0.1:8000/api/u/?lspid="+e

    axios.get(url).then((response)=>{
      console.log(response.data)
      settdata(response.data.data)
      
    
    
      
    })

  }

  const toic2=(e)=>{
    setShowlsp2(true)
    setlspid(e)

  let url = "http://127.0.0.1:8000/api/u/?lspid="+e

    axios.get(url).then((response)=>{
      console.log(response.data)
      settdata7(response.data.data)
      
    
    
      
    })

  }
  const handleCloselsp2=(e)=>{
    console.log(e)
    console.log(status2)
    let data2= {
      'status':status2,
      'LessonPlan_id':lspid,
      'id':e
    }
    if(status2.length!=0){
    console.log(data2)
    let paturl="http://127.0.0.1:8000/api/u/"
    axios.patch(paturl,data2).then(
      (response)=>{
        console.log(response)
        
          alert(
            "Updated Succesfully"

          )
          setShowlsp2(false)
          setch(ch+1)
          

        }
      
      ).catch((err) => alert(JSON.stringify(err.response.data)))
    }
    else{
      alert("Update Topic status to save")
    }

}
  const handleCloselsp=(e)=>{
    console.log(e)
    let delurl="http://127.0.0.1:8000/api/u/?id="+e
    axios.delete(delurl).then(
      (response)=>{
        console.log(response)
        
          alert(
            "Deleted Succesfully"

          )
          settdata(response.data.data)
          

        }
      
      ).catch((err) => alert(JSON.stringify(err.response.data)))


}
const appr=(e)=>{
  if(localStorage.getItem('token')!=null){
  console.log(e)
  const localdata = JSON.parse(localStorage.getItem("token"));

  let dat ={
    "lspid":e,
    "email":localdata.email,
    // "name":localdata.name,
    "dept":localdata.dept,
    "status":"Pending For Approval"
  }
  let url ="http://127.0.0.1:8000/api/LessonPlanEdit/"
  

  axios.patch(url,dat).then((response )=>{
    console.log(response)
    if(response.status==200){
        alert('Your Lesson Plan has been succefully Sent for Approval');
        // setTimeout(() => {
        //     navigate('/faculty/home/');
        //     }, 2000);
        setShowlsp(false)
        setch(2+ch)


        
    }else if(response.status!=200){
        alert("error");
    }

   })
   } }
  const handleClosereje=()=>{
    setShowreje(false);
  }
    const formopen=()=>{

        setShowForm(true);
        if(localStorage.getItem('token')!=null){
        const localdata = JSON.parse(localStorage.getItem("token"));
        console.log(localdata.dept)
        let classesurl="http://localhost:8000/api/class/?dept="+localdata.dept
        let facurl="http://localhost:8000/api/users/?user_type=FAC"


        axios.get(classesurl).then((response)=>{
              if(response.data.data.length!=0)
            setclasses(response.data.data)
          })
          axios.get(facurl).then((response)=>{
            if(response.data.data.length!=0)
          setfac(response.data.data)
        })
    }}
    

    
    useEffect(() => {
      if(localStorage.getItem('token')!=null){
        const localdata = JSON.parse(localStorage.getItem("token"));
        let substats="http://localhost:8000/api/GetSubjectsByDepartment/?dept="+localdata.dept
      
        axios.get(substats).then((response)=>{
          setd(response.data.subjects)
      

          }
    )}
      },[ch]);
    
    return (
        <div>
          <Modal size='lg'
        isOpen={showlsp}>
                      toggle={()=>setShowlsp(true)}
            <ModalHeader
            toggle={()=>setShowlsp(false)}> 
            Create Lesson Plan 
            </ModalHeader>
        <ModalBody>

{
  
        tdata.map((x)=>(
        <div class="row g-5 mb-3">
                <div class="col ">
                    <label>Topic Name</label>
                    <input type="text" className={`form-control ${styles.input}`}    placeholder="Topic name" aria-label="Topic name" value={x.name}/>
                </div>
                <div class="col ">
                    <label>Duration</label>
                    <input type="text" className={`form-control ${styles.input}`}    placeholder="Duration" aria-label="Duration" value={x.hours}/>
                </div>
                <div class="col">
              <button className="btn btn-secondary" onClick={()=>handleCloselsp(x.id)}>Delete Topic</button></div>
              </div>
        ))}








        <div class="row g-5 mb-3">
                <div class="col ">
                    <label>Topic Name</label>
                    <input type="text" className={`form-control ${styles.input}`} value={topicname} onChange = {(e)=>{tname(e)}}  placeholder="Topic name" aria-label="Topic name"/>
                </div>
                <div class="col ">
                    <label>Duration</label>
                    <input type="text" className={`form-control ${styles.input}`} value={duration} onChange = {(e)=>{dur(e)}}  placeholder="Duration" aria-label="Duration"/>
                </div>
               
              <div class="col"> <button  className="btn btn-success bcst" onClick={createlsp}>Add Topic</button>
              </div>
              
              
              </div>
              <button onClick={()=>appr(lspid)}>Submit For Approval</button>
              <button onClick={()=>{setShowlsp(false);}}>Close</button>
            </ModalBody>
        </Modal>

        <Modal size='lg'
        isOpen={showlsp2}>
                      toggle={()=>setShowlsp2(true)}
            <ModalHeader
            toggle={()=>setShowlsp2(false)}> 
            Edit Lesson Plan 
            </ModalHeader>
        <ModalBody>

{
  
        tdata7.map((x)=>(
        <div class="row g-5 mb-3">
                <div class="col ">
                    <label>Topic Name</label>
                    <input type="text" className={`form-control ${styles.input}`}    placeholder="Topic name" aria-label="Topic name" value={x.name}/>
                </div>
                <div class="col ">
                    <label>Duration</label>
                    <input type="text" className={`form-control ${styles.input}`}    placeholder="Duration" aria-label="Duration" value={x.hours}/>
                </div>
                <div class="col ">
                    <label>Status</label>
                    <label htmlFor="inputState" className="form-label ">Department</label>
                <select id="inputState" onChange={(e)=>{handlestat(e)}} className="form-select border border-dark" required>
                <option defaultValue>{x.status}</option>
                {x.status=='Not Started' &&<option value="Completed">Completed</option>}
                {x.status=='Completed' &&<option value="Not Started">Not Started</option>}

                
                </select>                </div>
                <div class="col">
              <button className="btn btn-secondary" onClick={()=>handleCloselsp2(x.id)}>Save Topic</button></div>
              </div>
        ))}








       
              {/* <button onClick={()=>appr2(lspid)}>Submit</button> */}
              <button onClick={()=>{setShowlsp2(false);}}>Close</button>
            </ModalBody>
        </Modal>
          <Modal size='lg'
             isOpen={showreje}>
                          toggle={()=>setShowreje(true)}
            <ModalHeader
            toggle={()=>setShowreje(false)}> 
             Subject Delete 
            </ModalHeader>
        <ModalBody>
              <p>Are you sure to delete</p>
              <button className="btn btn-secondary"onClick={handleClosereje}>Cancel</button>
              <button className="btn btn-danger" onClick={deletesub}>Delete</button>
            </ModalBody>
        </Modal>
                 <Modal size='lg'
             isOpen={showForm}
            
            toggle={()=>setShowForm(true)}>
            <ModalHeader
            toggle={()=>setShowForm(false)}> 
            Add Subject   
            </ModalHeader>
            <ModalBody>
            <form className="form-inline " id="StudentModal" onSubmit={(e) => {
                handleSubmit(e);
            }}>
            {<div class="row g-5 mb-3">
                <div class="col ">
                    <label>Subject Name</label>
                    <input type="text" className={`form-control ${styles.input}`}  onChange = {(e)=>{subjectname(e)}}  placeholder="Subject name" aria-label="Subject name" required/>
                </div>
                <div class="col ">
                    <label>Hours per week</label>
                    <input type="number" className={`form-control ${styles.input}`}  onChange = {(e)=>{hpwname(e)}}  placeholder="Hours Per Week" aria-label="Hours per week" required/>
                </div>
                
                <div class="row g-5 mb-3">
                <div class="col ">
                    <label>Total Hours</label>
                    <input type="number" className={`form-control ${styles.input}`}  onChange = {(e)=>{durat(e)}}  placeholder="Total Hours" aria-label="Total Hours" required/>
                </div>
                <div class="col ">
                    <label>Start Date</label>
                    <input type="date" className={`form-control ${styles.input}`}  onChange = {(e)=>{sdat(e)}}  placeholder="Start Date" aria-label="Start Date" required/>
                </div>
                </div>
                
                <select id="inputState"onChange={(e)=>{Clsid(e)}} required>
                <option value="">Select Class Name</option>
                {classes.map((x)=>(
                <option value={x.class_id}>{x.dept}_{x.sem}_{x.sec}</option>
                ))}
                </select>
                <select id="inputState"onChange={(e)=>{Facid(e)}} required>
                <option value="">Select Faculty</option>
                {fac.map((x)=>(
                <option value={x.id}>{x.name}</option>
                ))}
                </select>
              
            
            </div>
            }
           
           
                
            <button className={styles.button} >Submit sub</button>
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        
        </form>  
            </ModalBody>

        </Modal>








        <Modal size='lg'
             isOpen={showForm2}
            
            toggle={()=>setShowForm2(true)}>
            <ModalHeader
            toggle={()=>setShowForm2(false)}> 
            Edit Subject   
            </ModalHeader>
            <ModalBody>
            <form className="form-inline " id="StudentModal" onSubmit={(e) => {
                handleSubmit2(e);
            }}>
            {<div class="row g-5 mb-3">
                <div class="col ">
                    <label>Subject Name</label>
                    <input type="text" className={`form-control ${styles.input}`}  value={subname}onChange = {(e)=>{subjectname(e)}}  placeholder={subjectname} aria-label="Subject name" required/>
                </div>
                <div class="col ">
                    <label>Hours per week</label>
                    <input type="number" className={`form-control ${styles.input}`} value={hpw} onChange = {(e)=>{hpwname(e)}}  placeholder="Hours Per Week" aria-label="Hours per week" required/>
                </div>
                
                <div class="row g-5 mb-3">
                <div class="col ">
                    <label>Total Hours</label>
                    <input type="number" className={`form-control ${styles.input}`} value={dura} onChange = {(e)=>{durat(e)}}  placeholder="Total Hours" aria-label="Total Hours" required/>
                </div>
                <div class="col ">
                    <label>Start Date</label>
                    <input type="date" className={`form-control ${styles.input}`} value={sdate} onChange = {(e)=>{sdat(e)}}  placeholder="Start Date" aria-label="Start Date" required/>
                </div>
                </div>
                
                <select id="inputState"onChange={(e)=>{Clsid(e)}} required>
                <option value="">Select Class Name</option>
                {classes.map((x)=>(
                <option value={x.class_id}>{x.dept}_{x.sem}_{x.sec}</option>
                ))}
                </select>
                <select id="inputState"onChange={(e)=>{Facid(e)}} required>
                <option value="">Select Faculty</option>
                {fac.map((x)=>(
                <option value={x.id}>{x.name}</option>
                ))}
                </select>
              
            
            </div>
            }
           
           
                
            <button className={styles.button} >Submit sub</button>
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        
        </form>  
            </ModalBody>

        </Modal>
              <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Class_View" className={`nav-link ${styles.nav_link}`} >Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Faculty_View" className={`nav-link ${styles.nav_link}`}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Subject_view" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Subjects</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/Hod/Approval" className={`nav-link ${styles.nav_link}`}>Approval</Link>
        </li>
      </ul>
      <div className="dropdown ms-auto">
        <img src={imgprofile} alt="Profile Image" className="dropdown-toggle profile-img" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <Link to="/Hod/Profile"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/Hod/Edit_Faculty"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <Link to =""><li><span className="dropdown-item" onClick={logout}>Logout</span></li></Link>
        </ul>
      </div>
    </div>
  </div>
</nav>

            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                <div className={styles.search}>
        <form class="container d-flex">
           <input class="form-control me-2" type="search" placeholder="Search" 
           onChange={(e)=>{
            setSearch(e.target.value)
            sets(true)
           }} aria-label="Search"/>
           <BiSearch className="fs-1"/>
          </form>
        </div> 
                    {/* <button className={styles.create_button}>Create New Subject</button> */}
                    <button className={styles.create_button} id={styles.postbtn} onClick={formopen} role="button">Create Subject</button>

                </div>
            </nav>
            <table className={`table table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Faculty Assigned</th>
                        <th scope="col">Class</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Hours Per Week</th>
                        <th scope="col">Total Hours</th>
                        <th scope="col">Lesson Plan Status</th>
                        <th scope="col">Lesson Plan</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {d.length===0&&
          <div id={styles.loading}><p>Sorry, we dont see any Subjects created for the department</p></div>}
                
                
                
                
                
                
                
                {s ? (d.length>0 &&   d.filter((d)=>{
              if(Search==""){
                return d
              }else if(d.name.toLowerCase().includes(Search.toLowerCase())){
                return d
              }

                }).map((x)=>(
                    <tr>
                        <td>{x.name}</td>
                        <td>{x.faculty_id}</td>
                        <td>{x.class_id}</td>
                        <td>{x.startdate}</td>
                        <td>{x.hoursperweek}</td>
                        <td>{x.totalhours}</td>
                        <td>{x.lspstatus}</td>
                        {x.lspstatus=="Not Created" && <td><button onClick={() => toic(x.lspid)}>Create Lesson Plan</button></td>}
                        {x.lspstatus=="Rejected" && <td><button onClick={() => toic(x.lspid)}>Create Lesson Plan</button></td>}
                        {x.lspstatus=="Completed" && <td><button onClick={() => toic2(x.lspid)}>Edit Completed Subject</button></td>}

                        {x.lspstatus=="In Progress" && <td><button onClick={() => toic2(x.lspid)}>Edit</button></td>}
                        {x.lspstatus=="Pending For Approval" && <td><a >--</a></td>}
                        {x.lspstatus=="Pending for Approval" && <td><a >--</a></td>}

                        <td>
                            <a onClick={() => formopen2(x.sub_id,x.name,x.faculty_id,x.class_id,x.startdate,x.hoursperweek,x.totalhours)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg></a>
                            <a onClick={() => handleOpenreje(x.sub_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg></a>
                        </td>
                    </tr>
                )))
              :
              d.map((x)=>(
                <tr>
                    <td>{x.name}</td>
                        <td>{x.faculty_id}</td>
                        <td>{x.class_id}</td>
                        <td>{x.startdate}</td>
                        <td>{x.hoursperweek}</td>
                        <td>{x.totalhours}</td>
                        <td>{x.lspstatus}</td>
                        {x.lspstatus=="Not Created" && <td><button onClick={() => toic(x.lspid)}>Create Lesson Plan</button></td>}
                        {x.lspstatus=="Rejected" && <td><button onClick={() => toic(x.lspid)}>Create Lesson Plan</button></td>}
                        {x.lspstatus=="Completed" && <td><button onClick={() => toic2(x.lspid)}>Edit Completed Subject</button></td>}

                        {x.lspstatus=="In Progress" && <td><button onClick={() => toic2(x.lspid)}>Edit</button></td>}
                        {x.lspstatus=="Pending For Approval" && <td><a >--</a></td>}
                        {x.lspstatus=="Pending for Approval" && <td><a >--</a></td>}
                    <td>
                        <a onClick={() => formopen2(x.sub_id,x.name,x.faculty_id,x.class_id,x.startdate,x.hoursperweek,x.totalhours)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg></a>
                        <a onClick={() => handleOpenreje(x.sub_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg></a>
                    </td>
                </tr>

            
            ))}
                   
                   
                    
                   
                </tbody>
            </table>

            {/* <div className={styles.page}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-4">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div> */}
        </div>
    );
};

export default Subject_view;
