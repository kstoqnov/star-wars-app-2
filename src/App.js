import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import ErrorBoundaryComponent from './pages/error/components/ErrorBoundaryComponent';

import { loader } from 'graphql.macro';
import { GlobalStyles } from './utils/css/global.css';
import { lightTheme, darkTheme } from './utils/css/theme.css';
import { ThemeProvider } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';


const GET_THEME = loader('./graphql_schemas/getTheme.gql');


function App() {

  const { data: {theme} } = useQuery(GET_THEME);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (

    <ThemeProvider theme={themeMode}>

      <GlobalStyles />

      <ErrorBoundaryComponent>

          <Header/>
          <Main/>

      </ErrorBoundaryComponent>

    </ThemeProvider>
   
  );
}

export default App;
