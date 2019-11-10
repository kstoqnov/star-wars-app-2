import React from 'react';
import LoginPageComponent from './LoginPageComponent';
import SpinnerComponent from '../../../utils/container_components/SpinnerComponent';

import { loader } from "graphql.macro";
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';



const SIGN_IN_MUTATION = loader('../../../graphql_schemas/signInMutation.gql');

const LoginContainerComponent = ({ history }) => {

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted(data) {
      confirm(data);
    },
  });

  const confirm = async data => {
    saveUserData(data.signIn.token);
    client.writeData({ data: { isLoggedIn: true } });
    history.push(`/episodes`);
  };

  const saveUserData = token => {
    localStorage.setItem(process.env.REACT_APP_API_KEY, token);
  };

  if (loading) return <SpinnerComponent/>;

  return <LoginPageComponent signIn={signIn} error={error}/>;

}

export default withRouter(LoginContainerComponent);