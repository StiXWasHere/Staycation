import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays, differenceInDays, parse, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Base styles
import 'react-date-range/dist/theme/default.css'; // Theme styles


function DateAndGuests() {
    const [guestCount, setGuestCount] = useState<number>(1);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const storedNightCount = sessionStorage.getItem('nightCount');
        const storedGuestCount = sessionStorage.getItem('guestCount')
        if (storedNightCount) {
            console.log('Loaded night count from sessionStorage:', storedNightCount);
        }
        if (storedGuestCount) {
            setGuestCount(Number(storedGuestCount))
            console.log('guest count updated with',storedGuestCount)
        }
    }, []);

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
            }
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    return (
        <div className='datebar'>
            <div className="datebar-left">
                <div className="datebar-left-left">
                    <span id='DateText'>Datum</span>
                </div>
                <div className="datebar-left-right">
                    <button id='DateButton' onClick={toggleDropdown}>
                        {selectionRange.startDate.toLocaleDateString()}
                    </button>
                    <button id='DateButton' onClick={toggleDropdown}>
                        {selectionRange.endDate.toLocaleDateString()}
                    </button>
                    {isDropdownVisible && (
                    <div className="datebar-left-right-dropdown" id='DateDropdown'>
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
            </div>
            <div className="datebar-right">
                <div className="datebar-right-left">
                    <span id='GuestText'>Antal gäster</span>
                </div>
                <div className="datebar-right-right">
                    <button id='GuestButton' onClick={decrement}>-</button>
                    <span id='Count'>{guestCount}</span>
                    <button id='GuestButton' onClick={increment}>+</button> 
                </div>
            </div>
        </div>
    );
}

export default DateAndGuests;
