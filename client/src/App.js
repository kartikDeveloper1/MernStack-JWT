import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import { Routes, Route } from "react-router-dom"
import Errorpage from './components/Errorpage'
import '../src/App.css'

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route exact path={'/'} element={<Home/>} />
        <Route path={'/about'} element={<About/>} />
        <Route path={'/contact'} element={<Contact/>} />
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/signup'} element={<Signup/>} />
        <Route path={'*'} element={<Errorpage/>} />
      </Routes>
    </>
  )
}

export default App
