import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faDeaf, faEyeSlash, faChild } from '@fortawesome/free-solid-svg-icons';

type AdaptIconProps = {
  adapt: Adapt;
};

const AdaptIcons: React.FC<AdaptIconProps> = ({ adapt }) => (
  <div className="adapt-icons">
    {adapt.wheelchair && <FontAwesomeIcon icon={faWheelchair} title="Wheelchair accessible" />}
    {adapt.deaf && <FontAwesomeIcon icon={faDeaf} title="Hearing accessible" />}
    {adapt.blind && <FontAwesomeIcon icon={faEyeSlash} title="Visually accessible" />}
    {adapt.child && <FontAwesomeIcon icon={faChild} title="Child friendly" />}
  </div>
);

export default AdaptIcons;
