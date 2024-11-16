'use client'
import React from 'react'
import { useState, useEffect} from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import { getListings } from '@/app/api/getListings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function page() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true)
    const [userListings, setUserListings] = useState<Array<{id: string; startDate: string; endDate: string; title: string;}>>()
    const router = useRouter()
    const { isSignedIn, user, isLoaded } = useUser()

    useEffect(() => {
        async function fetchFilteredListings() {
            if (user?.unsafeMetadata?.bookings) {
                const bookings = user.unsafeMetadata.bookings as Array<{ id: string; startDate: string; endDate: string; title: string;}>;
                setUserListings(bookings);
            }
        }
        fetchFilteredListings();
    }, [user]);
    

    if(!isLoaded) return (
        <span>Loading...</span>
    ) 
    else {
        if (!isSignedIn) {
            router.push('/')
        }
    }

  return (
    <>
        <Header/>
        <div className="user">
            <div className="user-container">
                <div className="user-container-top">
                    <UserButton/>
                    <h4>Konfigurera profil</h4>
                </div>
                <div className="user-container-center">
                    <h3>Dina bokningar</h3>
                    <div className="user-container-center-bookings">
                        {userListings?.map((listing) => 
                            <div className='user-container-center-bookings-listing'>
                                <div className="user-container-center-bookings-listing-left">
                                    <span>{listing.title}</span>
                                </div>
                                <div className="user-container-center-bookings-listing-right">
                                    <span>{listing.startDate} till {listing.endDate}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default page