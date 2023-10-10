import React from 'react'
import './landingPage.css'
const LandingPage = () => {
  const handleClick = ()=>{
    window.location.href = '/signup'
  }
  return (
    <>
    <div className="landing">
    <div className="landingPage">
        <div className="logo">
          <div className="image">
          <img src="/logo.svg"/>
          </div>

        </div>
    </div>
    <div className="buton">
        <button onClick={handleClick}>Get Started</button>
    </div>
    </div>

    </>
  )
}

export default LandingPage