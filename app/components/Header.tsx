'use client'
import React from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {

  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className='header'>
        <div className="header-container">
            <div className="header-container-left">
              <Link href={'/'}>
                <h1 id="HeaderLogo">Staycation</h1>
              </Link>
            </div>
            <div className="header-container-right">
                {isSignedIn ? (
                  <div className='header-container-right-user'>
                    <span>Hej {user.username}</span>
                    <UserButton/>
                    <Link href={'/user'}>
                      <button id="UserBtn">Profil</button>
                    </Link>
                  </div>
                ) : (
                  <div className='header-container-right-user'>
                    <Link href={'/sign-in'}>
                      <button id='UserBtn'>Logga in</button>
                    </Link>
                    <Link href={'/sign-up'}>
                      <button id='UserBtn'>Skapa konto</button>
                    </Link>                    
                  </div>
                )}
            </div>
        </div>

    </div>
  )
}

export default Header