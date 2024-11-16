'use client'
import Header from '@/app/components/Header'
import { CardForm } from '@/app/forms/CardForm'
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { clerkClient } from '@clerk/nextjs/server';

function Checkout() {

    const [listing, setListing] = useState<Listing>();
    const [error, setError] = useState('')
    const { isSignedIn, user, isLoaded } = useUser();
    const [ startDate, setStartDate] = useState('')
    const [ endDate, setEndDate] = useState('')

    useEffect(() => {
        const savedListingData = sessionStorage.getItem('listingData')
        const savedStartDate = sessionStorage.getItem('startDate')
        const savedEndDate = sessionStorage.getItem('endDate')
        if (savedListingData && savedStartDate && savedEndDate) {
            setListing(JSON.parse(savedListingData))
            setStartDate(savedStartDate)
            setEndDate(savedEndDate)
        }
        console.log(listing)
    }, []);

    const handleBooking = async () => {
        if (!isSignedIn) {
            setError('Logga in för att placera bokning');
            return
        } 
        
        if (user && listing) {
            try {
                const currentBookings = Array.isArray(user?.unsafeMetadata?.bookings)
                ? user?.unsafeMetadata?.bookings as Array<{ id: string; startDate: string; endDate: string}>
                : [];

                const isAlreadyBooked = currentBookings.some (
                    (booking) => booking.id === listing.id
                )

                if (isAlreadyBooked) {
                    setError("Du har redan bokat detta boende.");
                    return;
                }

                const newBooking = {
                    id: listing.id,
                    startDate,
                    endDate,
                    title: listing.title,
                }

                // Add the new listing ID to the bookings array
                const updatedBookings = [...currentBookings, newBooking];
        
                await user.update({
                    unsafeMetadata: {
                        bookings: updatedBookings,
                    },
                })
                setError('')
                console.log("Booking added:", listing.id);
                } catch (error) {
                    console.error("Failed to update bookings:", error);
                    setError("Kunde inte placera bokning. Vänligen försök igen.");
                }
        }
    }
    

    if (!listing) return <span>Loading...</span>;

  return (
    <>
        <Header/>
        <div className="checkout">
            <div className="checkout-container">
                <div className="checkout-container-top">
                    <img id='CheckoutImg' src={listing?.imageUrl} alt="Image" />
                    <h3>{listing.title}</h3>
                </div>
                <div className="checkout-container-center">
                    <div className="checkout-container-center-cardinfo">
                        <CardForm/>
                    </div>
                    <div className="checkout-container-center-price">
                        <span>Incheckning: {startDate}</span>
                        <span>Utcheckning: {endDate}</span>
                        <span>{listing.nightlyFee}kr/Natt</span>
                        <span>Städavgift: {listing.cleaningFee}kr</span>
                        <span>Serviceavgift: Pris</span>
                        <div className="checkout-container-center-price-total">
                            <h4>Summa: Pris</h4>    
                        </div>    
                    </div> 
                    <div className="checkout-container-center-submit">
                        <button id='CheckoutBtn' onClick={handleBooking}>Boka</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout