import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import GlassBox from "../GlassComponents/GlassBox";
import { theme } from "../../../theme/theme";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const MotionBox = motion.create(Box);

const AlgoCard = ({
  title,
  formula,
  preemptive,
  pros,
  cons,
  color,
  index,
  badge,
  fadeUp,
}) => (
  <MotionBox variants={fadeUp} custom={index}>
    <GlassBox
      bg={`${color}07`}
      border={`1px solid ${color}25`}
      borderRadius="22px"
      p={6}
      h="100%"
      flexDir="column"
      gap={4}
      shadowColor={color}
      blur="2px"
      hoverColor={color}
    >
      <Flex justify="space-between" align="flex-start" wrap="wrap" gap={2}>
        <Text
          fontFamily={theme.fonts.heading}
          fontWeight={800}
          fontSize="1rem"
          color={color}
          lineHeight="1.3"
        >
          {title}
        </Text>
        <Badge
          px={2}
          py={0.5}
          borderRadius="full"
          fontSize="0.68rem"
          bg={
            preemptive
              ? `${theme.colors.accent}22`
              : `${theme.colors.primary}22`
          }
          color={preemptive ? theme.colors.accent : theme.colors.primary}
          border={`1px solid ${
            preemptive ? theme.colors.accent : theme.colors.primary
          }44`}
        >
          {preemptive ? "⚡ Preemptive" : "🔒 Non-Preemptive"}
        </Badge>
      </Flex>

      <Box
        bg={`${color}10`}
        borderRadius="10px"
        px={3}
        py={2}
        border={`1px solid ${color}20`}
        fontFamily="monospace"
        fontSize="0.78rem"
        color={color}
      >
        {formula}
      </Box>

      <Box>
        <Flex align="center" gap={1.5} mb={2}>
          <FiCheckCircle size={13} color={theme.colors.accent} />
          <Text
            fontSize="0.75rem"
            fontWeight={700}
            color={theme.colors.accent}
            fontFamily={theme.fonts.body}
          >
            STRENGTHS
          </Text>
        </Flex>
        {pros.map((p, i) => (
          <Text
            key={i}
            fontSize="0.8rem"
            color={theme.colors.textMuted}
            lineHeight="1.7"
            fontFamily={theme.fonts.body}
          >
            • {p}
          </Text>
        ))}
      </Box>

      <Box>
        <Flex align="center" gap={1.5} mb={2}>
          <FiAlertCircle size={13} color="#f97316" />
          <Text
            fontSize="0.75rem"
            fontWeight={700}
            color="#f97316"
            fontFamily={theme.fonts.body}
          >
            LIMITATIONS
          </Text>
        </Flex>
        {cons.map((c, i) => (
          <Text
            key={i}
            fontSize="0.8rem"
            color={theme.colors.textMuted}
            lineHeight="1.7"
            fontFamily={theme.fonts.body}
          >
            • {c}
          </Text>
        ))}
      </Box>
    </GlassBox>
  </MotionBox>
);

export default AlgoCard;