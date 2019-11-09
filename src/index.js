import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { THEME } from './utils/js/constants';
import { defaultOptions } from './utils/js/defaultOptionsApolloClient';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(process.env.REACT_APP_API_KEY);
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        },
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    name: 'react-web-client',
    version: '1.3',
    queryDeduplication: false,
    defaultOptions
});


client.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem(process.env.REACT_APP_API_KEY),
        theme: !localStorage.getItem(THEME) ? 'light' : localStorage.getItem(THEME)
    },
});

ReactDOM.render(
   <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
  </ApolloProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
