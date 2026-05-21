import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DarkTheme } from './Themes';
import { motion, AnimatePresence } from 'motion/react';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import { TechStackData } from '../data/TechData';

// Styled Components
const Box = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  /* Ambient Gradients for Cinematic Depth */
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
  }
  
  &::before {
    top: -10%;
    left: 10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(97, 218, 251, 0.08) 0%, transparent 60%);
  }
  
  &::after {
    bottom: -10%;
    right: 5%;
    width: 70vw;
    height: 70vw;
    background: radial-gradient(circle, rgba(56, 178, 172, 0.05) 0%, transparent 60%);
  }
`;

const TitleContainer = styled(motion.div)`
  position: absolute;
  top: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
`;

const HeaderSubtitle = styled.h4`
  font-size: 0.9rem;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  margin-bottom: 0.5rem;
`;

const HeaderTitle = styled.h1`
  font-size: calc(3rem + 2vw);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
`;

const EcosystemContainer = styled.div`
  width: 85vw;
  height: 60vh;
  position: relative;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 3rem 5rem;
  margin-top: 15vh;

  @media (max-width: 1024px) {
    gap: 2.5rem 3rem;
  }
  @media (max-width: 768px) {
    gap: 2rem 2rem;
    margin-top: 20vh;
  }
`;

const NodeWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  
  /* Create an invisible extended hit area so hover doesn't break easily */
  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    z-index: -1;
  }
`;

const IconContainer = styled(motion.div)`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  svg, img {
    width: 35px;
    height: 35px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    svg, img {
      width: 28px;
      height: 28px;
    }
  }
`;

const LabelContainer = styled(motion.div)`
  position: absolute;
  top: 90px; /* positioned below the icon */
  background: rgba(15, 15, 17, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    top: 75px;
  }
`;

const CategoryBadge = styled.span`
  font-size: 0.55rem;
  text-transform: uppercase;
  color: ${props => props.$color};
  letter-spacing: 0.15em;
  opacity: 0.9;
  margin-bottom: 0.2rem;
  font-weight: 600;
`;

const LabelText = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.95);
`;

const TechNode = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NodeWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconContainer
          animate={{
            scale: isHovered ? 1.25 : 1,
            borderColor: isHovered ? data.color : 'rgba(255,255,255,0.05)',
            boxShadow: isHovered ? `0 0 30px ${data.color}50` : '0 0 0px rgba(0,0,0,0)',
            background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Inject styling directly to SVG to enhance glow on hover */}
          <div style={{ display: 'flex', filter: isHovered ? 'brightness(1.5)' : 'brightness(1)', transition: 'filter 0.3s ease' }}>
            <data.Icon />
          </div>
        </IconContainer>

        <AnimatePresence>
          {isHovered && (
            <LabelContainer
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <CategoryBadge $color={data.color}>{data.category}</CategoryBadge>
              <LabelText>{data.name}</LabelText>
            </LabelContainer>
          )}
        </AnimatePresence>
      </div>
    </NodeWrapper>
  );
};

const MySkillsPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme='dark'/>
        <SocialIcons theme='dark'/>

        <TitleContainer
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <HeaderSubtitle>My Arsenal</HeaderSubtitle>
          <HeaderTitle>Tech Stack</HeaderTitle>
        </TitleContainer>

        <EcosystemContainer>
          {TechStackData.map((tech, index) => (
            <TechNode key={tech.id} data={tech} index={index} />
          ))}
        </EcosystemContainer>

      </Box>
    </ThemeProvider>
  );
};

export default MySkillsPage;
