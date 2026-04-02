import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import GlassBox from "../GlassComponents/GlassBox";
import { theme } from "../../../theme/theme";
const MotionBox = motion.create(Box);


const ConceptBlock = ({ icon: Icon, title, body, color, index, fadeUp }) => (
  <MotionBox variants={fadeUp} custom={index}>
    <GlassBox
      bg="transparent"
      border={`1px solid ${color}20`}
      borderRadius="18px"
      p={5}
      flexDir="row"
      gap={4}
      align="flex-start"
      blur="2px"
      hoverColor={color}
    >
      <Flex
        w={9}
        h={9}
        borderRadius="10px"
        bg={`${color}18`}
        align="center"
        justify="center"
        flexShrink={0}
        mt={0.5}
      >
        <Icon size={18} color={color} />
      </Flex>
      <Box>
        <Text
          fontFamily={theme.fonts.heading}
          fontWeight={700}
          fontSize="0.95rem"
          color={color}
          mb={1.5}
        >
          {title}
        </Text>
        <Text
          fontFamily={theme.fonts.body}
          fontSize="0.83rem"
          color={theme.colors.textMuted}
          lineHeight="1.7"
        >
          {body}
        </Text>
      </Box>
    </GlassBox>
  </MotionBox>
);

export default ConceptBlock;