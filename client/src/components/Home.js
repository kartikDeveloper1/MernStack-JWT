import React from 'react'
import log from '../images/logo192.png'
const Home = () => {
  return (
    <>
      <section className='home-page d-flex justify-content-center align-items-center'>
            <div className="container text-center">
              <p className=''>WELCOME</p>
              <img className='App-logo mb-2' src={log} style={{height:"50px"}} alt="" />
              <h2>"<b>B</b>Creative - Creativity is just connecting things !! " </h2>
            </div>
      </section>
    </>
  )
}

export default Home
