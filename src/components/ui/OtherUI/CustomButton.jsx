import { Box, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "../../../theme/theme";
import { hexToRgba } from "../../../functions/color";

const MotionButton = motion(Button);
const MotionText = motion(Text);

const MotionButtonStyle = {};

const MotionTextStyle = {};

const CustomButton = ({
  text,
  onClick,
  icon,
  iconSize,
  fontSize = "md",
  ...props
}) => {
  return (
    <MotionButton
      px={6}
      py={4}
      cursor="pointer"
      borderRadius={"full"}
      color={theme.colors.surface}
      bg={theme.colors.primary}
      _hover={{ bg: theme.colors.accent }}
      fontSize={fontSize}
      onClick={onClick}
      initial={MotionButtonStyle.initial}
      animate={MotionButtonStyle.animate}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      {...props}
      flexDir={"row"}
      gap={2}
      display={"flex"}
      alignItems={"center"}
    >
      {icon && (
        <Box
          fontSize={iconSize}
        >
          {icon}
        </Box>
      )}
      <MotionText
        initial={MotionTextStyle.initial}
        animate={MotionTextStyle.animate}
      >
        {text}
      </MotionText>
    </MotionButton>
  );
};

export default CustomButton;
