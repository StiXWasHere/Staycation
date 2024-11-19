import { useState } from "react";

interface CardDetails {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
}

type CardFormProps = {
    setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
};

export const CardForm: React.FC<CardFormProps> = ({ setCardDetails }) => {
    const [cardDetails, setLocalCardDetails] = useState<CardDetails>({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        ccv: "",
    });

    const handleChange = (field: keyof CardDetails, value: string) => {
        const updatedCardDetails = { ...cardDetails, [field]: value };
        setLocalCardDetails(updatedCardDetails);
        setCardDetails(updatedCardDetails); // Sync with parent state
    };

    return (
        <div className="form-card">
            <form>
                <div className="form-card-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleChange("cardNumber", e.target.value)}
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
                            value={cardDetails.expiryMonth}
                            onChange={(e) => handleChange("expiryMonth", e.target.value)}
                            required
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                                    {(i + 1).toString().padStart(2, "0")}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="expiryYear">Year</label>
                        <select
                            name="expiryYear"
                            id="expiryYear"
                            value={cardDetails.expiryYear}
                            onChange={(e) => handleChange("expiryYear", e.target.value)}
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
                            value={cardDetails.ccv}
                            onChange={(e) => handleChange("ccv", e.target.value)}
                            maxLength={3}
                            style={{ width: "3rem" }}
                            placeholder="123"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};
