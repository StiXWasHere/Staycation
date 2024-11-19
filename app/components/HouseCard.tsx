import React from "react";
import AdaptIcons from "./AdaptIcons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faBed, faLocationDot, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const HouseCard: React.FC<HouseCardProps> = ({ title, bonus, nightlyFee, location, publicTransport, imageUrl, beds, adaptations, comments }) => {
  const calculateRating = () => {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0)
    const averageRating = comments.length > 0 ? totalRating / comments.length : 0
    return averageRating;
}

  return(
  <div className="house-card">
    <div className="house-card-top">
      <p id="HouseTopTag">{nightlyFee} SEK/Natt</p>
      <h3 id="HouseTitle">{title}</h3>
      <p id="HouseTopTag">{calculateRating()}★</p>
    </div>
    <div className="house-card-center">
      <img id='HouseImg' src={imageUrl} alt={title}/>
    </div>
    <div className="house-card-bottom">
      <div className="house-card-bottom-left">
        <div id="FaIconWText">
          <FontAwesomeIcon icon={faLayerGroup} />
          <p>{bonus}</p>
        </div>
        <div id="FaIconWText">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{location}</p>
        </div>    
      </div>
      <div className="house-card-bottom-right">
        <div className="house-card-bottom-right-info">
          <div id="FaIconWText">
            <FontAwesomeIcon icon={faBus} />
            <p>{publicTransport}m</p>
          </div>
          <div id="FaIconWText">
            <FontAwesomeIcon icon={faBed}/>
            <p>{beds}</p>
          </div>
        </div>
        <div className="house-card-bottom-right-adaptations">
          <AdaptIcons adapt={adaptations}/>
        </div>
      </div>
    </div>
  </div>
);
}

export default HouseCard;
