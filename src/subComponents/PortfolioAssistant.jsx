import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const AssistantContainer = styled.div`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OrbButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9a44 0%, #fc6076 100%);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 25px rgba(255, 154, 68, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.5rem;
  outline: none;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid rgba(255, 154, 68, 0.5);
    opacity: 0;
    animation: pulseGlow 2.5s infinite;
  }

  @keyframes pulseGlow {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.4); opacity: 0; }
  }
`;

const ChatPanel = styled(motion.div)`
  width: 320px;
  margin-bottom: 1.5rem;
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 154, 68, 0.3);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 154, 68, 0.15);
  display: flex;
  flex-direction: column;
  color: #e2e8f0;
  font-family: 'Karla', sans-serif;
  transform-origin: bottom right;
`;

const ChatHeader = styled.div`
  padding: 1.2rem;
  background: linear-gradient(90deg, rgba(255, 154, 68, 0.15) 0%, rgba(252, 96, 118, 0.05) 100%);
  border-bottom: 1px solid rgba(255, 154, 68, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1.05rem;
    color: #ffb170;
    text-shadow: 0 0 10px rgba(255, 154, 68, 0.4);
  }

  .close-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #fff;
      transform: scale(1.1) rotate(90deg);
    }
  }
`;

const ChatBody = styled.div`
  padding: 1.5rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BotMessage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px 12px 12px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  border-left: 3px solid #ff9a44;
  box-shadow: inset 0 0 10px rgba(255, 154, 68, 0.05);
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0 1.2rem 1.5rem;
`;

const OptionChip = styled(motion.button)`
  background: rgba(255, 154, 68, 0.08);
  border: 1px solid rgba(255, 154, 68, 0.2);
  color: rgba(255, 255, 255, 0.85);
  padding: 0.7rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 154, 68, 0.2);
    border-color: rgba(255, 154, 68, 0.5);
    color: #fff;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(255, 154, 68, 0.15);
  }
`;

const initialMessage = "Hello! I'm the system AI. How can I assist you with Abishek's portfolio today?";

const predefinedResponses = {
  "Tell me about your projects": "Abishek has built several innovative frontend projects exploring interactive UI/UX and AI systems. You can check them out in the Projects section!",
  "What tech stack do you use?": "The core stack includes React, Styled-Components, Framer Motion for animations, and Vite for fast builds. It's designed for immersive, high-performance web experiences.",
  "Show resume": "You can view or download the resume directly from the top-right corner of the screen using the Resume button.",
  "Contact Abishek": "You can reach out by clicking the 'Say hi' button in the top-right corner, or navigating to the About page.",
  "What are your strongest skills?": "My strongest areas are frontend architecture, creating cinematic web experiences with React and Framer Motion, and integrating modern design systems."
};

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(initialMessage);

  const handleOptionClick = (question) => {
    setCurrentMessage(predefinedResponses[question]);
  };

  return (
    <AssistantContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          >
            <ChatHeader>
              <div className="title">
                <FaRobot /> System AI
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close Assistant">
                <FiX />
              </button>
            </ChatHeader>
            <ChatBody>
              <AnimatePresence mode="wait">
                <BotMessage
                  key={currentMessage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentMessage}
                </BotMessage>
              </AnimatePresence>
            </ChatBody>
            <OptionsContainer>
              {Object.keys(predefinedResponses).map((question, index) => (
                <OptionChip
                  key={index}
                  onClick={() => handleOptionClick(question)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                >
                  {question}
                </OptionChip>
              ))}
            </OptionsContainer>
          </ChatPanel>
        )}
      </AnimatePresence>

      <OrbButton
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setCurrentMessage(initialMessage);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle AI Assistant"
      >
        <FaRobot />
      </OrbButton>
    </AssistantContainer>
  );
};

export default PortfolioAssistant;
