'use client'
import Header from '@/app/components/Header'
import { CardForm } from '@/app/forms/CardForm'
import { useEffect, useState } from 'react';

function Checkout() {

    const [listing, setListing] = useState<Listing>();

    useEffect(() => {
        const savedListingData = sessionStorage.getItem('listingData');
        if (savedListingData) {
            setListing(JSON.parse(savedListingData));
        }
        console.log(listing)
    }, []);

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
                        <span>{listing.nightlyFee}kr/Natt</span>
                        <span>Städavgift: {listing.cleaningFee}kr</span>
                        <span>Serviceavgift: Pris</span>
                        <div className="checkout-container-center-price-total">
                            <h4>Summa: Pris</h4>    
                        </div>    
                    </div> 
                    <div className="checkout-container-center-submit">
                        <button id='CheckoutBtn'>Boka</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout