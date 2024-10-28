import React, { useState } from 'react';

function DateAndGuests() {
    const [guestCount, setGuestCount] = useState(1)

    const increment = () => setGuestCount(prevCount => prevCount + 1)
    const decrement = () => setGuestCount(prevCount => Math.max(prevCount - 1, 1))

    return (
        <div className='datebar'>
            <div className="datebar-left">
                <div className="datebar-left-left">
                    <span id='DateText'>Datum</span>
                </div>
                <div className="datebar-left-right">
                    <button id='DateButton'>11/10-16/10</button>
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
