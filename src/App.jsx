import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/Themes";
import { AnimatePresence } from "motion/react";
import GlobalStyle from "./globalStyles";

//Components
import Main from "./components/Main";
import PortfolioScroll from "./components/PortfolioScroll";

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={lightTheme}>
        {/* <SoundBar /> */}

        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/portfolio" element={<PortfolioScroll />} />
            {/* Catch-all: send unknown routes to Main */}
            <Route path="*" element={<Main />} />
          </Routes>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

export default App;
