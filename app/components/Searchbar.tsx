import React from 'react'

function Searchbar() {
  return (
    <div className='searchbar'>
        <form className='searchbar-form' action="">
            <div className="searchbar-form-bar">
                <input id='SearchBar' type="text" placeholder='Sök...'/>
            </div>
            <div className="searchbar-form-button">
                <button id='SearchbarBtn'>Sök</button>
            </div>
        </form>
    </div>
  )
}

export default Searchbar