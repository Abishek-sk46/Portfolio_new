import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { motion } from 'motion/react';

const float1 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  margin-top: -2rem; /* offset the bottom alignment of old image */
`;

const LaptopBase = styled(motion.div)`
  width: 320px;
  height: 200px;
  background: #1e1e1e;
  border-radius: 12px;
  border: 4px solid #444;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(97, 218, 251, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 10;
  
  /* Laptop bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: -12px;
    right: -12px;
    height: 14px;
    background: #333;
    border-radius: 0 0 16px 16px;
    border-top: 2px solid #555;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  }

  /* Trackpad indent */
  &::before {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #222;
    border-radius: 2px 2px 0 0;
    z-index: 11;
  }
`;

const ScreenBar = styled.div`
  height: 24px;
  background: #2d2d2d;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  border-bottom: 1px solid #111;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color || '#ff5f56'};
  box-shadow: 0 0 5px ${props => props.$color}88;
`;

const CodeEditor = styled.div`
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  background: #1e1e1e;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  position: relative;
`;

const CodeLineWrapper = styled(motion.div)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CodeBlock = styled.div`
  height: 10px;
  background: ${props => props.$color || '#4b69c6'};
  width: ${props => props.$width || '50%'};
  border-radius: 5px;
  box-shadow: 0 0 8px ${props => props.$color}44;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  z-index: ${props => props.$z || 5};
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
  animation: ${props => props.$reverse ? float2 : float1} ${props => props.$duration || '3s'} ease-in-out infinite;
`;

const Glow = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  background: ${props => props.$color || '#61dafb'};
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.15;
  animation: ${pulse} 4s ease-in-out infinite;
  z-index: 1;
`;

const FloatingWorkspace = () => {
  const theme = useTheme();
  
  return (
    <Container>
      {/* Background glow effects */}
      <Glow $color="#61dafb" style={{ top: '15%', left: '15%' }} />
      <Glow $color="#bd93f9" style={{ bottom: '15%', right: '15%' }} />



      {/* Floating Elements */}
      <FloatingIcon style={{ top: '5%', left: '15%' }} $duration="4s" $z={15}>
        <svg width="60" height="60" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5"/>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
          </g>
        </svg>
      </FloatingIcon>
      
      {/* Replaced SJ with explicit text-based JS Icon */}
      <FloatingIcon style={{ top: '25%', right: '12%' }} $duration="3.5s" $reverse $z={12}>
        <div style={{
            width: '45px', height: '45px', 
            backgroundColor: '#F7DF1E', color: '#000', 
            display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
            padding: '4px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif',
            borderRadius: '6px', boxShadow: '0 5px 15px rgba(247,223,30,0.3)'
        }}>
          JS
        </div>
      </FloatingIcon>

      <FloatingIcon style={{ bottom: '20%', left: '8%' }} $duration="5s" $z={14}>
        <div style={{ fontSize: '48px', color: '#ff79c6', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 15px rgba(255,121,198,0.4)' }}>
          {"</>"}
        </div>
      </FloatingIcon>
      
      <FloatingIcon style={{ bottom: '15%', right: '20%' }} $duration="4.5s" $reverse $z={13}>
         <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#50fa7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(80,250,123,0.4))' }}>
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
         </svg>
      </FloatingIcon>

      <FloatingIcon style={{ top: '45%', left: '2%' }} $duration="6s" $z={8}>
        <div style={{ fontSize: '42px', color: '#f1fa8c', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 15px rgba(241,250,140,0.4)' }}>
          {"{ }"}
        </div>
      </FloatingIcon>

      <FloatingIcon style={{ top: '60%', right: '5%' }} $duration="5.5s" $z={12}>
        <div style={{ fontSize: '32px', color: '#8be9fd', fontWeight: 'bold', fontFamily: 'monospace', textShadow: '0 0 15px rgba(139,233,253,0.4)' }}>
          {"#"}
        </div>
      </FloatingIcon>



      {/* Main Laptop */}
      <LaptopBase
        initial={{ y: 50, opacity: 0, rotateX: 10 }}
        animate={{ y: [0, -10, 0], opacity: 1, rotateX: 0 }}
        transition={{ 
            opacity: { duration: 0.8 },
            rotateX: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
        }}
      >
        <ScreenBar>
          <Dot $color="#ff5f56" />
          <Dot $color="#ffbd2e" />
          <Dot $color="#27c93f" />
        </ScreenBar>
        <CodeEditor>
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <CodeBlock $width="35%" $color="#ff79c6" />
            <CodeBlock $width="20%" $color="#8be9fd" />
          </CodeLineWrapper>
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <CodeBlock $width="60%" $color="#50fa7b" />
          </CodeLineWrapper>
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <CodeBlock $width="15%" $color="#ffb86c" />
            <CodeBlock $width="40%" $color="#f8f8f2" />
          </CodeLineWrapper>
          <div style={{ margin: '6px 0' }} />
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
            <CodeBlock $width="50%" $color="#bd93f9" />
          </CodeLineWrapper>
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
            <CodeBlock $width="25%" $color="#ff79c6" />
            <CodeBlock $width="45%" $color="#f1fa8c" />
          </CodeLineWrapper>
          <CodeLineWrapper initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
            <CodeBlock $width="40%" $color="#8be9fd" />
          </CodeLineWrapper>
        </CodeEditor>
      </LaptopBase>
    </Container>
  )
}

export default FloatingWorkspace;
