import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../images/logob4New.png';
const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg background-theme navbar-light bg-light" >
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}>
                    <img src={logo} alt='logo' style={{height:'50px',width:'90px'}}/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={'/'}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link active" to={'/about'} >About</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link active" to={'/contact'} >Contact</NavLink>
                        </li>
                        {!localStorage.getItem('jwtToken')?
                            <>
                                <li className="nav-item">
                                <NavLink className="nav-link active" to={'/login'} >Login</NavLink>
                                </li>
                                <li className="nav-item ">
                                <NavLink className="nav-link active" to={'/signup'} >Register</NavLink>
                                </li>
                            </>:
                            <>
                                <li className="nav-item ">
                                <NavLink className="nav-link active" to={'/logout'} >Logout</NavLink>
                                </li>
                            </>
                        }
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar
