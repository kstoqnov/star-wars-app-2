import React from 'react';
import LogoComponent from './LogoComponent';

import { loader } from 'graphql.macro';
import { useApolloClient, useQuery } from '@apollo/react-hooks';


const GET_THEME = loader('../../graphql_schemas/getTheme.gql');

const LogoContainerComponent = ({asTitle}) => {
  const {data: {theme}} = useQuery(GET_THEME);
  const client = useApolloClient();

  const setMode = mode => {
    localStorage.setItem('theme', mode)
    client.writeData({ data: { theme: mode } });
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  };

  return <LogoComponent asTitle={asTitle} onClick={() => toggleTheme()}/>
}

export default LogoContainerComponent;