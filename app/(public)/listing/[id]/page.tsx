'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getListingById } from '@/app/api/getOneListing';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { DateRangePicker } from 'react-date-range';
import { addDays, differenceInDays, parse, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Base styles
import 'react-date-range/dist/theme/default.css'; // Theme styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ImagesModal from '@/app/components/ImagesModal';

function page() {
    //booking
    const [guestCount, setGuestCount] = useState(1)
    const router = useRouter();
    const { isSignedIn, user, isLoaded } = useUser()
    const [ nightCount, setNightCount] = useState<String>('')

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const increment = async () => {
        await new Promise((resolve) => {
            setGuestCount((prevCount) => {
                const newCount = prevCount + 1;
                resolve(newCount)
                sessionStorage.setItem('guestCount', newCount.toString())
                return newCount;
            })
        })
    }
    const decrement = async () => {
        await new Promise((resolve) => {
            setGuestCount((prevCount) => {
                const newCount = Math.max(prevCount - 1, 1)
                resolve(newCount)
                sessionStorage.setItem('guestCount', newCount.toString())
                return newCount;
            })
        }) 
    }
    const [listing, setListing] = useState<Listing>();

    useEffect(() => {
        async function fetchData() {
            const data = await getListingById(listingId);
            setListing(data); // Update state with the latest data
        }
        const storedNightCount = sessionStorage.getItem('nightCount');
        if (storedNightCount) {
            setNightCount(storedNightCount)
            console.log('Loaded night count from sessionStorage:', storedNightCount);
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
    //booking
    //date
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const storedNightCount = sessionStorage.getItem('nightCount')
        const storedGuestCount = sessionStorage.getItem('guestCount')
        if (storedNightCount) {
            console.log('Loaded night count from sessionStorage:', storedNightCount);
        }
        if (storedGuestCount) {
            setGuestCount(Number(storedGuestCount))
            console.log('guest count updated with',storedGuestCount)
        }
    }, []);

    const [selectionRange, setSelectionRange] = useState(() => {
        const storedStartDate = sessionStorage.getItem('startDate');
        const storedEndDate = sessionStorage.getItem('endDate');

        // Check if the stored dates exist, otherwise use default dates
        const defaultStartDate = new Date();
        const defaultEndDate = addDays(defaultStartDate, 7);

        console.log(storedStartDate, storedEndDate, 'dates')

        return {
            startDate: storedStartDate ? parseISO(storedStartDate) : defaultStartDate,
            endDate: storedEndDate ? parseISO(storedEndDate) : defaultEndDate,
            key: 'selection',
        };
    });

    const startDate = selectionRange.startDate.toLocaleDateString();
    const endDate = selectionRange.endDate.toLocaleDateString();

    const handleSelect = (ranges: any) => {
        const updatedRange = ranges.selection;
        setSelectionRange(updatedRange);
        
        // Only update sessionStorage when both start and end dates are set
        if (updatedRange.startDate && updatedRange.endDate) {
            const nightsCount = differenceInDays(updatedRange.endDate, updatedRange.startDate);
            if (nightsCount) {
                sessionStorage.setItem('nightCount', nightsCount.toString());
                sessionStorage.setItem('endDate', updatedRange.endDate.toLocaleDateString());
                sessionStorage.setItem('startDate', updatedRange.startDate.toLocaleDateString());
                console.log(nightsCount, 'saved to storage.', startDate, 'to', endDate);
                setNightCount(nightsCount.toString())
            }
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };
    //date



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
                    <div className="detail-container-main-comments">
                        <h4>Kommentarer</h4>
                        {listing.comments.map((comment) => (
                            <div className='detail-container-main-comments-item'>
                                <div className="detail-container-main-comments-item-left">
                                    <div className="detail-container-main-comments-item-left-name">
                                        <span id='Commenter'>{comment.commenter}</span>
                                    </div>
                                    <div className="detail-container-main-comments-item-left-text">
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                                <div className="detail-container-main-comments-item-right">
                                    <span>{comment.rating}</span>
                                    <FontAwesomeIcon icon={faStar}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="detail-container-addon">
                    <div className="detail-container-addon-top">
                        <div className="detail-container-addon-top-images">
                            <button id='ShowImgBtn' onClick={openModal}>se alla bilder</button>
                            <ImagesModal isOpen={isModalOpen} onClose={closeModal}>
                            {listing.additionalImages.map((image) => (
                                    <div className="images-modal-container-center">
                                        <img id='DetailImgAdditional' src={image.imageUrl} alt="Image" />
                                    </div>
                                ))}
                            </ImagesModal>
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
                        <div className="detail-sidebar-container-top-buttons">
                            <button id='DetailDateBtn' onClick={toggleDropdown}>
                                {selectionRange.startDate.toLocaleDateString()}
                            </button>
                            <span>till</span>
                            <button id='DetailDateBtn' onClick={toggleDropdown}>
                                {selectionRange.endDate.toLocaleDateString()}
                            </button>
                                {isDropdownVisible && (
                                <div className="detail-sidebar-container-top-buttons-dropdown">
                                <DateRangePicker
                                    ranges={[selectionRange]}
                                    onChange={handleSelect}
                                    minDate={new Date()}
                                    rangeColors={['#3d91ff']}
                                    showMonthAndYearPickers={false}   
                                />
                                </div>                            
                                )}                                                        
                        </div>
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
                            <span>Antal nätter: {nightCount}</span>
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