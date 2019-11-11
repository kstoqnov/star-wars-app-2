import React from 'react';
import Header from '../../header/Header';
import Main from '../../main/Main';
import ErrorBoundaryComponent from '../error/components/ErrorBoundaryComponent';

import { loader } from 'graphql.macro';
import { GlobalStyles } from '../../utils/css/global.css';
import { lightTheme, darkTheme } from '../../utils/css/theme.css';
import { ThemeProvider } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import {} from '../../graphql_schemas'

const GET_THEME = loader('../../graphql_schemas/getTheme.gql');
const IS_LOGGED_IN = loader('../../graphql_schemas/isLoggedIn.gql');

function App() {

  const { data: {theme} } = useQuery(GET_THEME);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const { data } = useQuery(IS_LOGGED_IN);

  return (

    <ThemeProvider theme={themeMode}>

      <GlobalStyles />

      <ErrorBoundaryComponent>

          {data.isLoggedIn ? <Header/> : ''}
          <Main/>

      </ErrorBoundaryComponent>

    </ThemeProvider>
   
  );
}

export default App;
