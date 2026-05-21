import { motion } from 'motion/react';
import React from 'react'
import styled from 'styled-components';
import { Github } from '../components/AllSvgs';

const CardContainer = styled(motion.li)`
  width: 25rem;
  height: 60vh;
  margin-right: 6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  background: rgba(12, 12, 14, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.03);
  overflow: hidden;
  color: white; 
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  
  /* ambient glow behind card */
  &::after {
    content: '';
    position: absolute;
    inset: -10px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02) rotateX(1deg) rotateY(-1deg);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.1);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const BrowserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 1.2rem;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  gap: 8px;
  position: relative;
  z-index: 2;
`;

const Dot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0.6;
  transition: opacity 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 0.9;
  }
`;

const PreviewArea = styled.div`
  height: 40%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  z-index: 1;
`;

const PreviewImage = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  filter: blur(8px) grayscale(30%);
  transform: scale(1.1);
  transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  
  ${CardContainer}:hover & {
    opacity: 0.85;
    filter: blur(0px) grayscale(0%);
    transform: scale(1);
  }
`;

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(0deg, rgba(12,12,14,1) 0%, transparent 100%);
  opacity: 0.8;
  transition: opacity 0.6s ease;
  
  ${CardContainer}:hover & {
    opacity: 0.1;
  }
`;

const ContentBox = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  background: transparent;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: calc(1em + 0.3vw);
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
  
  ${CardContainer}:hover & {
    color: #fff;
  }
`;

const Description = styled.p`
  font-size: calc(0.8em + 0.1vw);
  font-family: 'Karla', sans-serif;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
  margin: 0;
  height: 4.5em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
  
  ${CardContainer}:hover & {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.8rem;
`;

const Tag = styled.span`
  font-size: 0.65rem;
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    border-color: rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.85);
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.02);
  transition: border-color 0.3s ease;
  
  ${CardContainer}:hover & {
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

const VisitLink = styled.a`
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: translateX(2px);
  }
  
  ${CardContainer}:hover & {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const GitLink = styled.a`
  color: rgba(255, 255, 255, 0.25);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff !important;
  }
  
  ${CardContainer}:hover & {
    color: rgba(255, 255, 255, 0.5);
  }
  
  & > * {
    fill: currentColor;
  }
`;

// Framer motion configuration
const Item = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      duration: 1
    }
  }
}

const Card = (props) => {
  const { id, name, description, tags, demo, github, preview } = props.data;

  return (
    <CardContainer key={id} variants={Item}>
      <BrowserHeader>
        <Dot color="#FF5F56" />
        <Dot color="#FFBD2E" />
        <Dot color="#27C93F" />
      </BrowserHeader>
      
      <PreviewArea>
        {preview && <PreviewImage src={preview} />}
        <PreviewOverlay />
      </PreviewArea>
      
      <ContentBox>
        <TextContent>
          <Title>{name}</Title>
          <Description>{description}</Description>
          <Tags>
            {tags.map((t, i) => (
              <Tag key={i}>{t}</Tag>
            ))}
          </Tags>
        </TextContent>
        
        <Footer>
          {demo ? (
             <VisitLink href={demo} target="_blank" rel="noopener noreferrer">
               Live Preview ↗
             </VisitLink>
          ) : (
             <VisitLink as="span" style={{opacity: 0.3, cursor: 'not-allowed'}}>
               Coming Soon ↗
             </VisitLink>
          )}
          
          <GitLink href={github} target="_blank" rel="noopener noreferrer" aria-label="View Source on GitHub">
            <Github width={22} height={22} />
          </GitLink>
        </Footer>
      </ContentBox>
    </CardContainer>
  )
}

export default Card
