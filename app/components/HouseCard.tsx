import React from "react";

const HouseCard: React.FC<HouseCardProps> = ({ title, bonus, nightlyFee, location, publicTransport, imageUrl, beds, rating }) => (
  <div className="house-card">
    <div className="house-card-top">
      <p id="HouseTopTag">{nightlyFee} SEK/Natt</p>
      <h3 id="HouseTitle">{title}</h3>
      <p id="HouseTopTag">{rating}★</p>
    </div>
    <div className="house-card-center">
      {imageUrl && <img src={imageUrl} alt={title} />}
    </div>
    <div className="house-card-bottom">
      <div className="house-card-bottom-left">
        <p>{bonus}</p>
        <p>Location: {location}</p>        
      </div>
      <div className="house-card-bottom-right">
        <div className="house-card-bottom-right-info">
          <p>{publicTransport}</p>
          <p>{beds}</p>
        </div>
        <div className="house-card-bottom-right-adaptations">
          {/* Adaptations or other optional elements can go here if needed */}
        </div>
      </div>
    </div>
  </div>
);

export default HouseCard;
