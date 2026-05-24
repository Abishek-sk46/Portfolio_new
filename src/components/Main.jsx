import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { FiDownload } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PortfolioAssistant from '../subComponents/PortfolioAssistant'
// import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'

import Intro from './Intro'
    ;


const MainContainer = styled.div`
background: ${props => props.theme.body};
width: 100vw;
height: 100vh;
overflow:hidden;

position: relative;

h2,h3,h4,h5,h6{
  font-family:'Karla', sans-serif ;
  font-weight:500;
}
`

const Container = styled.div`
padding: 2rem;
`

const TopRightControls = styled.div`
  position: absolute;
  top: 2rem;
  right: calc(1rem + 2vw);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1;
`

const ResumeBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  
  background: ${props => `linear-gradient(135deg, rgba(${props.theme.textRgba}, 0.05) 0%, rgba(${props.theme.textRgba}, 0.15) 100%)`};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.3)`};
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  box-shadow: 0 4px 15px ${props => `rgba(${props.theme.bodyRgba}, 0.2)`};
  
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  .icon {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: ${props => `linear-gradient(135deg, rgba(${props.theme.textRgba}, 0.1) 0%, rgba(${props.theme.textRgba}, 0.25) 100%)`};
    border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.5)`};
    box-shadow: 0 8px 25px ${props => `rgba(${props.theme.textRgba}, 0.3)`}, inset 0 0 10px ${props => `rgba(${props.theme.textRgba}, 0.1)`};
    
    .icon {
      transform: translateY(2px);
    }
  }
`

const Contact = styled(NavLink)`
color: ${props => props.theme.text};
text-decoration: none;
`
const BLOG = styled(NavLink)`
color: ${props => props.theme.text};
position: absolute;
top: 45%;
right: calc(1rem + 2vw);
transform: translate(50%, -50%) rotate(90deg);
text-decoration: none;
z-index:1;
`
const WORK = styled(NavLink)`
color: ${props => props.$click ? props.theme.body : props.theme.text};

position: absolute;
top: 45%;
left: calc(1rem + 2vw);
transform: translate(-50%, -50%) rotate(-90deg) ;
text-decoration: none;
z-index:1;
`

const BottomBar = styled.div`
position: absolute;
bottom: 1rem;
left: 0;
right: 0;
width: 100%;

display: flex;
justify-content: space-evenly;
`

const ABOUT = styled(NavLink)`
color: ${props => props.$click ? props.theme.body : props.theme.text};
text-decoration: none;
z-index:1;
`
const SKILLS = styled(NavLink)`
color: ${props => props.theme.text};
text-decoration: none;
z-index:1;
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
`;

const ripple = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
  70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

const mouseMove = keyframes`
  0%, 100% { transform: translate(15px, 15px); opacity: 0; }
  20% { transform: translate(15px, 15px); opacity: 0; }
  50% { transform: translate(0, 0); opacity: 0.8; }
  80% { transform: translate(0, 0); opacity: 0.8; }
  90% { transform: translate(0, 0) scale(0.9); opacity: 1; }
`;

const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

const AmbientGlow = styled.div`
  position: absolute;
  top: ${props => props.$click ? '85%' : '50%'};
  left: ${props => props.$click ? '92%' : '50%'};
  width: ${props => props.$click ? '0' : '600px'};
  height: ${props => props.$click ? '0' : '400px'};
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
  animation: ${pulseGlow} 4s infinite ease-in-out;
  transition: all 1s cubic-bezier(0.86, 0, 0.07, 1);
  opacity: ${props => props.$click ? 0 : 1};
`;

const TerminalCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${floatAnimation} 6s infinite ease-in-out;
  
  background: rgba(15, 15, 15, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  color: #e2e8f0;
  font-family: 'Ubuntu Mono', monospace;
  width: 500px;
  max-width: 90vw;
  min-height: 280px;
  z-index: 2;
  transition: opacity 0.8s ease;
  opacity: ${props => props.$click ? 0 : 1};
  pointer-events: ${props => props.$click ? 'none' : 'auto'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${grainTexture};
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
     border: 1px solid rgba(255, 255, 255, 0.2);
     box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    z-index: 1; 
  }
  
  .line {
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 0.5rem;
  }
  
  .prompt {
    color: rgba(255, 255, 255, 0.3);
    margin-right: 0.8rem;
  }

  span.cursor {
    display: inline-block;
    width: 10px;
    height: 1.2em;
    background-color: #e2e8f0;
    margin-left: 4px;
    vertical-align: middle;
    animation: ${blink} 1s step-end infinite;
  }
`;

const ActionWrapper = styled(motion.div)`
  margin-top: auto;
  padding-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  position: relative;
  align-self: flex-start;
`;

const ActionLine = styled.div`
  font-size: 1.15rem;
  color: #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.9;
  transition: all 0.4s ease;
  padding: 0.5rem 1rem;
  margin-left: -1rem; 
  border-radius: 8px;

  &:hover {
    opacity: 1;
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05); 
  }

  animation: ${ripple} 3s infinite;

  .bracket {
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.4s ease;
    margin: 0 4px;
  }

  &:hover .bracket {
    color: rgba(255, 255, 255, 0.8);
  }

  .action-cursor {
    display: inline-block;
    width: 10px;
    height: 1.2em;
    background-color: #e2e8f0;
    margin-left: 10px;
    animation: ${blink} 1s step-end infinite;
    transition: all 0.3s ease;
  }

  &:hover .action-cursor {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    animation: ${blink} 0.5s step-end infinite; 
  }
`;

const MouseIcon = styled.svg`
  position: absolute;
  right: -35px;
  top: 50%;
  margin-top: -12px;
  width: 24px;
  height: 24px;
  fill: rgba(255, 255, 255, 0.1);
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${mouseMove} 3s infinite ease-in-out;
  pointer-events: none;
`;



