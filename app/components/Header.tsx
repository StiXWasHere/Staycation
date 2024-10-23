import React from 'react'

function Header() {
  return (
    <div className='header'>
        <div className="header-container">
            <div className="header-container-left">
                <h1 id="HeaderLogo">Staycation</h1>
            </div>
            <div className="header-container-right">
                <button id="LoginBtn">Log in</button>
            </div>
        </div>

    </div>
  )
}

export default Header