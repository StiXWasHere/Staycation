'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getListingById } from '@/app/api/getOneListing';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function page() {
    const [guestCount, setGuestCount] = useState(1)
    const router = useRouter();
    const { isSignedIn, user, isLoaded } = useUser()

    const increment = () => setGuestCount(prevCount => prevCount + 1)
    const decrement = () => setGuestCount(prevCount => Math.max(prevCount - 1, 1))
    const [listing, setListing] = useState<Listing>();

    useEffect(() => {
        async function fetchData() {
            const data = await getListingById(listingId);
            setListing(data); // Update state with the latest data
        }
  
        fetchData(); // Call the async function to fetch data on mount
    }, []);

    const url = usePathname()
    const parts = url.split("/")
    const listingId = parts[parts.length - 1]

    const handleBookingRequest = () => {
        if (!isSignedIn) {
            router.push('/sign-in')
        } else {
            if (listing) {
                const listingData = {
                    id: listing.id,
                    imageUrl: listing.imageUrl,
                    title: listing.title,
                    nightlyFee: listing.nightlyFee,
                    cleaningFee: listing.cleaningFee
                };
                sessionStorage.setItem('listingData', JSON.stringify(listingData));
                console.log(listingData)
                router.push('/checkout')
            } else return
            }
        }



    if (!listing) {
        return (
            <span>listing not found</span>
        )
    }

  return (
    <>
        <Header/>
        <div className="detail">
            <div className="detail-container">
                <div className="detail-container-main">
                    <div className="detail-container-main-img">
                        <img id='DetailImage' src={listing?.imageUrl} alt="image" />
                    </div>
                    <div className="detail-container-main-info">
                        <div className="detail-container-main-info-top">
                            <div className="detail-container-main-info-top-left">
                                <span>{listing?.bonus}</span>
                                <span>{listing.location}</span>
                            </div>
                            <div className="detail-container-main-info-top-right">
                                <h3>{listing.title}</h3>
                            </div>
                        </div>
                        <div className="detail-container-main-info-center">
                            <div className="detail-container-main-info-center-host">
                                <h4>{listing.lister}</h4>
                            </div>
                            <div className="detail-container-main-info-center-description">
                                <p>{listing.description}</p>
                            </div>
                        </div>
                        <div className="detail-container-main-info-bottom">
                            <button id='ContactBtn'>Kontakta värd</button>
                        </div>
                    </div>
                    <div className="detail-container-main-map">

                    </div>
                    <div className="detail-container-main-comments">

                    </div>
                </div>
                <div className="detail-container-addon">
                    <div className="detail-container-addon-top">
                        <div className="detail-container-addon-top-images">
                            <button id='ShowImgBtn'>se alla bilder</button>
                        </div>
                        <div className="detail-container-addon-top-info">
                            <div className="detail-container-addon-top-info-left">
                                <span>Buss: {listing.publicTransport}m</span>
                            </div>
                            <div className="detail-container-addon-top-info-right">
                                <span>{listing.nightlyFee}kr/natt</span>
                            </div>
                        </div>
                        <div className="detail-container-addon-top-adapt">
                            <button id='AdaptBtn'>Visa tillgänglighet</button>
                        </div>
                    </div>
                    <div className="detail-container-addon-center">
                        <div className="detail-container-addon-center-included">
                            <div className="detail-container-addon-center-included-top">
                                <h4>Vad som ingår</h4>
                            </div>
                            <div className="detail-container-addon-center-included-center">
                                <span>Wifi</span>
                                <span>TV</span>
                                <span>Toalettartiklar</span>
                            </div>
                            <div className="detail-container-addon-center-included-bottom">
                                <span>{listing?.beds} Sovrum</span>
                                <span>2 Badrum - Dusch och badkar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-sidebar">
                <div className="detail-sidebar-container">
                    <div className="detail-sidebar-container-top">
                        <h3>Redigera bokning</h3>
                        <span>Ändra datum</span>
                        <button id='DetailDateBtn'>11/10-16/10</button>
                        <span>Ändra antal gäster</span>
                        <div className="detail-sidebar-container-top-count">
                            <button id='DetailGuestButton' onClick={decrement}>-</button>
                            <span id='DetailCount'>{guestCount}</span>
                            <button id='DetailGuestButton' onClick={increment}>+</button> 
                        </div>
                    </div>
                    <div className="detail-sidebar-container-center">
                        <h3>Bokningsdetaljer</h3>
                        <div className="detail-sidebar-container-center-info">
                            <span>{listing.title}</span>
                            <span>{listing.nightlyFee}kr/Natt</span>
                            <span>Antal nätter: 5</span>
                        </div>
                        <div className="detail-sidebar-container-center-pricing">
                            <h4>Pris</h4>
                            <div className="detail-sidebar-container-center-pricing-container">
                                <div className="detail-sidebar-container-center-pricing-container-breakdown">
                                    <span>Bokning: totala priset</span>
                                    <span>Städavgift: {listing.cleaningFee}kr</span>
                                    <span>Service avgift: % av priset</span>
                                </div>
                                <div className="detail-sidebar-container-center-pricing-container-total">
                                    <h4>Totalt:</h4>
                                    <span>Totala summan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-sidebar-container-bottom">
                        <button id='DetailBookBtn' onClick={handleBookingRequest}>Boka</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default page