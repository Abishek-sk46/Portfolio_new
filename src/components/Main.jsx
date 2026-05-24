import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons from '../subComponents/SocialIcons'


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



const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
`;

const floatAnimationClick = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(0.4) translateY(0); }
  50% { transform: translate(-50%, -50%) scale(0.4) translateY(-10px); }
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
  top: ${props => props.$click ? '85%' : '50%'};
  left: ${props => props.$click ? '92%' : '50%'};
  animation: ${props => props.$click ? floatAnimationClick : floatAnimation} 6s infinite ease-in-out;
  
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
  transition: all 1s cubic-bezier(0.86, 0, 0.07, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: ${props => props.$click ? 'pointer' : 'default'};
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
     border: 1px solid rgba(255, 255, 255, ${props => props.$click ? '0.3' : '0.2'});
     box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .content {
    opacity: ${props => props.$click ? 0 : 1};
    transition: opacity 0.5s ease;
    display: flex;
    flex-direction: column;
    flex: 1;
    pointer-events: ${props => props.$click ? 'none' : 'auto'};
    z-index: 1; 
  }

  .minimized {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.$click ? 1 : 0};
    transition: opacity 0.5s ease 0.5s;
    pointer-events: ${props => props.$click ? 'auto' : 'none'};
    z-index: 10;
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

const morph = keyframes`
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const InteractionZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  
  .label {
    position: absolute;
    top: 30px;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.15em;
    font-family: 'Fira Code', monospace;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.4s ease;
  }

  .orb-container {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    cursor: crosshair;
    
    &:hover .orb1 {
      background: linear-gradient(120deg, #ff0844 0%, #ffb199 100%);
      box-shadow: 0 0 50px rgba(255, 8, 68, 0.6);
      transform: scale(1.15) rotate(45deg);
    }
    
    &:hover .orb2 {
      background: linear-gradient(120deg, #4facfe 0%, #00f2fe 100%);
      transform: scale(1.15) rotate(-45deg);
    }
    
    &:hover ~ .label {
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }

  .orb1, .orb2 {
    position: absolute;
    width: 100%;
    height: 100%;
    mix-blend-mode: screen;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .orb1 {
    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    animation: ${morph} 8s ease-in-out infinite, ${rotate} 20s linear infinite;
    box-shadow: 0 0 30px rgba(132, 250, 176, 0.3);
  }

  .orb2 {
    background: linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%);
    animation: ${morph} 10s ease-in-out infinite reverse, ${rotate} 25s linear infinite reverse;
    opacity: 0.8;
  }
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
      <div className="minimized">
        <InteractionZone>
           <div className="orb-container">
               <div className="orb1"></div>
               <div className="orb2"></div>
           </div>
           <div className="label">Interaction Zone</div>
        </InteractionZone>
      </div>
    </TerminalCard>
    </>
  );
};



const Main = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClick(true);
        setTimeout(() => {
            navigate('/portfolio');
        }, 1200); // Wait for the terminal morphing animation before routing
    };

    return (
        <MainContainer>
            <Container>
                <LogoComponent theme='light' />
                <SocialIcons theme='light' />
                <TypewriterTerminal click={click} onClick={handleClick} />
            </Container>
        </MainContainer>
    )
}

export default Main
