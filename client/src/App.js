import React, { createContext, useEffect, useReducer } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import { Routes, Route } from "react-router-dom"
import Errorpage from './components/Errorpage'
import '../src/App.css'
import Logout from './components/Logout'
import { initialState ,reducer} from '../src/reducer/UseReducer'



//1: Context API
export const UserContext = createContext()

function App() {

  useEffect(() => {
    fetch("https://bcreative-server1.onrender.com")
      .then((res) => res.json());
  },[]);

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
      <Routes>
        <Route exact path={'/'} element={<Home/>} />
        <Route path={'/about'} element={<About/>} />
        <Route path={'/contact'} element={<Contact/>} />
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route path={'/logout'} element={<Logout/>} />
        <Route path={'*'} element={<Errorpage/>} />
      </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
