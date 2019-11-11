import React from 'react';
import CustomButtonComponent from '../../../utils/container_components/CustomButtonComponent';
import FormInputComponent from './FormInputComponent';
import LogoContainerComponent from '../../../header/logo/LogoContainerComponent';
import PropTypes from 'prop-types';



import { ErrorMessage, SignInContainer, FormContainer } from '../css/login.css';



class LoginPageComponent extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.signIn({
      variables: { email: this.state.email, password: this.state.password },
    });
  };

  render() {
    return (
      <SignInContainer>
        <LogoContainerComponent asTitle={true} />
        <FormContainer>
          {this.props.error
            ? this.props.error.graphQLErrors.map(({ message }, i) => (
                <ErrorMessage key={i}>{message}</ErrorMessage>
              ))
            : null}
          <form onSubmit={this.onSubmit}>
            <FormInputComponent
              name="email"
              type="text"
              handleChange={this.handleChange}
              value={this.state.email}
              placeholder="Email"
              required
            />
            <FormInputComponent
              name="password"
              type="password"
              value={this.state.password}
              handleChange={this.handleChange}
              placeholder="Password"
              required
            />
            <CustomButtonComponent type="submit" id='form-button'> Login </CustomButtonComponent>
          </form>
        </FormContainer>
        
        <p><span>Email: </span>demo@st6.io</p>
        <p><span>Password: </span>demo1234</p>
        
      </SignInContainer>
    );
  }
}


FormInputComponent.propTypes = { 
  email:PropTypes.string.isRequired, 
  password:PropTypes.string.isRequired
};


export default LoginPageComponent;
