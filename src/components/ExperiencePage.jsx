import React, { useRef } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { DarkTheme } from './Themes';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'motion/react';

import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import { Experiences } from '../data/ExperienceData';

// ─── Noise texture ───
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`;

// ─── Keyframes ───
const beamPulse = keyframes`
  0%, 100% { opacity: 0.5; box-shadow: 0 0 10px rgba(255,255,255,0.2); }
  50% { opacity: 1; box-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.03), 0 0 60px rgba(255,255,255,0.02); }
  50% { box-shadow: 0 0 35px rgba(255,255,255,0.08), 0 0 90px rgba(255,255,255,0.05); }
`;

const dotPulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 12px rgba(255,255,255,0.4); }
  50% { transform: translate(-50%, -50%) scale(1.4); box-shadow: 0 0 28px rgba(255,255,255,0.8), 0 0 50px rgba(255,255,255,0.4); }
`;

// ─── Layout ───
const PageContainer = styled(motion.div)`
  background-color: ${props => props.theme.body};
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: ${grainTexture};
    pointer-events: none;
    z-index: 10; /* Noise above everything */
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 8rem 2rem;
`;

// ─── Header ───
const HeaderSection = styled(motion.div)`
  text-align: center;
  padding-top: 10rem;
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const HeaderLabel = styled.h4`
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #84fab0;
  margin: 0;
  text-shadow: 0 0 20px rgba(132, 250, 176, 0.4);
`;

const HeaderTitle = styled.h1`
  font-size: calc(4rem + 2vw);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(255,255,255,0.1));
`;

const HeaderSubtext = styled.p`
  font-size: 1.15rem;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  margin-top: 1rem;
  max-width: 500px;
  line-height: 1.7;
`;

// ─── Timeline ───
const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7rem;
  padding: 3rem 0;
`;

const TimelineBeamBackground = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    left: 24px;
  }
`;

const TimelineBeamProgress = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 0;
  width: 4px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    #84fab0 0%,
    #8fd3f4 100%
  );
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(132, 250, 176, 0.5), 0 0 30px rgba(143, 211, 244, 0.3);

  @media (max-width: 768px) {
    left: 24px;
  }
`;

// ─── Timeline Entry ───
const EntryRow = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  width: 100%;

  &:nth-child(odd) {
    flex-direction: row;
    justify-content: flex-start;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    justify-content: flex-start !important;
    padding-left: 60px;
    gap: 2rem;
  }
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 4rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(12, 12, 14, 1);
  border: 4px solid rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    border-color: #84fab0;
    background: #fff;
    animation: ${dotPulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    left: 24px;
    top: 2rem;
  }
`;

const ConnectorLine = styled(motion.div)`
  position: absolute;
  top: 4rem;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(132, 250, 176, 0.8) 0%,
    transparent 100%
  );
  z-index: 4;
  opacity: 0.5;

  ${EntryRow}:nth-child(odd) & {
    left: 50%;
    width: calc(50% - 3rem);
    transform-origin: left center;
  }

  ${EntryRow}:nth-child(even) & {
    right: 50%;
    width: calc(50% - 3rem);
    background: linear-gradient(
      270deg,
      rgba(132, 250, 176, 0.8) 0%,
      transparent 100%
    );
    transform-origin: right center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardWrapper = styled(motion.div)`
  width: calc(50% - 4rem);
  perspective: 1000px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ─── Card ───
const ExperienceCard = styled(motion.div)`
  background: rgba(15, 15, 18, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
  animation: ${glowPulse} 6s ease-in-out infinite;
  transform-style: preserve-3d;

  /* Ambient top glow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    transition: width 0.5s ease, background 0.5s ease;
  }

  /* Inner rim light */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(132, 250, 176, 0.05);

    &::before {
      width: 70%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #84fab0 50%,
        transparent 100%
      );
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  transform: translateZ(30px); /* 3D pop effect */
`;

const RoleTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 0.8rem 0;
  line-height: 1.25;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
`;

const CompanyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const CompanyName = styled.span`
  font-size: 1rem;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const Separator = styled.span`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
`;

const Duration = styled.span`
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
  color: #8fd3f4;
  letter-spacing: 0.05em;
  background: rgba(143, 211, 244, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HighlightItem = styled(motion.li)`
  font-size: 1rem;
  font-family: 'Karla', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    top: 0;
    color: #84fab0;
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.8;
  }
`;

const StackRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const StackPill = styled.span`
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 10px rgba(255,255,255,0);

  ${ExperienceCard}:hover & {
    border-color: rgba(132, 250, 176, 0.3);
    color: #fff;
    box-shadow: inset 0 0 15px rgba(132, 250, 176, 0.1), 0 0 10px rgba(132, 250, 176, 0.1);
    background: rgba(132, 250, 176, 0.05);
  }
`;

// ─── Framer Motion Variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── 3D Tilt Card Wrapper ───
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ExperienceCard
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </ExperienceCard>
  );
};


// ─── Experience Entry Component ───
const ExperienceEntry = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -15, filter: 'blur(4px)' },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: 0.5 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <EntryRow ref={ref}>
      <TimelineDot className={isInView ? 'active' : ''} />
      <ConnectorLine 
        initial={{ scaleX: 0 }} 
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }} 
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} 
      />
      <CardWrapper
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <TiltCard>
          <CardContent>
            <RoleTitle>{experience.role}</RoleTitle>
            <CompanyRow>
              <CompanyName>{experience.company}</CompanyName>
              <Separator>·</Separator>
              <CompanyName>{experience.location}</CompanyName>
              <Separator>·</Separator>
              <Duration>{experience.duration}</Duration>
            </CompanyRow>
            <HighlightsList>
              {experience.highlights.map((highlight, i) => (
                <HighlightItem
                  key={i}
                  custom={i}
                  variants={highlightVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {highlight}
                </HighlightItem>
              ))}
            </HighlightsList>
            <StackRow>
              {experience.stack.map((tech, i) => (
                <StackPill key={i}>{tech}</StackPill>
              ))}
            </StackRow>
          </CardContent>
        </TiltCard>
      </CardWrapper>
    </EntryRow>
  );
};

// ─── Page Component ───
const ExperiencePage = () => {
  const { scrollYProgress } = useScroll();
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <ThemeProvider theme={DarkTheme}>
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
      >
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />

        <ContentWrapper>
          <HeaderSection
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={headerVariants}>
              <HeaderLabel>Engineering Journey</HeaderLabel>
            </motion.div>
            <motion.div variants={headerVariants}>
              <HeaderTitle>Experience</HeaderTitle>
            </motion.div>
            <motion.div variants={headerVariants}>
              <HeaderSubtext>
                A timeline of building, shipping, and evolving across teams and technologies.
              </HeaderSubtext>
            </motion.div>
          </HeaderSection>

          <TimelineContainer>
            <TimelineBeamBackground />
            <TimelineBeamProgress style={{ height: beamHeight }} />
            
            {Experiences.map((exp, index) => (
              <ExperienceEntry
                key={exp.id}
                experience={exp}
                index={index}
              />
            ))}
          </TimelineContainer>
        </ContentWrapper>
      </PageContainer>
    </ThemeProvider>
  );
};

export default ExperiencePage;
