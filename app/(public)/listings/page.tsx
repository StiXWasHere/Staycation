'use client'
import React, { useEffect, useState } from 'react';
import { getListings } from '@/app/api/getListings'
import Searchbar from '@/app/components/Searchbar';
import Header from '@/app/components/Header';
import DateAndGuests from '@/app/components/DateAndGuests';
import Filter from '@/app/components/Filter';
import HouseCard from '@/app/components/HouseCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function page() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true)

  // Filter states
  const [sortOrder, setSortOrder] = useState<string | null>(null); // e.g., "LowPrice", "HighPrice", "PostDate"
  const [adaptations, setAdaptations] = useState<{ wheelchair: boolean; deaf: boolean; blind: boolean; child: boolean }>({
    wheelchair: false,
    deaf: false,
    blind: false,
    child: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  // Fetch listings
  useEffect(() => {
    async function fetchData() {
      const allListings = await getListings();
      setListings(allListings);
      applyFilters(allListings);
      setLoading(false)
    }
    fetchData();
  }, [query]);

  // Apply filters
  useEffect(() => {
    applyFilters(listings)
  }, [sortOrder, adaptations]);

  // Function to apply filters and sorting
  const applyFilters = (listings: Listing[]) => {
    let updatedListings = [...listings];

    // Filter by search query
    if (query) {
      updatedListings = updatedListings.filter((listing) =>
        listing.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by adaptations
    updatedListings = updatedListings.filter((listing) => {
      return (
        (!adaptations.wheelchair || listing.adaptations.wheelchair === true) &&
        (!adaptations.deaf || listing.adaptations.deaf === true) &&
        (!adaptations.blind || listing.adaptations.blind === true) &&
        (!adaptations.child || listing.adaptations.child === true)
      );
    });

    // Sort by selected order
    if (sortOrder === 'LowPrice') {
      updatedListings = updatedListings.sort((a, b) => a.nightlyFee - b.nightlyFee);
    } else if (sortOrder === 'HighPrice') {
      updatedListings = updatedListings.sort((a, b) => b.nightlyFee - a.nightlyFee);
    } else if (sortOrder === 'PostDate') {
      updatedListings = updatedListings.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }

    setFilteredListings(updatedListings);
  };

  // Event handlers for filter options
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => setSortOrder(e.target.id);

  const handleAdaptationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdaptations((prev) => ({
      ...prev,
      [e.target.id]: e.target.checked,
    }));
  };

  const handleCardClick = (id: string) => {
    router.push(`/listing/${id}`);
  };

  return (
    <>
      <Header/>
      <div className="listing">
        <div className="listing-container">
          <div className="listing-container-top">
            <Searchbar/>
            <DateAndGuests/>
            <div className="listing-container-top-misc">
              {loading ? (
                <h4>Hämtar träffar...</h4>
              ): (
                <h4>Antal träffar: {filteredListings.length}</h4>
              )}
              <button id='FilterBtn' onClick={openFilter}>Filtrera</button>
              <Filter isOpen={isFilterOpen} onClose={closeFilter}>
              <form action="" id='FilterForm'>
                <div className="filter-container-top">

                </div>
                <div className="filter-container-center">
                  <label htmlFor="Sort">Sortera efter</label>
                  <ul id='FilterList'>
                    <div id='FilterListItem'>
                      <input type="radio" id='LowPrice' name="sortOrder" checked={sortOrder === 'LowPrice'} onChange={handleSortOrderChange}/>
                      <label htmlFor="LowPrice">Lägst pris först</label>
                    </div>
                    <div id='FilterListItem'>
                      <input type="radio" id='HighPrice' name="sortOrder" checked={sortOrder === 'HighPrice'} onChange={handleSortOrderChange}/>
                      <label htmlFor="HighPrice">Högst pris först</label>
                    </div>
                    <div id='FilterListItem'>
                      <input type="radio" id='PostDate' name="sortOrder" checked={sortOrder === 'PostDate'} onChange={handleSortOrderChange}/>
                      <label htmlFor="PostDate">Nyast först</label>
                    </div>
                  </ul>
                  <label htmlFor="FilterList">Anpassningar</label>
                  <ul id='FilterList'>
                    <div id='FilterListItem'>
                      <input type="checkbox" id='wheelchair' checked={adaptations.wheelchair} onChange={handleAdaptationChange}/>
                      <label htmlFor="wheelchair">Rullstol</label>
                    </div>
                    <div id='FilterListItem'>
                      <input type="checkbox" id='blind' checked={adaptations.blind} onChange={handleAdaptationChange}/>
                      <label htmlFor="blind">Nedsatt syn</label>
                    </div>
                    <div id='FilterListItem'>
                      <input type="checkbox" id='deaf' checked={adaptations.deaf} onChange={handleAdaptationChange}/>
                      <label htmlFor="deaf">Nedsatt hörsel</label>
                    </div>
                    <div id='FilterListItem'>
                      <input type="checkbox" id='child' checked={adaptations.child} onChange={handleAdaptationChange}/>
                      <label htmlFor="child">Yngre barn</label>
                    </div>
                  </ul>
                </div>
                <div className="filter-container-bottom">
                  <button id='FilterSubmitBtn' type='button' onClick={() => {applyFilters(listings); closeFilter()}}>Filtrera</button>
                </div>
              </form>
              </Filter>
            </div>
          </div>
          <div className="listing-container-center">
          {filteredListings.map((listing) => (
              <div key={listing.id} onClick={() => handleCardClick(listing.id)} style={{ cursor: 'pointer' }}>
                <HouseCard
                  title={listing.title}
                  bonus={listing.bonus}
                  nightlyFee={listing.nightlyFee}
                  location={listing.location}
                  publicTransport={listing.publicTransport}
                  imageUrl={listing.imageUrl}
                  beds={listing.beds}
                  rating={listing.rating}
                  adaptations={listing.adaptations}
                />
              </div>
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