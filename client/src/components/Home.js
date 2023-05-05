import React,{useState,useEffect} from 'react'
import log from '../images/logo192.png'

const Home = () => {

  const[username,setUsername] = useState()
  const [show,setShow] = useState(false)
  useEffect(()=>{
    callHomePage()
  },[])

  const callHomePage=async()=>{
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
        if(!data.error){
          setUsername(data.name)
          setShow(true)
        }
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
      <section className='home-page d-flex justify-content-center align-items-center'>
            <div className="container text-center">
              <p className='home-page-name'><b>--- welcome {show?username:''}--- </b></p>
              <img className='App-logo mb-2' src={log} style={{height:"50px"}} alt="" />
              <h2 className='home-page-title1'>{show?`Happy, to see you back`:''}</h2>
              <p className='home-page-title2'>"BCreative - Creativity is just connecting things !! "</p>
            </div>
      </section>
    </>
  )
}

export default Home
