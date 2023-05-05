import React,{useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'
import loginpic from '../images/login.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {
  const {dispatch}=useContext(UserContext)
  const [email,setEmail] = useState('')
  const [password,setPassword]= useState('')
  const navigate=useNavigate()
  const loginUser=async (e)=>{
    e.preventDefault()
    const res =await fetch('/login',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })

    const data = await res.json()

    if(data.success){
      localStorage.setItem('jwtToken',data.AuthToken)
      dispatch({type:'USER',payload:true})
      window.alert('Login successfull')
      navigate('/')
    }else{
      window.alert('Invalid Credentials')
    }

  }
  return (
    <>
    <section className='login'>
      <div className="container mt-5">
          <div className="login-content">
            <div className="login-form">
              <div className="row">
                <div className="col-6">
                <div className="signin-image text-center col-6 mt-4">
                      <figure>
                        <img src={loginpic} alt="login" className='signin-image' />
                        <NavLink to={'/signup'}><h6>Create an Account</h6></NavLink>
                      </figure>
                  </div>
                </div>
                <div className="col-6">
                  <form method='post'>
                    <h2 className='text-center' ><b>Sign in</b></h2>
                    
                    <div className="form-group input-field">
                      <label htmlFor="email"><i className="zmdi zmdi-email material-icons-name "></i></label>
                      <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} name='email' id='email' autoComplete='off' className="form-control" placeholder="Your email" aria-label="Your email" />
                    </div>
                    <div className="form-group input-field">
                        <label htmlFor="password"><i className="zmdi zmdi-lock material-icons-name "></i></label>
                        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} name='password' id='password'  autoComplete='off' className="form-control" placeholder="Your password" aria-label="Your name" />
                      </div>
                    <div className="form-group mt-4">
                      <input className='btn btn-primary form-control' onClick={loginUser}  value="Login" type="submit" name='signin' id='signin' />
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

export default Login
