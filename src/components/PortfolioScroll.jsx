import React from 'react';
import styled from 'styled-components';
import Intro from './Intro';
import WorkSection from './WorkSection';
import AboutPage from './AboutPage';
import MySkillsPage from './MySkillsPage';
import ExperiencePage from './ExperiencePage';
import ContactPage from './ContactPage';
import ScrollNavigation from './ScrollNavigation';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from './Themes';

const PortfolioContainer = styled.div`
  width: 100vw;
  overflow-x: hidden;
  background: ${(props) => props.theme.body};
`;

const IntroSectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.body};
`;

const PortfolioScroll = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <PortfolioContainer>
        <ScrollNavigation />
        
        <IntroSectionWrapper id="intro">
          <Intro />
        </IntroSectionWrapper>
        
        <WorkSection />
        <AboutPage />
        <MySkillsPage />
        <ExperiencePage />
        <ContactPage />
        
      </PortfolioContainer>
    </ThemeProvider>
  );
};

export default PortfolioScroll;
