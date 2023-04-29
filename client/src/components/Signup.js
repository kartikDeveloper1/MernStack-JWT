import React,{useState} from 'react'
import signpic from '../images/newsign.avif'
import { NavLink,useNavigate } from 'react-router-dom'
const Signup = () => {
  const [user,setUser] = useState({name:"",email:"",phone:"",work:"",password:"",cpassword:""})
  const navigate = useNavigate()
  const handleInput=(e)=>{
    setUser({
      ...user,[e.target.name]:e.target.value
    })
  }
  const register=async(e)=>{
    e.preventDefault()
    const {name,email,phone,work,password,cpassword} = user

    const res=await fetch('/register',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,work,password,cpassword
      })
    })

    const data= await res.json()
    if(data.success){
      window.alert('Registration successfully')
      navigate('/login')
    }else{
      window.alert('Invalid Registration')
    }
  }
  return (
    <>
      <section className='signup text-center'>
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <form method='post'>
                <div className="row">
                  <div className="col-6">
                  <h2 ><b>Sign up</b></h2>
                      <div className="form-group input-field">
                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name "></i></label>
                        <input type="text" name='name' id='name' value={user.name} onChange={handleInput} autoComplete='off' className="form-control" placeholder="Your name" aria-label="Your name" />
                      </div>
                      <div className="form-group input-field">
                        <label htmlFor="email"><i className="zmdi zmdi-email material-icons-name "></i></label>
                        <input type="text" name='email' id='email' value={user.email} onChange={handleInput} autoComplete='off' className="form-control" placeholder="Your email" aria-label="Your email" />
                      </div>
                      <div className="form-group input-field">
                        <label htmlFor="phone"><i className="zmdi zmdi-phone material-icons-name "></i></label>
                        <input type="number" name='phone' id='phone' value={user.phone} onChange={handleInput} autoComplete='off' className="form-control" placeholder="Your phone number" aria-label="Your name" />
                      </div>
                      <div className="form-group input-field">
                        <label htmlFor="work"><i className="zmdi zmdi-slideshow material-icons-name "></i></label>
                        <input type="text" name='work' id='work' value={user.work} onChange={handleInput} autoComplete='off' className="form-control" placeholder="Your profession" aria-label="Your name" />
                      </div>
                      <div className="form-group input-field">
                        <label htmlFor="password"><i className="zmdi zmdi-lock material-icons-name "></i></label>
                        <input type="text" name='password' id='password' value={user.password} onChange={handleInput} autoComplete='off' className="form-control" placeholder="Your password" aria-label="Your name" />
                      </div>
                      <div className="form-group input-field">
                        <label htmlFor="cpassword"><i className="zmdi zmdi-lock material-icons-name "></i></label>
                        <input type="text" name='cpassword' id='cpassword' value={user.cpassword} onChange={handleInput} autoComplete='off' className="form-control" placeholder="confirm your password" aria-label="Your name" />
                      </div>
                      <div className="form-group mt-4">
                        <input className='btn btn-primary form-control' onClick={register} value="Register" type="submit" name='signup' id='signup' />
                      </div>
                  </div>
                  <div className="signup-image col-6 mt-4">
                      <figure>
                        <img src={signpic} alt="signup" className='signup-image' />
                        <NavLink to={'/login'}><h6>Already Registered ?</h6></NavLink>
                      </figure>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
