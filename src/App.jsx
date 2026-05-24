import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import { AnimatePresence } from "motion/react";
import GlobalStyle from "./globalStyles";

//Components
import Main from "./components/Main";
import AboutPage from "./components/AboutPage";
import ExperiencePage from "./components/ExperiencePage";
import WorkPage from "./components/WorkPage";
import MySkillsPage from "./components/MySkillsPage";
import ContactPage from "./components/ContactPage";
// import SoundBar from "./subComponents/SoundBar";

function App() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Abishek — Full Stack Engineer";
        break;
      case "/about":
        document.title = "About — Abishek";
        break;
      case "/work":
        document.title = "Projects — Abishek";
        break;
      case "/experience":
        document.title = "Experience — Abishek";
        break;
      case "/skills":
        document.title = "Skills — Abishek";
        break;
      case "/contact":
        document.title = "Say Hi — Abishek";
        break;
      default:
        document.title = "Abishek — Full Stack Engineer";
        break;
    }
  }, [location.pathname]);
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        {/* <SoundBar /> */}

        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/skills" element={<MySkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all: send unknown routes to Main */}
            <Route path="*" element={<Main />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
