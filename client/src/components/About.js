import React, { useEffect, useState } from 'react'
import profile from '../images/profile.png'
import { useNavigate } from 'react-router-dom'
const About = () => {
  const[userData,setUserData] = useState([])
  const navigate= useNavigate()
  useEffect(()=>{
    callAboutPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const callAboutPage=async()=>{
      try {
        const res= await fetch('/getuser',{
          method:'get',
          headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
  
        const data = await res.json()
        if(data.error){
          const error = new Error(res.error)
          throw error
        }else{
          setUserData(data)
        }
      } catch (error) {
         navigate('/login')
      }
  }
  return (
    <>
      <div className="container  emp_profile mt-5 ">
        <form method='get'>
          <div className="row ms-3">
            <div className="col-md-2 ">
              <img className='' src={profile} alt="kartik" style={{ height: "150px" }} />
            </div>
            <div className="col-md-10">
              <div className="profile_head">
                <h4>{userData.name}</h4>
                <p className='profession'>{userData.work}</p>
                <p className='profile_ready mt-3 mb-5'>
                  RANKINGS <span>1/10</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                 
                  <li className="nav-item" >
                    <a className="nav-link active"  id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li className="nav-item" >
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-md-3">
              <input type="button" className='profile-edit-btn btn btn-secondary' name='btnAddMore' value='Edit Profile' />
            </div> */}
          </div>
          <div className="row ms-3">
            {/* Left side url */}
            <div className="col-md-2 ">
              <div className="profile-work">
                <p>WORK LINKS</p>
                <a href="https://github.com/kartikDeveloper1" target='_sethi'>Github</a><br />
                <a href="https://github.com/kartikDeveloper1" target='_sethi'>Youtube</a><br />
                <a href="https://github.com/kartikDeveloper1" target='_sethi'>Instagram</a><br />
                <a href="https://github.com/kartikDeveloper1" target='_sethi'>LinkedIn</a><br />
              </div>
            </div>
            {/* right side */}
            <div className="col-md-6 about-info">
              <div className="tab-content profile-tab" id='myTabContent'>
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row mt-4 ">
                    
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row mt-4 ">
                    <div className="col-md-6">
                      <label>Experiance</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>5</p>
                    </div>
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>


      </div>

    </>
  )
}

export default About
