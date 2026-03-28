import { Box, Text, Button, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "../../theme/theme";
import HeadingText from "./HeadingText";
import HeroImage from "../../assets/Hero1.png";
import CustomButton from "./CustomButton";
import GlassBox from "./GlassBox";

const MotionBox = motion(Box);

const Hero = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <Box
      w="90%"
      mx="auto"
      minH="100vh"
      py={{ base: 10, md: 16 }}
      pt={{ base: 20, md: 24 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <GlassBox
        as={Flex}
        w="100%"
        px={{ base: 5, md: 12, lg: 24 }}
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "center" }}
        justifyContent="space-between"
        gap={{ base: 8, lg: 10 }}
        py={{ base: 10, md: 16, lg: 20 }}
        flexWrap="nowrap"
        blur="1px"
      >
        <MotionBox
          flex={{ base: "none", lg: 1.2 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          display="flex"
          flexDirection="column"
          gap={theme.spacing.lg}
          alignItems="flex-start"
        >
          <HeadingText
            title="ProCPU"
            subtitle="Visualize, simulate, and compare CPU scheduling algorithms in real time"
            align="left"
            variant="hero"
            hoverColor={theme.colors.accent}
          />
          <HeadingText
            title="Experiment with FCFS, SJF, Round Robin, and Priority Scheduling. Analyze performance metrics and understand how operating systems manage processes efficiently."
            align="left"
            variant="card"
            color={theme.colors.textSecondary}
            glow={false}
            maxW="600px"
          />
          <CustomButton text="Get Started" onClick={handleScroll} />
        </MotionBox>

        <MotionBox
          flex={{ base: "none", lg: 1 }}
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            w="100%"
            maxW={{ base: "100%", md: "500px", lg: "600px" }}
            borderRadius={theme.radii.xl}
            overflow="hidden"
            boxShadow="0 20px 60px rgba(124,58,237,0.25)"
            border="1px solid rgba(124,58,237,0.2)"
            bg={theme.colors.surface}
            aspectRatio={{ base: "16/9", lg: "unset" }}
            _hover={{ boxShadow: `0px 0px 30px ${theme.colors.accentGlow}` }}
            transition="all 0.3s ease-in-out"
          >
            <Image
              src={HeroImage}
              alt="CPU Scheduling Visualization"
              objectFit="cover"
              w="100%"
              h="100%"
              display="block"
            />
          </Box>
        </MotionBox>
      </GlassBox>
    </Box>
  );
};

export default Hero;
