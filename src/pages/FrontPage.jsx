import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "./../theme/theme";
import { useState, useEffect, useRef } from "react";
import HeadingText from "../components/ui/HeadingText";
import Hero from "../components/ui/Hero";
import ProcessInput from "../components/ui/ProcessInput";

const FrontPage = () => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Hero />
      <ProcessInput />
    </Box>
  );
};

export default FrontPage;
