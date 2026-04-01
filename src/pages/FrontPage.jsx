import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "./../theme/theme";
import { useState, useEffect, useRef } from "react";
import HeadingText from "../components/ui/OtherUI/HeadingText";
import Hero from "../components/ui/PageComponents/Hero";
import ProcessInput from "../components/ui/PageComponents/ProcessInput";
import AlgoInput from "../components/ui/PageComponents/AlgoInput";
import Simulation from "../components/ui/PageComponents/Simulation";

const FrontPage = () => {
  const processRef = useRef(null);
  const algoRef = useRef(null);
  const simluationRef = useRef(null);
  const statsRef = useRef(null);

  return (
    <Box w="100%" minH="100vh" display="flex" flexDirection="column">
      <Hero scrollTargetRef={processRef} />

      <Box ref={processRef}>
        <ProcessInput scrollTargetRef={algoRef} />
      </Box>

      <Box ref={algoRef}>
        <AlgoInput scrollTargetRef={simluationRef} />
      </Box>

      <Box ref={simluationRef}>
        <Simulation scrollTargetRef={statsRef} />
      </Box>
    </Box>
  );
};

export default FrontPage;
