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
import { faStar, faBus, faWheelchair, faDeaf, faEyeSlash, faChild } from "@fortawesome/free-solid-svg-icons";
import ImagesModal from '@/app/components/ImagesModal';
import AdaptModal from '@/app/components/AdaptModal';
import { CheckListingStatus } from '@/app/status/CheckListingStatus';
import { getUsersData } from '@/app/api/GetUsersData';

type IncludedIcons = {
    included: Included
}

function page() {
    
    const router = useRouter()

    //booking
    const [guestCount, setGuestCount] = useState(1)
    const [ nightCount, setNightCount] = useState<string>('')

    const { isSignedIn, user, isLoaded } = useUser()
    const [listing, setListing] = useState<Listing>()
    const [listingData, setListingData] = useState<userData[]>([])
    const [error, setError] = useState<string>('')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isAdaptOpen, setIsAdaptOpen] = useState(false)
    const openAdapt = () => setIsAdaptOpen(true)
    const closeAdapt = () => setIsAdaptOpen(false)

    const increment = async () => {
        await new Promise((resolve) => {
            setGuestCount((prevCount) => {
                const newCount = prevCount + 1
                resolve(newCount)
                sessionStorage.setItem('guestCount', newCount.toString())
                return newCount
            })
        })
    }
    const decrement = async () => {
        await new Promise((resolve) => {
            setGuestCount((prevCount) => {
                const newCount = Math.max(prevCount - 1, 1)
                resolve(newCount)
                sessionStorage.setItem('guestCount', newCount.toString())
                return newCount
            })
        }) 
    }
    
    useEffect(() => {
        async function fetchData() {
            const data = await getListingById(listingId)
            setListing(data)
        }
        const storedNightCount = sessionStorage.getItem('nightCount')
        if (storedNightCount) {
            setNightCount(storedNightCount)
            console.log('Loaded night count from sessionStorage:', storedNightCount)
        }
        fetchData()
    }, []);

    const url = usePathname()
    const parts = url.split("/")
    const listingId = parts[parts.length - 1]

    const dateAvailability = (start: Date, end: Date, unavailable: Date[]) => {
        return unavailable.some(
            (date) => 
                date >= start && date <= end
        )
    }
    

    const handleBookingRequest = () => {

        const { startDate, endDate } = selectionRange
        if(dateAvailability(startDate, endDate, unavailableDates)) {
            setError('Datumen du valt är inte tillgängliga. Vänligen välj nya datum.')
            return
        }
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
                }
                sessionStorage.setItem('listingData', JSON.stringify(listingData))
                console.log(listingData)
                setError('')
                router.push('/checkout')
            } else return
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
    //booking
    //date
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    useEffect(() => {
        const storedNightCount = sessionStorage.getItem('nightCount')
        const storedGuestCount = sessionStorage.getItem('guestCount')
        if (storedNightCount) {
            console.log('Loaded night count from sessionStorage:', storedNightCount)
        }
        if (storedGuestCount) {
            setGuestCount(Number(storedGuestCount))
            console.log('guest count updated with',storedGuestCount)
        }

        const fetchUnavailableDates = async () => {
            const {unavailableDates} = await CheckListingStatus(listingId)
            setUnavailableDates(unavailableDates)
        }
        fetchUnavailableDates()
    }, [])

    const [selectionRange, setSelectionRange] = useState(() => {
        const storedStartDate = sessionStorage.getItem('startDate')
        const storedEndDate = sessionStorage.getItem('endDate')


        const defaultStartDate = new Date()
        const defaultEndDate = addDays(defaultStartDate, 7)
        console.log(storedStartDate, storedEndDate, 'dates')

        

        return {
            startDate: storedStartDate ? parseISO(storedStartDate) : defaultStartDate,
            endDate: storedEndDate ? parseISO(storedEndDate) : defaultEndDate,
            key: 'selection',
        }
    })
    

    const startDate = selectionRange.startDate.toLocaleDateString()
    const endDate = selectionRange.endDate.toLocaleDateString()

    const handleSelect = (ranges: any) => {
        const updatedRange = ranges.selection
        setSelectionRange(updatedRange)
        
        if (updatedRange.startDate && updatedRange.endDate) {
            const nightsCount = differenceInDays(updatedRange.endDate, updatedRange.startDate)
            if (nightsCount) {
                sessionStorage.setItem('nightCount', nightsCount.toString())
                sessionStorage.setItem('endDate', updatedRange.endDate.toLocaleDateString())
                sessionStorage.setItem('startDate', updatedRange.startDate.toLocaleDateString())
                console.log(nightsCount, 'saved to storage.', startDate, 'to', endDate)
                setNightCount(nightsCount.toString())
            }
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev)   
    }
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
                        <button id='ShowImgBtn' onClick={openModal}>se alla bilder</button>
                            <ImagesModal isOpen={isModalOpen} onClose={closeModal}>
                            {listing.additionalImages.map((image) => (
                                    <div className="images-modal-container-center">
                                        <img id='DetailImgAdditional' src={image.imageUrl} alt="Image" />
                                    </div>
                                ))}
                            </ImagesModal>
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
                            <a href="mailto: fabbe.nilsson123123@gmail.com">
                                <button id='ContactBtn'>Kontakta värd</button>
                            </a>
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
                        <div className="detail-container-addon-top-info">
                            <div className="detail-container-addon-top-info-left">
                                <span><FontAwesomeIcon icon={faBus}/>{listing.publicTransport}m</span>
                            </div>
                            <div className="detail-container-addon-top-info-right">
                                <span>{listing.nightlyFee}kr/natt</span>
                            </div>
                        </div>
                        <div className="detail-container-addon-top-adapt">
                            <button id='AdaptBtn' onClick={openAdapt}>Visa tillgänglighet</button>
                            <AdaptModal isOpen={isAdaptOpen} onClose={closeAdapt}>
                                <div className='adapt-modal-container-center'>
                                    {typeof listing.adaptationDetails?.blind === 'string' && (
                                        <p>
                                            <FontAwesomeIcon icon={faEyeSlash} /> {listing.adaptationDetails.blind}
                                        </p>
                                    )}
                                    {typeof listing.adaptationDetails?.deaf === 'string' && (
                                        <p>
                                            <FontAwesomeIcon icon={faDeaf} /> {listing.adaptationDetails.deaf}
                                        </p>
                                    )}
                                    {typeof listing.adaptationDetails?.wheelchair === 'string' && (
                                        <p>
                                            <FontAwesomeIcon icon={faWheelchair} /> {listing.adaptationDetails.wheelchair}
                                        </p>
                                    )}
                                    {typeof listing.adaptationDetails?.child === 'string' && (
                                        <p>
                                            <FontAwesomeIcon icon={faChild} /> {listing.adaptationDetails.child}
                                        </p>
                                    )}
                                </div>
                            </AdaptModal>
                        </div>
                    </div>
                    <div className="detail-container-addon-center">
                        <div className="detail-container-addon-center-included">
                            <div className="detail-container-addon-center-included-top">
                                <h4>Vad som ingår</h4>
                            </div>
                            <div className="detail-container-addon-center-included-center">
                                {listing.included.wifi && <span>·Wifi</span>}
                                {listing.included.TV && <span>·TV</span>}
                                {listing.included.Kitchen && <span>·Kök</span>}
                                {listing.included.Parking && <span>·Parkering</span>}
                                {listing.included.Laundry && <span>·Tvättmaskin</span>}
                                {listing.included.Pets && <span>·Husdjur tillåtna</span>}
                            </div>
                            <div className="detail-container-addon-center-included-bottom">
                                <span>{listing?.beds} Sovrum</span>
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
                                    disabledDates={unavailableDates}   
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
                                    <span>Bokning: {bookingCost()}kr</span>
                                    <span>Städavgift: {listing.cleaningFee}kr</span>
                                    <span>Service avgift: {serviceFee()}kr</span>
                                </div>
                                <div className="detail-sidebar-container-center-pricing-container-total">
                                    <h4>Totalt:</h4>
                                    <span>{totalSum()}kr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-sidebar-container-bottom">
                        <h4 id='DetailBookError'>{error}</h4>
                        <button id='DetailBookBtn' onClick={handleBookingRequest}>Boka</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default page