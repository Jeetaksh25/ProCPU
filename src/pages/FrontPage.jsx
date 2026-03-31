import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "./../theme/theme";
import { useState, useEffect, useRef } from "react";
import HeadingText from "../components/ui/HeadingText";
import Hero from "../components/ui/Hero";
import ProcessInput from "../components/ui/ProcessInput";
import AlgoInput from "../components/ui/AlgoInput";

const FrontPage = () => {
  const processRef = useRef(null);
  const algoRef = useRef(null);

  return (
    <Box w="100%" minH="100vh" display="flex" flexDirection="column">
      <Hero scrollTargetRef={processRef} />

      <Box ref={processRef}>
        <ProcessInput scrollTargetRef={algoRef} />
      </Box>

      <Box ref={algoRef}>
        <AlgoInput />
      </Box>
    </Box>
  );
};

export default FrontPage;
