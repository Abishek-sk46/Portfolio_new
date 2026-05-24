import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

const NavContainer = styled(motion.nav)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  gap: 1rem;
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(20px);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    bottom: 1rem;
    padding: 0.6rem 1rem;
    gap: 0.5rem;
  }
`;

const NavLink = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.4)")};
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #fff;
  }

  ${(props) =>
    props.$active &&
    `
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  `}

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.4rem 0.6rem;
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  z-index: -1;
`;

const sections = [
  { id: "intro", label: "Intro" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";
      const scrollY = window.scrollY;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          // Adjust offset to trigger slightly before it reaches top
          const offsetTop = element.offsetTop - window.innerHeight / 3;
          if (scrollY >= offsetTop) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavContainer
      initial={{ y: 100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
    >
      {sections.map((section) => (
        <NavLink
          key={section.id}
          $active={activeSection === section.id}
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
          {activeSection === section.id && (
            <ActiveIndicator layoutId="activeNavIndicator" />
          )}
        </NavLink>
      ))}
    </NavContainer>
  );
};

export default ScrollNavigation;
