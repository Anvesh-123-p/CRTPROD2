import React from 'react';
import styles from './Faculty_View.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imgprofile from '../../../assests/profileimg.svg';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BiSearch} from 'react-icons/bi'
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import Profile from '../../../assests/profileimg.svg';

import { useState,useEffect } from 'react';
const Faculty_View = () => {
  let navigate=useNavigate()
  const[showreje,setShowreje]=useState(false);
  const[reid,setreid]=useState('0');
  const [profile,setprofile]=useState();

  const[showfac,setshowfac]=useState(false);
  const[d,setd]=useState([]);
  const[ch,setch]=useState([]);
  const[Search,setSearch]=useState('')
  const[s,sets]=useState(false)



  const [mobile,setmobile]=useState();
    const [subjects,setsubjects]=useState(['--']);
    const [classes,setclasses]=useState([]);


    const [name,setname]=useState();
    const [data2,setdata2]=useState([]);
    const [email,setemail]=useState();

    const [exp,setexp]=useState();
    const [gender,setgen]=useState();

    const [designation,setdesign]=useState();

    const [qualification,setquali]=useState();
    const [dept,setdept]=useState();
    const [idd,setidd]=useState();
  const logout=()=>{
    localStorage.clear()
    setTimeout(() => {
        navigate('/login');
        }, 2000);

}

const handleOpenreje=(targ)=>{
  setShowreje(true);
  setreid(targ)
  
  
}

const handleOpenfac=(targ)=>{
  console.log('cliclke')
  

 



    let url="http://localhost:8000/api/users/?email="+targ
    axios.get(url).then((response)=>{
      console.log(response.data.data.subjects)
      setname(response.data.data.name)
      setemail(response.data.data.email)
      setmobile(response.data.data.mobile_number)
      setsubjects(response.data.data.subjects)
      setclasses(response.data.data.classes)
      setdesign(response.data.data.designation)
      setquali(response.data.data.qualification)
      setdept(response.data.data.dept)
      setexp(response.data.data.experience)
      setgen(response.data.data.gender)
      setidd(response.data.data.id)
      setdata2(response.data.data2)
      setprofile(response.data.data.profile_photo)


    
      
    })
  
  
}


let url="http://localhost:8000/api/users/?user_type=FAC&dept=";
useEffect(() => {
  const localdata = JSON.parse(localStorage.getItem("token"));
  axios.get(url+localdata.dept).then((response)=>{
    setd(response.data.data)


    }
)
},[ch]);





  return (
    <div>
      
        
        
        
        
        







        <Modal size='lg'
        isOpen={showfac}>
        toggle={()=>setshowfac(true)}
<ModalHeader
toggle={()=>setshowfac(false)}> 
Faculty Data 
</ModalHeader>
        <ModalBody>


<div>


<div className="container mt-4">
    <div className="row">
        <div className="col-lg-4 col-12 mb-3">
            <div className={`card ${styles.card1}`}>
                <img src={Profile} className="card-img-top" alt={"./profileimg.svg"} />
                <div className="card-body">
                    <h5 className="card-title"><strong>{name}</strong></h5>
                    
                    <p className="card-text"><strong>{qualification}</strong></p>
                </div>
            </div>
        </div>
                         
        <div className="col-lg-8 col-12">
            <div className="table-container">
                <table className={`table table-bordered ${styles.table_above}`}>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{idd}</td>
                        </tr>
                        <tr>
                            <th>Email id</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <th>Mobile</th>
                            <td>{mobile}</td>
                        </tr>
                        <tr>
                            <th>Classes Handling</th>
                            {classes.map((x)=>(
                                <p id="pe">{x}</p>
                            ))}
                        </tr>
                        <tr>
                            <th>Subjects Handling</th>

                            {subjects.map((x)=>(
                                <p id="pe">{x}</p>
                            ))}
                            {subjects.length==0&&subjects.map((x)=>(
                                <p id="pe">---</p>
                            ))}

                        </tr>
                        <tr>
                            <th>Department</th>
                            <td>{dept}</td>
                        </tr>
                        
                        <tr>
                            <th>Designation</th>
                            <td>
                            
                            {designation &&
                            <p>{designation}</p>
                            
                            }
                            {!designation &&
                            <p>--</p>
                            
                            }

                            
                            
                            
                            </td>
                        </tr>
                       
                        <tr>
                            <th>Qualification</th>
                            <td>{designation &&
                            <p>{qualification}</p>
                            
                            }
                            {!qualification &&
                            <p>--</p>
                            
                            }</td>
                        </tr>
                        <tr>
                            <th>Experience</th>
                            <td> {designation &&
                            <p>{exp} years</p>
                            
                            }
                            {!exp &&
                            <p>--</p>
                            
                            }</td>
                        </tr>
                        <tr>
                            <th>Doctorate</th>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </div>
    </div>
    
    <div className="row">
        <div className="col-12">
            <table className={`table table-hover ${styles.table_below}`}>
                <thead>
                    <tr>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Total Topics</th>
                        <th scope="col" className="text-danger">Not Started Topics</th>
                        <th scope="col" className="text-success">Completed Topics</th>
                        <th scope="col" className="text-danger">Pending Hours</th>
                        <th scope="col" className="text-success">Completed Hours</th>
                        <th scope="col" className="text-success">Target Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(data2)}
                    

                        {data2.map((x)=>(
                           <tr> 
                            <td>{x.subject}</td>
                            <td>---</td>
                            <td>{x.Total}</td>
                           <td>{x.NotStarted}</td>
                           <td>{x.Completed}</td>
                           <td>{x.pendinghours}</td>
                           <td>{x.completedhours}</td>
                           <td>{x.expectedhourstocomplete}</td>
                           
                           
                           
                           </tr>

                        ))}
                        
                        {/* <td>100</td>
                        <td>60</td>
                        <td className="text-danger">4</td>
                        <td className="text-success">36</td> */}
                   
                  
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
</ModalBody>




        </Modal>
      {/* First Navbar */}
      <nav className={`navbar navbar-expand-lg ${styles.nav_bar}`  }>
  <div className="container-fluid">
    <button className={`navbar-toggler ${styles.navbar_toggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbar_nav}`}>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/faculty/Home" className={`nav-link ${styles.nav_link}`} aria-current="page">Home</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/faculty/Class_View" className={`nav-link ${styles.nav_link}`} >Classes</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/faculty/Faculty_View" className={`nav-link ${styles.nav_link}`} style={{ fontWeight: 'bold' }}>Faculty</Link>
        </li>
        <li className={`nav-item ${styles.nav_item}`}>
          <Link to="/faculty/Subject_view" className={`nav-link ${styles.nav_link}`}>Subjects</Link>
        </li>
        
      </ul>
      <div className="dropdown ms-auto">
        <img src={imgprofile} alt="Profile Image" className="dropdown-toggle profile-img" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <Link to="/faculty/Profile"><li><span className="dropdown-item ">Profile</span></li></Link>
          <Link to="/faculty/Edit_Profile"><li><span className="dropdown-item">Edit Profile</span></li></Link>
          <Link to =""><li><span className="dropdown-item" onClick={logout}>Logout</span></li></Link>
        </ul>
      </div>
    </div>
  </div>
</nav>

      {/* Second Navbar */}
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
        </div>
      </nav>

      {/* Table Section */}
      <div className="container mt-4">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Subjects Handling</th>
              <th>Mobile</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
          {d.length===0&&
          <div id={styles.loading}><p>Sorry, we dont see any classes created for the department</p></div>}
            
            
            
            
            
            {s ? (d.length>0 &&   d.filter((d)=>{
              if(Search==""){
                return d
              }else if(d.name.toLowerCase().includes(Search.toLowerCase())){
                return d
              }

                }).map((x)=>(

<tr>
<td>{x.name}</td>
{x.subjects.length!=0&&<td>{x.subjects}</td>}
{x.subjects.length==0&&<td>---</td>}

<td>{x.mobile_number}</td>
<td>
{ <i onClick={() => handleOpenfac(x.email)}className="fas fa-eye" style={{ cursor: 'pointer', color: '#007bff' }}></i>}

</td>

</tr>

            )
            
          
          )):
          d.map((x)=>(

            <tr>
            <td>{x.name}</td>
            <td>{x.subjects.map((y)=>(
              <div>{y}</div>
            )


            )
              
              
              
              
              }</td>
            <td>{x.mobile_number}</td>
            <td>
            { <i onClick={() => handleOpenfac(x.email)}className="fas fa-eye" style={{ cursor: 'pointer', color: '#007bff' }}></i>}

              {/* <i onclick={() => handleOpenreje(x.id)}className="fas fa-eye" style={{ cursor: 'pointer', color: '#007bff' }}></i> Eye Icon */}
            </td>
            

              
            </tr>
          ))
          
          }
            

          

      
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Faculty_View;
