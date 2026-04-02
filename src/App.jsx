import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "./theme/theme.jsx";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import FrontPage from "./pages/FrontPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Background from "./components/ui/OtherUI/Background.jsx";
import CursorHighlight from "./components/ui/OtherUI/CursorHighlight.jsx";
import NavBar from "./components/ui/OtherUI/NavBar.jsx";
import ScrollToTop from "./components/utils/ScrollToTop";

const App = () => {
  const location = useLocation();

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <Box w="100%" h="100%" position="relative">
      <Background />

      <Box position="relative" zIndex={1} pb={20}>
        <NavBar />
        <AnimatePresence mode="wait">
          <ScrollToTop />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<FrontPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </Box>

      <CursorHighlight pos={pos} />
    </Box>
  );
};

export default App;
