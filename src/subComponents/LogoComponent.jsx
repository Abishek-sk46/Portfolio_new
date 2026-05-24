import React from 'react'
import styled from 'styled-components'
import { DarkTheme } from '../components/Themes'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const Logo = styled.h1`
display: inline-block;
color: ${props => props.$color === 'dark' ? DarkTheme.text : DarkTheme.body};
font-family: 'Pacifico',cursive;

position: fixed;
left: 2rem;
top: 2rem;
z-index:3;
`

const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color === 'dark' ? DarkTheme.text : DarkTheme.body};
  
  position: fixed;
  left: 2rem;
  top: 2rem;
  z-index: 3;
  cursor: pointer;
  
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 4px currentColor);
  }
`

const LogoComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/') {
        return (
            <Logo $color={props.theme}>
              SK
            </Logo>
        )
    }

    return (
        <BackButton $color={props.theme} onClick={() => navigate("/")} aria-label="Go Back">
          <FiArrowLeft size={30} strokeWidth={1.5} />
        </BackButton>
    )
}

export default LogoComponent
