'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Searchbar = () => {

  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = () => {
    router.push(`/listings?query=${query}`)
  }

  return (
    <div className='searchbar'>
        <form className='searchbar-form' onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
            <div className="searchbar-form-bar">
                <input 
                  type="text" 
                  id='SearchBar'
                  value={query}
                  onChange={handleInputChange}
                  placeholder='Sök...'
                />
            </div>
            <div className="searchbar-form-button">
                <button id='SearchbarBtn' type='submit'>Sök</button>
            </div>
        </form>
    </div>
  )
}

export default Searchbar