const terminalLines = [
  "Hi, I'm Abishek.",
  "Frontend-focused developer.",
  "Exploring AI systems."
];
const promptLine = "ready to explore?";

const TypewriterTerminal = ({ click, onClick }) => {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptCharIndex, setPromptCharIndex] = useState(0);
  const [showAction, setShowAction] = useState(false);

  useEffect(() => {
    if (click) return; 
    
    if (currentLineIndex < terminalLines.length) {
      if (currentCharIndex < terminalLines[currentLineIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 40); 
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTypedLines(prev => [...prev, terminalLines[currentLineIndex]]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 300); 
        return () => clearTimeout(timeout);
      }
    } else if (!showPrompt && !showAction) {
       const timeout = setTimeout(() => {
          setShowPrompt(true);
       }, 600);
       return () => clearTimeout(timeout);
    } else if (showPrompt && promptCharIndex < promptLine.length) {
       const timeout = setTimeout(() => {
          setPromptCharIndex(prev => prev + 1);
       }, 40);
       return () => clearTimeout(timeout);
    } else if (showPrompt && promptCharIndex === promptLine.length && !showAction) {
       const timeout = setTimeout(() => {
          setShowAction(true);
       }, 400);
       return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, click, showPrompt, promptCharIndex, showAction]);

  return (
    <>
    <AmbientGlow $click={click} />
    <TerminalCard $click={click} onClick={click ? onClick : undefined}>
      <div className="content">
        {typedLines.map((line, i) => (
          <div key={i} className="line">
            <span className="prompt">{'>'}</span>{line}
          </div>
        ))}
        {!showPrompt && currentLineIndex < terminalLines.length && (
          <div className="line">
            <span className="prompt">{'>'}</span> 
            {terminalLines[currentLineIndex]?.substring(0, currentCharIndex)}
            <span className="cursor"></span>
          </div>
        )}
        {showPrompt && (
          <div className="line">
            <span className="prompt">{'>'}</span>
            {promptLine.substring(0, promptCharIndex)}
            {!showAction && <span className="cursor"></span>}
          </div>
        )}
        {showAction && (
          <ActionWrapper 
            onClick={onClick} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
          >
            <ActionLine>
              <span className="bracket">[</span> explore portfolio <span className="bracket">]</span> <span className="action-cursor"></span>
            </ActionLine>
            <MouseIcon viewBox="0 0 24 24">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="M13 13l6 6" />
            </MouseIcon>
          </ActionWrapper>
        )}
      </div>
    </TerminalCard>
    </>
  );
};

const DarkDiv = styled.div`
position: absolute;
top: 0;
background-color: #000;
bottom: 0;
right: 50%;
width: ${props => props.$click ? '50%' : '0%'};
height: ${props => props.$click ? '100%' : '0%'};
z-index:1;
transition: height 0.5s ease, width 1s ease 0.5s;
`


const Main = () => {

    const [isReturningSession] = useState(() => sessionStorage.getItem('portfolioEntered') === 'true');

    const [click, setClick] = useState(isReturningSession);

    const handleClick = () => {
        setClick(!click);
        if (!click) {
            sessionStorage.setItem('portfolioEntered', 'true');
        } else {
            sessionStorage.removeItem('portfolioEntered');
        }
    };

    return (
        <MainContainer>
            <DarkDiv $click={click} />
            <Container>
                {/* <PowerButton /> */}
                <LogoComponent theme={click ? 'dark' : 'light'} />
                <SocialIcons theme={click ? 'dark' : 'light'} />

                <TypewriterTerminal click={click} onClick={handleClick} />

                <TopRightControls>
                    <ResumeBtn
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={isReturningSession ? false : {
                            y: -200,
                            transition: { type: 'spring', duration: 1.5, delay: 1 }
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiDownload className="icon" /> Resume
                    </ResumeBtn>
                    <Contact to="/contact">
                        <motion.h2
                            initial={isReturningSession ? false : {
                                y: -200,
                                transition: { type: 'spring', duration: 1.5, delay: 1 }
                            }}
                            animate={{
                                y: 0,
                                transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}

                        >
                            Say hi..
                        </motion.h2>
                    </Contact>
                </TopRightControls>
                <BLOG to="/experience">
                    <motion.h2
                        initial={isReturningSession ? false : {
                            y: -200,
                            transition: { type: 'spring', duration: 1.5, delay: 1 }
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Experience
                    </motion.h2>
                </BLOG>
                <WORK to="/work" $click={click}>
                    <motion.h2
                        initial={isReturningSession ? false : {
                            y: -200,
                            transition: { type: 'spring', duration: 1.5, delay: 1 }
                        }}
                        animate={{
                            y: 0,
                            transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Projects
                    </motion.h2>
                </WORK>
                <BottomBar>
                    <ABOUT to="/about" $click={click}>
                        <motion.h2
                            initial={isReturningSession ? false : {
                                y: 200,
                                transition: { type: 'spring', duration: 1.5, delay: 1 }
                            }}
                            animate={{
                                y: 0,
                                transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            About.
                        </motion.h2>
                    </ABOUT>
                    <SKILLS to="/skills">
                        <motion.h2
                            initial={isReturningSession ? false : {
                                y: 200,
                                transition: { type: 'spring', duration: 1.5, delay: 1 }
                            }}
                            animate={{
                                y: 0,
                                transition: { type: 'spring', duration: 1.5, delay: isReturningSession ? 0 : 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            My Skills.
                        </motion.h2>
                    </SKILLS>

                </BottomBar>

            </Container>
            {click ? <Intro click={click} isReturning={isReturningSession} /> : null}
            <PortfolioAssistant />
        </MainContainer>
    )
}

export default Main
