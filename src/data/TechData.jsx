import React from 'react';

import reactIcon from '../assets/icons/react_dark.svg';
import nextjsIcon from '../assets/icons/nextjs_icon_dark.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import jsIcon from '../assets/icons/javascript.svg';
import tsIcon from '../assets/icons/typescript.svg';

import djangoIcon from '../assets/icons/django.svg';

import mysqlIcon from '../assets/icons/mysql-icon-dark.svg';
import mongoIcon from '../assets/icons/mongodb-icon-dark.svg';

import openaiIcon from '../assets/icons/openai_dark.svg';
import langchainIcon from '../assets/icons/langchain-logo.svg';

import gitIcon from '../assets/icons/git.svg';
import githubIcon from '../assets/icons/github_dark.svg';

// PLACEHOLDER SVG COMPONENT
// For items that don't have an icon yet (like REST APIs and JWT)
const PlaceholderIcon = ({ color }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="20" cy="20" r="10" fill={color} fillOpacity="0.5" />
  </svg>
);

export const TechStackData = [
  // ================= FRONTEND =================
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    color: '#61DAFB',
    Icon: (props) => <img src={reactIcon} alt="React" {...props} />
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    color: '#FFFFFF',
    Icon: (props) => <img src={nextjsIcon} alt="Next.js" {...props} />
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    color: '#38B2AC',
    Icon: (props) => <img src={tailwindIcon} alt="Tailwind CSS" {...props} />
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    color: '#F7DF1E',
    Icon: (props) => <img src={jsIcon} alt="JavaScript" {...props} />
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    color: '#3178C6',
    Icon: (props) => <img src={tsIcon} alt="TypeScript" {...props} />
  },

  // ================= BACKEND =================
  {
    id: 'django',
    name: 'Django',
    category: 'Backend',
    color: '#092E20',
    Icon: (props) => <img src={djangoIcon} alt="Django" {...props} />
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'Backend',
    color: '#009688',
    Icon: (props) => <PlaceholderIcon color="#009688" {...props} />
  },
  {
    id: 'jwt',
    name: 'JWT/Auth',
    category: 'Backend',
    color: '#FF0000',
    Icon: (props) => <PlaceholderIcon color="#FF0000" {...props} />
  },

  // ================= DATABASES =================
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases',
    color: '#4479A1',
    Icon: (props) => <img src={mysqlIcon} alt="MySQL" {...props} />
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    color: '#47A248',
    Icon: (props) => <img src={mongoIcon} alt="MongoDB" {...props} />
  },

  // ================= AI / LLM =================
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'AI / LLM',
    color: '#412991',
    Icon: (props) => <img src={openaiIcon} alt="OpenAI API" {...props} />
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'AI / LLM',
    color: '#121212',
    Icon: (props) => <img src={langchainIcon} alt="LangChain" {...props} />
  },

  // ================= TOOLS =================
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    color: '#F05032',
    Icon: (props) => <img src={gitIcon} alt="Git" {...props} />
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    color: '#FFFFFF',
    Icon: (props) => <img src={githubIcon} alt="GitHub" {...props} />
  }
];
