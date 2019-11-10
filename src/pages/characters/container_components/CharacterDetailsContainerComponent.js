import React from 'react';
import CharacterDetailsComponent from './CharacterDetailsComponent';
import SpinnerComponent from '../../../utils/container_components/SpinnerComponent';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
 

const GET_PERSON = loader('../../../graphql_schemas/getPerson.gql');


const CharacterDetailsContainerComponent = ({ match }) => {

  const { data, loading, error } = useQuery(GET_PERSON, {
    variables: { id: match.params.characterId },
  });

  if (loading) return <SpinnerComponent/>;
  if (error) return `Error! ${error}`;

  return <CharacterDetailsComponent person={data.person} />;
  
};

export default CharacterDetailsContainerComponent;

