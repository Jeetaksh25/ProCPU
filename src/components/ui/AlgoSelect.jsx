import { Flex, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProcessStore } from "../../store/processStore";
import CustomButton from "./CustomButton";
import GlassBox from "./GlassBox";
import { theme } from "../../theme/theme";
import GlassInput from "./GlassInput";
import HeadingText from "./HeadingText";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const MotionGlassBox = motion(GlassBox);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      mass: 0.5,
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const AlgoSelect = () => {
  return (
    <GlassBox
      flexDir="column"
      gap={theme.spacing.lg}
      p={6}
      flex="1"
      minW="320px"
      maxW="500px"
      blur="2px"
      alignSelf="stretch"
    >
      <HeadingText
        title={"Select an Algorithm"}
        subtitle={"Select an algorithm to visualize and analyze CPU scheduling"}
        color={theme.colors.primary}
        variant="card"
        mb="0px"
      />
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        display="flex"
        flexDir="column"
        gap={4}
      >
        
      </MotionBox>
    </GlassBox>
  );
};

export default AlgoSelect;
