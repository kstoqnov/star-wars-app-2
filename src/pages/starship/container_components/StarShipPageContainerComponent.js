import React from 'react';
import StarShipPageComponent from './StarShipPageComponent';
import SpinnerComponent from '../../../utils/container_components/SpinnerComponent';

import { loader } from 'graphql.macro';
import { CalculateRadarStats } from './CalculateRadarStats';
import { ALL_STAR_SHIPS } from '../../../utils/js/constants';
import { useQuery } from '@apollo/react-hooks';
 

const GET_STAR_SHIPS = loader('../../../graphql_schemas/getStarShips.gql');


const StarShipPageContainerComponent = ({ match }) => {
  const { data, loading, error } = useQuery(GET_STAR_SHIPS, {
    variables: { id: match.params.starshipId, first: ALL_STAR_SHIPS },
  });

  if (loading) return <SpinnerComponent />;
  if (error) return `Error! ${error}`;

  const sameClassStarShips = data.allStarships.edges.filter(
    edge =>
      edge.node.starshipClass === data.starship.starshipClass &&
      edge.node.id !== data.starship.id,
  );

  const radarData = CalculateRadarStats(sameClassStarShips, data.starship);
  console.log(radarData)

  return <StarShipPageComponent starship={data.starship} data={radarData}/>;
};

export default StarShipPageContainerComponent;
