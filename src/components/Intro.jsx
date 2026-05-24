import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import FloatingWorkspace from './FloatingWorkspace'

const breathe = keyframes`
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.05); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.2); }
  100% { text-shadow: 0 0 10px rgba(255,255,255,0.05); }
`;

const pulseDot = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(80, 250, 123, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(80, 250, 123, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(80, 250, 123, 0); }
`;

const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 65vw;
  height: 55vh;
  display: flex;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(15, 15, 15, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;
`;

const ManifestoContainer = styled.div`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${props => props.theme.text};
  height: 100%;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const ManifestoTitle = styled(motion.h1)`
  font-size: calc(1.6rem + 1.2vw);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  animation: ${breathe} 6s infinite ease-in-out;
`;

const ManifestoSubText = styled(motion.p)`
  font-size: calc(0.85rem + 0.4vw);
  line-height: 1.6;
  font-weight: 400;
  color: ${props => `rgba(${props.theme.textRgba}, 0.75)`};
  margin: 0;
  max-width: 90%;
`;

const StatusLine = styled(motion.div)`
  font-family: 'Fira Code', monospace, Consolas, "Courier New";
  font-size: calc(0.65rem + 0.3vw);
  color: ${props => `rgba(${props.theme.textRgba}, 0.5)`};
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 0.8rem;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #50fa7b;
    animation: ${pulseDot} 2s infinite;
  }
`;

const ContactButton = styled(motion(NavLink))`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background: transparent;
  color: ${props => props.theme.body};
  border: 1px solid ${props => props.theme.body};
  border-radius: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.body};
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    z-index: -1;
  }

  &:hover {
    color: ${props => props.theme.text};
    box-shadow: 0 0 20px rgba(255,255,255,0.2);
  }

  &:hover::before {
    transform: translateX(0);
  }
`;

const Intro = () => {
    return (
        <Box
        initial={{height:0}}
        animate={{height: '55vh'}}
        transition={{ type: 'spring', duration:2, delay:1 }}
        >
            <SubBox>
                <ManifestoContainer>
                    <ManifestoTitle
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        Build with intention.<br/>
                        Learn through creating.
                    </ManifestoTitle>
                    <ManifestoSubText
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.8 }}
                    >
                        Exploring frontend systems,<br/>
                        interactive experiences,<br/>
                        and AI-powered workflows.
                    </ManifestoSubText>
                    <StatusLine
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        &gt; currently building &amp; learning
                    </StatusLine>
                    
                </ManifestoContainer>
            </SubBox>
            <SubBox>
                <motion.div
                initial={{opacity:0}}
                animate={{opacity: 1}}
                transition={{ duration:1, delay:2 }}
                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <FloatingWorkspace />
                </motion.div>
            </SubBox>
        </Box>
    )
}

export default Intro
