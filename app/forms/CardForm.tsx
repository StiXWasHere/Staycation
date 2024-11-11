import { useState } from "react";

export const CardForm = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [ccv, setCcv] = useState("");

    return (
        <div className="form-card">
            <form>
                <div className="form-card-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </div>
                <span>Expiration Date</span>
                <div className="form-card-group">
                    <div className="form-card-group-left">
                        <label htmlFor="expiryMonth">Month</label>
                        <select
                            name="expiryMonth"
                            id="expiryMonth"
                            value={expiryMonth}
                            onChange={(e) => setExpiryMonth(e.target.value)}
                            required
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={(i + 1).toString().padStart(2, '0')}>
                                    {(i + 1).toString().padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="expiryYear">Year</label>
                        <select
                            name="expiryYear"
                            id="expiryYear"
                            value={expiryYear}
                            onChange={(e) => setExpiryYear(e.target.value)}
                            required
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={24 + i}>
                                    {24 + i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-card-group-right">
                        <label htmlFor="ccv">CCV</label>
                        <input
                            type="text"
                            id="ccv"
                            value={ccv}
                            onChange={(e) => setCcv(e.target.value)}
                            maxLength={3}
                            style={{ width: '3rem' }}
                            placeholder="123"
                            required
                        />
                    </div>
                </div>
                
            </form>
        </div>
    );
};
