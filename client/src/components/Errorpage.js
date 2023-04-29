import React from 'react'
import { NavLink } from 'react-router-dom'

function Errorpage() {
    return (
        <>
            <section className="not-found " id='not-found'>
                <div className="container text-center">
                    <h2 className='not-found-404'>404</h2>
                </div>
                <h2 className='not-found-text1'>We are sorry, page not found ! </h2>
                <p className='not-found-text1'>
                    The page you're looking for might have been removed or temporarily unavailable.
                </p>
                <NavLink  to={'/'}>Back To Homepage</NavLink>
            </section>
        </>
    )
}

export default Errorpage
