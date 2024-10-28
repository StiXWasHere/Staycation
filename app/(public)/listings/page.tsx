'use client'
import React, { useEffect, useState } from 'react';
import { getListings } from '@/app/api/getListings'
import Searchbar from '@/app/components/Searchbar';
import Header from '@/app/components/Header';
import DateAndGuests from '@/app/components/DateAndGuests';
import Filter from '@/app/components/Filter';
import HouseCard from '@/app/components/HouseCard';

function page() {

  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
      async function fetchData() {
          const data = await getListings();
          setListings(data); // Update state with the latest data
      }

      fetchData(); // Call the async function to fetch data on mount
  }, []);

  return (
    <>
      <Header/>
      <div className="listing">
        <div className="listing-container">
          <div className="listing-container-top">
            <Searchbar/>
            <DateAndGuests/>
            <div className="listing-container-top-misc">
              <h4>Antal träffar: {listings.length} </h4>
              <Filter/>
            </div>
          </div>
          <div className="listing-container-center">
          {listings.map((listing, index) => (
            <HouseCard
              key={index}
              title={listing.title}
              bonus={listing.bonus}
              nightlyFee={listing.nightlyFee}
              location={listing.location}
              publicTransport={listing.publicTransport}
              imageUrl={listing.imageUrl}
              beds={listing.beds}
              rating={listing.rating}
              />
            ))}
          </div>
          <div className="listing-container-bottom">

          </div>
        </div>
      </div>
      
    
    </>
  )
}

export default page