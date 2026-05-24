import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { DarkTheme } from './Themes';
import { motion } from 'motion/react';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import BigTitle from '../subComponents/BigTitlte'

const Section = styled.section`
  background-color: ${props => props.theme.body};
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  /* Ambient Background Lighting */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%);
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
  }
`;

const LayoutWrapper = styled(motion.div)`
  width: 85vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    height: auto;
    gap: 3rem;
    margin-top: 5rem;
    margin-bottom: 5rem;
    overflow-y: auto;
  }
`;

const TopHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderSubtitle = styled.h4`
  font-size: 0.9rem;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`;

const HeaderTitle = styled.h1`
  font-size: calc(3rem + 2vw);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
`;

const MainSplit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  gap: 4rem;
  padding: 0 4rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 1rem;
    gap: 3rem;
  }
`;

const LeftColumn = styled(motion.div)`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const IntroHeading = styled.h2`
  font-size: calc(1.8rem + 0.5vw);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const IntroText = styled.p`
  font-size: 1.05rem;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin: 0;
  
  strong {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }
`;

const TagRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
  color: rgba(255, 255, 255, 0.5);
`;

const RightColumn = styled(motion.div)`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const ProfileCard = styled(motion.div)`
  background: rgba(15, 15, 17, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.8rem;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
`;

const CardIconBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
`;

const CardContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const CardSubtitle = styled.p`
  font-size: 0.95rem;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.4;
`;

const CardMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  width: 100%;
`;

const MetaText = styled.span`
  font-size: 0.8rem;
  font-family: 'Space Mono', monospace;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  strong {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SmallTag = styled.span`
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
`;

const MetricsRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 2rem auto 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled(motion.div)`
  background: rgba(10, 10, 12, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(20, 20, 22, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: translateY(-3px);
  }
`;

const MetricValue = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1;
`;

const MetricLabel = styled.p`
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`;

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, duration: 0.8 } }
};

const AboutPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
          <Section id="about">

            <LayoutWrapper variants={containerVariants} initial="hidden" animate="show">
              
              <TopHeader variants={itemVariants}>
                <HeaderSubtitle>WHO I AM</HeaderSubtitle>
                <HeaderTitle>Persona</HeaderTitle>
              </TopHeader>

              <MainSplit>
                <LeftColumn variants={itemVariants}>
                  <IntroHeading>Building immersive digital experiences</IntroHeading>
                  <IntroText>
                    I'm a <strong>Frontend-focused Developer</strong> obsessed with interaction, systems, and motion. I build at the intersection of frontend architecture and applied AI.
                  </IntroText>
                  <IntroText>
                    My current focus: highly interactive web applications, motion-driven UI (Framer Motion + GSAP), and intelligent agentic workflows. Everything I build targets cinematic user experiences.
                  </IntroText>
                  <TagRow>
                    <Tag>Based in India</Tag>
                    <Tag>React Ecosystem</Tag>
                  </TagRow>
                </LeftColumn>
                
                <RightColumn variants={itemVariants}>
                  <SectionTitle>Education</SectionTitle>
                  <ProfileCard>
                    <CardIconBox>SEC</CardIconBox>
                    <CardContentBox>
                      <CardHeaderRow>
                        <CardTitle>SECE Coimbatore</CardTitle>
                      </CardHeaderRow>
                      <CardSubtitle style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        B.Tech in Artificial Intelligence & Data Science
                      </CardSubtitle>
                      <CardSubtitle style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>
                        2024 - 2028
                      </CardSubtitle>
                      
                      <CardMetaRow>
                        <MetaText>CGPA 3RD SEM <strong style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)' }}>7.77</strong> /10</MetaText>
                        <SmallTag>3rd Year</SmallTag>
                      </CardMetaRow>
                    </CardContentBox>
                  </ProfileCard>
                </RightColumn>
              </MainSplit>

              <MetricsRow variants={itemVariants}>
                <MetricCard whileHover={{ y: -3 }}>
                  <MetricValue>4+</MetricValue>
                  <MetricLabel>Projects Built</MetricLabel>
                </MetricCard>
                <MetricCard whileHover={{ y: -3 }}>
                  <MetricValue>400+</MetricValue>
                  <MetricLabel>Problems Solved</MetricLabel>
                </MetricCard>
                <MetricCard whileHover={{ y: -3 }}>
                  <MetricValue>1700+</MetricValue>
                  <MetricLabel>Contest Rating</MetricLabel>
                </MetricCard>
              </MetricsRow>

            </LayoutWrapper>

          </Section>
        </ThemeProvider>
    )
}

export default AboutPage
