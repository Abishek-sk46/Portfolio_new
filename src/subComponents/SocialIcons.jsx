import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";
import { Github, LinkedIn, LeetCode } from "../components/AllSvgs";
import { DarkTheme } from "../components/Themes";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 2rem;

  z-index: 3;

  & > *:not(:last-child) {
    margin: 0.8rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) =>
    props.$color === "dark" ? DarkTheme.text : DarkTheme.body};
`;

const IconWrapper = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  a {
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 0.3s ease;
  }
  
  &:hover a {
    filter: drop-shadow(0 0 6px ${(props) => props.$theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'});
  }
`;

const SocialIcons = (props) => {
  return (
    <Icons>
      <IconWrapper
        $theme={props.theme}
        initial={{scale:0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <a target="_blank" href={"https://github.com/Abishek-sk46"}>
          <Github
            width={26}
            height={26}
            fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
          />
        </a>
      </IconWrapper>
      <IconWrapper
        $theme={props.theme}
        initial={{scale:0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.2 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <a target="_blank" href={"https://www.linkedin.com/in/abishek-sk/"}>
          <LinkedIn
            width={26}
            height={26}
            fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
          />
        </a>
      </IconWrapper>
      <IconWrapper
        $theme={props.theme}
        initial={{scale:0 }}
        animate={{ scale: [0, 1, 1.5, 1] }}
        transition={{ type: "spring", duration: 1, delay: 1.4 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <a target="_blank" href={"https://leetcode.com/u/SilentCoder46/"}>
          <LeetCode
            width={26}
            height={26}
            fill={props.theme === "dark" ? DarkTheme.text : DarkTheme.body}
          />
        </a>
      </IconWrapper>

      <Line
        $color={props.theme}
        initial={{
          height: 0,
        }}
        animate={{
          height: "8rem",
        }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.8,
        }}
      />
    </Icons>
  );
};

export default SocialIcons;
