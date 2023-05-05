import React, { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Logout = () => {
    const navigate = useNavigate()
    const {dispatch}=useContext(UserContext)
    // promises
    useEffect(()=>{
        fetch('/logout',{
            method:'get',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
            if(res.status !== 200){
                const error = new Error(res.error)
                throw error
            }else{
                localStorage.setItem('jwtToken','')
                dispatch({type:"USER",payload:false})
                navigate('/login',{replace:true})
            }
        }).catch((err)=>{
            console.log(err)
        })
    })
  return (
    <>
     {/* <h2>Logout</h2>  */}
    </>
  )
}

export default Logout
