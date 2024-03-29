import React from 'react';
import EpisodePageComponent from './EpisodePageComponent';
import SpinnerComponent from '../../../utils/container_components/SpinnerComponent';

import { loader } from 'graphql.macro';
import { FIVE_CHARACTERS } from '../../../utils/js/constants';
import { useQuery } from '@apollo/react-hooks';



const GET_EPISODE = loader('../../../graphql_schemas/getEpisode.gql');

const EpisodePageContainerComponent = ({ match }) => {

  const { loading, error, data, fetchMore } = useQuery(GET_EPISODE, {
    variables: { id: match.params.episodeId, first: FIVE_CHARACTERS },
  });

  if (loading) return <SpinnerComponent/>;
  if (error) return `Error! ${error}`;

  const people = data.episode.people;

  return (
    <EpisodePageComponent
      episode={data.episode}
      onLoadMore={() =>
        fetchMore({
          variables: {
            cursor: people.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.episode.people.edges;
            const pageInfo = fetchMoreResult.episode.people.pageInfo;

            return newEdges.length
              ? {
                  episode: {
                    ...previousResult.episode,
                    people: {
                      __typename: previousResult.episode.people.__typename,
                      edges: [
                        ...previousResult.episode.people.edges,
                        ...newEdges,
                      ],
                      pageInfo,
                    },
                  },
                }
              : previousResult;
          },
        })
      }
    />
  );
};

export default EpisodePageContainerComponent;
