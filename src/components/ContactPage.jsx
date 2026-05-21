import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DarkTheme } from './Themes';
import { motion } from 'motion/react';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';

const Box = styled.div`
  background-color: ${props => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(140px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.5;
  }
  
  &::before {
    top: -10%;
    left: 10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(255, 87, 34, 0.08) 0%, transparent 60%);
  }
  
  &::after {
    bottom: -10%;
    right: 5%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(76, 175, 80, 0.05) 0%, transparent 60%);
  }
`;

const Container = styled.div`
  display: flex;
  width: 85vw;
  max-width: 1200px;
  height: 80vh;
  gap: 2rem;
  z-index: 3;
  margin-top: 5vh;

  @media (max-width: 968px) {
    flex-direction: column;
    height: auto;
    gap: 2rem;
    margin-top: 15vh;
    padding-bottom: 5vh;
  }
`;

const TerminalWindow = styled(motion.div)`
  flex: 1;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  ${props => props.$fitContent && `
    height: max-content;
    align-self: flex-start;
  `}
`;

const Header = styled.div`
  background: rgba(25, 25, 25, 0.95);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Dots = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-right: auto;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &:nth-child(1) { background: #ff5f56; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #27c93f; }
  }
`;

const Tab = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .ts {
    color: #3178c6;
    font-weight: bold;
  }
`;

const ContentArea = styled.div`
  padding: 2rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const CodeLine = styled.div`
  display: flex;
  gap: 1.5rem;

  .num {
    color: rgba(255, 255, 255, 0.2);
    user-select: none;
    width: 1.5rem;
    text-align: right;
  }
  
  .code {
    color: rgba(255, 255, 255, 0.8);
    .key { color: #ff79c6; }
    .string { color: #f1fa8c; }
    .punct { color: #f8f8f2; }
    .comment { color: #6272a4; }
  }
`;

const FormArea = styled.div`
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

const SecureChannel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;

  .left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    svg {
      fill: #ff5f56;
      width: 16px;
    }
  }

  .right {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

  label {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  input, textarea {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 0.6rem 0.8rem;
    color: #fff;
    font-family: 'Karla', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(0, 0, 0, 0.4);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
  }

  textarea {
    resize: none;
    min-height: 80px;
  }
`;

const SubmitBtn = styled(motion.button)`
  background: rgba(255, 87, 34, 0.1);
  border: 1px solid rgba(255, 87, 34, 0.3);
  color: #ff5722;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 87, 34, 0.2);
    box-shadow: 0 0 20px rgba(255, 87, 34, 0.2);
  }
  
  svg {
    fill: currentColor;
    width: 16px;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, logic goes here
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const jsonLines = [
    { type: 'punct', text: '{' },
    { type: 'prop', key: '"status"', val: '"open_to_work"', comma: true },
    { type: 'prop', key: '"email"', val: '"hello@developer.com"', comma: true },
    { type: 'prop', key: '"socials"', val: '{', comma: false },
    { type: 'prop', key: '"github"', val: '"@developer"', indent: true, comma: true },
    { type: 'prop', key: '"linkedin"', val: '"@developer-in"', indent: true, comma: true },
    { type: 'prop', key: '"twitter"', val: '"@developer_x"', indent: true, comma: false },
    { type: 'punct', text: '  },' },
    { type: 'prop', key: '"location"', val: '"Earth"', comma: false },
    { type: 'punct', text: '}' },
    { type: 'empty' },
    { type: 'comment', text: '// Waiting for connection ...' }
  ];

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme='dark'/>
        <SocialIcons theme='dark'/>

        <Container>
          {/* Left Window - JSON */}
          <TerminalWindow
            $fitContent={true}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Header>
              <Dots>
                <span></span><span></span><span></span>
              </Dots>
              <Tab>{'</>'} contact_info.json</Tab>
            </Header>
            <ContentArea>
              {jsonLines.map((line, idx) => (
                <CodeLine key={idx}>
                  <div className="num">{idx + 1}</div>
                  <div className="code">
                    {line.type === 'punct' && <span className="punct">{line.text}</span>}
                    {line.type === 'empty' && <span>&nbsp;</span>}
                    {line.type === 'comment' && <span className="comment">{line.text}</span>}
                    {line.type === 'prop' && (
                      <span style={{ paddingLeft: line.indent ? '2rem' : '1rem' }}>
                        <span className="key">{line.key}</span>
                        <span className="punct">: </span>
                        <span className={line.val === '{' ? 'punct' : 'string'}>{line.val}</span>
                        {line.comma && <span className="punct">,</span>}
                      </span>
                    )}
                  </div>
                </CodeLine>
              ))}
            </ContentArea>
          </TerminalWindow>

          {/* Right Window - Form */}
          <TerminalWindow
            $fitContent={true}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Header>
              <Tab style={{ marginRight: 'auto' }}><span className="ts">TS</span> sendMessage.ts</Tab>
            </Header>
            <FormArea as="form" onSubmit={handleSubmit}>
              <SecureChannel>
                <div className="left">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  mail.compose
                </div>
                <div className="right">secure channel</div>
              </SecureChannel>
              
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', paddingBottom: '0.5rem' }}>
                <span style={{color: 'rgba(255,255,255,0.4)'}}>to:</span> hello@developer.com
                <span style={{float: 'right', color: 'rgba(255,255,255,0.4)'}}>response: <span style={{color: '#27c93f'}}>within 24h</span></span>
              </div>

              <FormRow>
                <InputGroup>
                  <label>Name</label>
                  <input type="text" name="name" required placeholder="Your Name" value={formData.name} onChange={handleChange} />
                </InputGroup>
                <InputGroup>
                  <label>Email</label>
                  <input type="email" name="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                </InputGroup>
              </FormRow>

              <InputGroup>
                <label>Subject</label>
                <input type="text" name="subject" required placeholder="Project inquiry / Collaboration" value={formData.subject} onChange={handleChange} />
              </InputGroup>

              <InputGroup>
                <label>Message</label>
                <textarea name="message" required placeholder="Tell me about your project, timeline, and goals..." value={formData.message} onChange={handleChange} />
              </InputGroup>

              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                // Protected by spam filters and rate limits
              </div>

              <SubmitBtn whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit">
                <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                Send Message
              </SubmitBtn>
            </FormArea>
          </TerminalWindow>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactPage;
