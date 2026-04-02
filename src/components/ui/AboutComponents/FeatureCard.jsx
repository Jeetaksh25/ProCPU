import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import GlassBox from "../GlassComponents/GlassBox";
import { theme } from "../../../theme/theme";

const MotionBox = motion.create(Box);

const FeatureCard = ({ icon: Icon, title, desc, color, index, fadeUp }) => (
  <MotionBox variants={fadeUp} custom={index}>
    <GlassBox
      bg={`${color}0a`}
      border={`1px solid ${color}22`}
      borderRadius="20px"
      p={5}
      h="100%"
      shadowColor={color}
      hoverColor={color}
      transition="all 0.3s ease"
      flexDir="column"
      gap={4}
      blur="2px"
    >
      <Flex align="center" gap={3} wrap="wrap" dir="row">
        <Flex
          w={10}
          h={10}
          borderRadius="12px"
          bg={`${color}18`}
          border={`1px solid ${color}33`}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <Icon size={20} color={color} />
        </Flex>
        <Text
          fontFamily={theme.fonts.heading}
          fontWeight={700}
          fontSize="0.95rem"
          color={color}
        >
          {title}
        </Text>
      </Flex>

      <Text
        fontFamily={theme.fonts.body}
        fontSize="0.82rem"
        color={theme.colors.textMuted}
        lineHeight="1.65"
      >
        {desc}
      </Text>
    </GlassBox>
  </MotionBox>
);

export default FeatureCard;
