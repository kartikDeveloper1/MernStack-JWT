import React, { createContext, useReducer } from 'react'
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

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
      <Routes>
        <Route exact path={'/'} element={<Home/>} />
        <Route exact path={'/about'} element={<About/>} />
        <Route exact path={'/contact'} element={<Contact/>} />
        <Route exact path={'/login'} element={<Login/>} />
        <Route exact path={'/signup'} element={<Signup/>} />
        <Route exact path={'/logout'} element={<Logout/>} />
        <Route path={'*'} element={<Errorpage/>} />
      </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
