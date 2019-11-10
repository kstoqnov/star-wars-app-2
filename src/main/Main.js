import React from 'react';
import LoginContainerComponent from '../pages/login/container_components/LoginContainerComponent';
import EpisodesPageContainerComponent from '../pages/episodes/container_components/EpisodesPageContainerComponent';
import EpisodePageContainerComponent from '../pages/episode/container_components/EpisodePageContainerComponent';
import CharactersPageContainerComponent from '../pages/characters/container_components/CharactersPageContainerComponent';
import CharacterDetailsContainerComponent from '../pages/characters/container_components/CharacterDetailsContainerComponent';
import StarShipPageContainerComponent from '../pages/starship/container_components/StarShipPageContainerComponent';

import { loader } from 'graphql.macro';
import { ProtectedRoute } from '../utils/container_components/ProtectedRoute';
import { useQuery } from '@apollo/react-hooks';
import { Route, Switch, Redirect } from 'react-router-dom';


const IS_LOGGED_IN = loader('../graphql_schemas/isLoggedIn.gql');


const Main = () => {

    const { data } = useQuery(IS_LOGGED_IN);

    return(

        <Switch>
      
        <Route
          exact
          path={ ['/', '/login'] }
          render={ () =>
            data.isLoggedIn ? <Redirect to="/episodes" /> : <LoginContainerComponent />
          }
        />
        
          <ProtectedRoute
            exact
            path="/episodes"
            component={EpisodesPageContainerComponent}
          />

          <ProtectedRoute
            path={'/episodes/:episodeId'}
            component={EpisodePageContainerComponent}
          />

          <ProtectedRoute
            exact
            path={'/characters'}
            component={CharactersPageContainerComponent}
          />

          <ProtectedRoute
            path={'/characters/:characterId'}
            component={CharacterDetailsContainerComponent}
          />

          <ProtectedRoute
            path={'/starships/:starshipId'}
            component={StarShipPageContainerComponent}
          />


      </Switch>



    );


};

export default Main;