import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "../../../theme/theme";
import { hexToRgba } from "../../../functions/color";
import GlassBox from "../GlassComponents/GlassBox";

const MotionBox = motion(Box);

const GantChart = ({handlePrevious, handleNext, handlePlayPause, handleReset}) => {
  return (
    <GlassBox
      flexDir="column"
      gap={2}
      p={6}
      flex="1"
      minW="320px"
      userSelect="none"
      blur="2px"
    ></GlassBox>
  );
};

export default GantChart;