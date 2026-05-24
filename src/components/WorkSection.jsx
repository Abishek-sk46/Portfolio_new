import React, { useRef } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { DarkTheme } from "./Themes";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Work } from "../data/WorkData";
import Card from "../subComponents/Card";
import BigTitle from "../subComponents/BigTitlte";

const Section = styled.section`
  background-color: ${(props) => props.theme.body};
  height: 200vh; /* Better pacing for 3 cards */
  position: relative;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Main = styled(motion.ul)`
  display: flex;
  color: white;
  gap: 6rem;
  padding-left: calc(10rem + 15vw);
  padding-right: calc(5rem + 10vw); /* Tighter end padding */
  width: max-content;
  margin: 0; /* Remove default ul margin */
  list-style: none; /* Remove default ul bullets */
`;

const float = keyframes`
  0% { transform: translateY(0) translateX(-50%); opacity: 0.9; }
  50% { transform: translateY(10px) translateX(-50%); opacity: 0.5; }
  100% { transform: translateY(0) translateX(-50%); opacity: 0.9; }
`;

const ScrollText = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: ${float} 3s ease-in-out infinite;
  z-index: 10;
  
  span {
    font-size: 1.2rem;
    font-weight: 300;
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, /* Faster stagger */
      duration: 0.5,
    },
  },
};

const WorkSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Apply smooth inertia to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    mass: 0.4
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Section id="projects" ref={targetRef}>
        <StickyContainer>
          <Main variants={container} initial="hidden" animate="show" style={{ x }}>
            {Work.map((d) => (
              <Card key={d.id} data={d} />
            ))}
          </Main>

          <ScrollText style={{ opacity }}>
            <span>↓</span>
            scroll
          </ScrollText>

          <BigTitle text="BUILDS" top="10%" right="20%" />
        </StickyContainer>
      </Section>
    </ThemeProvider>
  );
};

export default WorkSection;
