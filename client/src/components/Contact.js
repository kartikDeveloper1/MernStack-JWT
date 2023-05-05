import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
  const[userData,setUserData] = useState({name:"",email:"",phone:"",message:""})
  const navigate= useNavigate()

  useEffect(()=>{
    userContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if(data.error){
          const error = new Error(res.error)
          throw error
        }else{
          setUserData({
            ...userData,name:data.name,email:data.email,phone:data.phone
          })
        }
        
      } catch (error) {
        navigate('/login')
      }
  }
  
  // we are storing data in state
  const handleInputs=(e)=>{
      setUserData({
        ...userData,[e.target.name]:e.target.value
      })
  }

  // send data to database
  const sendMessage=async(e)=>{
    e.preventDefault()
    const {name,email,phone,message} = userData;
    const res= await fetch('/contact',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email,phone,message})
    })
    const data =await res.json()
    if(data.success){
      alert('Message sent successfully')
      setUserData({...userData,message:''})
    }else{
      alert('Fill All details')
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
                      <input name='name' readOnly className='form-control input-field ' onChange={handleInputs} type="text" value={userData.name} id="contact_name" placeholder='Your name' required={true} />
                      <input name='email' readOnly className='form-control input-field mx-2' onChange={handleInputs} type="email" value={userData.email} id="contact_email" placeholder='Your email' required={true} />
                      <input name='phone' readOnly className='form-control input-field' onChange={handleInputs} type="number" value={userData.phone} id="contact_phone" placeholder='Your phone number' required={true} />
                    </div>
                    <div className="contact-message-text mt-4">
                      <textarea name='message' className="contact-form-message form-control" onChange={handleInputs} value={userData.message}  placeholder='message' cols="30" rows="5"></textarea>
                    </div>
                    <div className="contact_form_button mt-4">
                        <button onClick={sendMessage} className='btn btn-primary form-control'  type='submit'>Send Message</button>
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
