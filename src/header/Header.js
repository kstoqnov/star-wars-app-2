import React from 'react';
import LogoContainerComponent from './logo/LogoContainerComponent';

import { withRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import {
  HeaderContainer,
  OptionsContainer,
  LogoStyleContainer,
  OptionLink,
  LogoutStyle,
  LogoWrapper,
} from './header.css';

const Header = ({ history }) => {

    const client = useApolloClient();

    return (

        <HeaderContainer>
            <LogoStyleContainer>
                <LogoContainerComponent asTitle={false} />
            </LogoStyleContainer>
            <OptionsContainer>
                <OptionLink to="/episodes">Episodes</OptionLink>
                <OptionLink to="/characters">Characters</OptionLink>
                <OptionLink
                to="/login"
                onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                    history.push('/login');
                }}
                >
                <LogoWrapper>
                    <LogoutStyle />
                </LogoWrapper>
                </OptionLink>
            </OptionsContainer>
        </HeaderContainer>


    );


};

export default withRouter(Header);