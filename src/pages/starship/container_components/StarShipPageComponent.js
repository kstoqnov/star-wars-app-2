import React from 'react';
import StarShipDetailsComponent from './StarShipDetailsComponent';
import RadarComponent from './RadarComponent';

import { ShipDetailsWrapper, ShipDetailsContainer } from '../css/starship.css';

const StarShipPageComponent = ({ starship, data }) => {
  return (
    <ShipDetailsWrapper>
      <h1>{starship.name}</h1>
      <h2>({starship.model})</h2>
      <ShipDetailsContainer>
        <StarShipDetailsComponent starship={starship} />
        <RadarComponent data={data} />
      </ShipDetailsContainer>
    </ShipDetailsWrapper>
  );
};

export default StarShipPageComponent;
