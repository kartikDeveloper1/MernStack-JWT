import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
  const[userData,setUserData] = useState([])
  const navigate= useNavigate()
  useEffect(()=>{
    userContact()
  },[])

  const userContact=async()=>{
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
        setUserData(data)
      } catch (error) {
        navigate('/login')
      }
  }
  return (
    <>
      <section className='mt-5'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone number */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/arcade/64/null/iphone.png" alt="phone" className='me-2' />
                <div className="contact-info-content">
                  <div className="contact-info-title display-7">
                    <b>Phone</b>
                  </div>
                  <div className="contact-info-text">
                    +111 4573793
                  </div>
                </div>
              </div>
              {/* email */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/color/48/000000/circled-envelope.png" alt="email" className='me-2' />
                <div className="contact-info-content">
                  <div className="contact-info-title display-7">
                    <b>Email</b>
                  </div>
                  <div className="contact-info-text">
                    Sethi@technical.com
                  </div>
                </div>
              </div>
              {/* Address */}
              <div className="contact-info-item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/external-color-outline-adri-ansyah/64/null/external-property-real-estate-color-outline-adri-ansyah-39.png" alt="phone" className='me-2' />
                <div className="contact-info-content">
                  <div className="contact-info-title display-7">
                    <b>Address</b>
                  </div>
                  <div className="contact-info-text">
                    Yamunanagar,Haryana,India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-us-form mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="contact_form container ">
                  <div className="contact_form-title mb-3">
                    <b style={{ fontSize: "25px" }}>Get in Touch</b>
                  </div>
                  <form id="contact-form">
                    <div className="contact_form_name d-flex justify-content-between ">
                      <input className='form-control input-field ' type="text" value={userData.name} id="contact_name" placeholder='Your name' required={true} />
                      <input className='form-control input-field mx-2' type="email" value={userData.email} id="contact_email" placeholder='Your email' required={true} />
                      <input className='form-control input-field' type="number" value={userData.phone} id="contact_phone" placeholder='Your phone number' required={true} />
                    </div>
                    <div className="contact-message-text mt-4">
                      <textarea className="contact-form-message form-control" placeholder='message' cols="30" rows="5"></textarea>
                    </div>
                    <div className="contact_form_button mt-4">
                        <button className='btn btn-primary form-control'  type='submit'>Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
