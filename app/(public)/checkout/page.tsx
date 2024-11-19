'use client'
import Header from '@/app/components/Header'
import { CardForm } from '@/app/forms/CardForm'
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { clerkClient } from '@clerk/nextjs/server';
import CheckoutReturn from '@/app/components/CheckoutReturn';
import Link from 'next/link';

function Checkout() {

    const [listing, setListing] = useState<Listing>();
    const [error, setError] = useState<string>('')
    const { isSignedIn, user, isLoaded } = useUser();
    const [ startDate, setStartDate] = useState('')
    const [ endDate, setEndDate] = useState('')
    const [nightCount, setNightCount] = useState<string>('')
    const [isComplete, setIsComplete] = useState<boolean>(false)

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        ccv: "",
    })

    const isFormValid = () => {
        const { cardNumber, expiryMonth, expiryYear, ccv } = cardDetails
        console.log(cardNumber, expiryMonth, expiryYear, ccv)
        return (
            cardNumber.length === 16 &&
            expiryMonth &&
            expiryYear &&
            ccv.length === 3
        )
    }

    useEffect(() => {
        const savedListingData = sessionStorage.getItem('listingData')
        const savedStartDate = sessionStorage.getItem('startDate')
        const savedEndDate = sessionStorage.getItem('endDate')
        const storedNightCount = sessionStorage.getItem('nightCount')
        if (savedListingData && savedStartDate && savedEndDate && storedNightCount) {
            setListing(JSON.parse(savedListingData))
            setStartDate(savedStartDate)
            setEndDate(savedEndDate)
            setNightCount(storedNightCount)
        }
        console.log(listing)
    }, []);

    const handleBooking = async () => {
        if (!isSignedIn) {
            setError('Logga in för att placera bokning');
            return
        }
        if(isFormValid()) {
            console.log('Form filled out correctly')
            setError('')
        } else {
            setError('Kontrollera kortuppgifter')
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
                setIsComplete(true)
                console.log("Booking added:", listing.id);
                } catch (error) {
                    console.error("Failed to update bookings:", error);
                    setError("Kunde inte placera bokning. Vänligen försök igen.");
                }
        }
    }
    const bookingCost = () => {
        const nights = parseInt(nightCount)
        if(!listing) return
        else {
            const cost = listing.nightlyFee
            const total = nights * cost
            return total
        } 
    }
    const serviceFee = () => {
        const total = bookingCost()
        if (!total) return
        else {
            const percentage = 10
            const serviceFee = (percentage/100) * total
            return serviceFee
        }
    }
    const totalSum = () => {
        const booking = bookingCost()
        if(!booking) return
        const fee = serviceFee()
        if(!fee) return
        if(!listing) return
        const cleaning = listing.cleaningFee

        const sum = booking + fee + cleaning
        return sum
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
                        <CardForm setCardDetails={setCardDetails}/>
                    </div>
                    <div className="checkout-container-center-price">
                        <span>Incheckning: {startDate}</span>
                        <span>Utcheckning: {endDate}</span>
                        <span>Bokning: {bookingCost()}kr</span>
                        <span>Städavgift: {listing.cleaningFee}kr</span>
                        <span>Serviceavgift: {serviceFee()}kr</span>
                        <div className="checkout-container-center-price-total">
                            <h4>Summa: {totalSum()}kr</h4>    
                        </div>
                        <span>{error}</span>    
                    </div> 
                    <div className="checkout-container-center-submit">
                        <button id='CheckoutBtn' onClick={handleBooking}>Boka</button>
                    </div>
                </div>
                <CheckoutReturn isOpen={isComplete}>
                    <div className="checkout-return-container-center">
                        <h3>Bokning slutförd! Du kan hitta dina bokningar på din profil.</h3>
                        <Link href={'/'}>
                        <button id='CheckoutReturnBtn'>Tillbaka till startsidan</button>
                        </Link>
                    </div>
                </CheckoutReturn>
            </div>
        </div>
    </>
  )
}

export default Checkout