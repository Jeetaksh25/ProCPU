import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "../../theme/theme";
import { hexToRgba } from "../../functions/color";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const HeadingText = ({
  title,
  subtitle,
  align = "center",
  variant = "hero",
  color = theme.colors.primary,
  glow = true,
  fontSize,
  mb = theme.spacing.xl,
  hoverColor,
  fontFamily,
  ...props
}) => {
  const variants = {
    hero: {
      titleSize: ["2.4rem", "3.2rem"],
      subtitleSize: "1.1rem",
      titleWeight: theme.fontWeights.extrabold,
    },
    section: {
      titleSize: "1.8rem",
      subtitleSize: "1rem",
      titleWeight: theme.fontWeights.bold,
    },
    card: {
      titleSize: "1.2rem",
      subtitleSize: "0.9rem",
      titleWeight: theme.fontWeights.medium,
    },
  };

  const current = variants[variant];

  const glowStrong = hexToRgba(color, 0.6);
  const glowSoft = hexToRgba(color, 0.35);
  const glowWide = hexToRgba(color, 0.2);
  const shadowBase = "rgba(0,0,0,0.08)";

  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      textAlign={align}
      mb={mb}
      userSelect={"none"}
      draggable={false}
      {...props}
    >
      <MotionText
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.98 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        fontFamily={fontFamily || theme.fonts.heading}
        fontSize={fontSize || current.titleSize}
        fontWeight={current.titleWeight}
        letterSpacing="0.03em"
        color={color}
        textShadow={
          glow &&
          `
          0 0 0.25px ${shadowBase},
          0 0 0.75px ${glowStrong}
          `
        }
        whileHover={{
          color: hoverColor || color,
        }}
      >
        {title}
      </MotionText>

      {subtitle && (
        <MotionText
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.15, duration: 0.4 },
            },
          }}
          mt={2}
          fontFamily={theme.fonts.body}
          fontSize={current.subtitleSize}
          color={theme.colors.textSecondary}
          maxW="600px"
          mx={align === "center" ? "auto" : "0"}
          lineHeight="1.6"
        >
          {subtitle}
        </MotionText>
      )}

      {variant === "hero" && (
        <MotionBox
          mt={4}
          height="4px"
          width="90px"
          bgGradient={`linear(to-r, ${theme.colors.primary}, ${theme.colors.accent})`}
          mx={align === "center" ? "auto" : "0"}
          borderRadius={theme.radii.full}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: "easeOut",
          }}
          style={{ originX: 0 }}
        />
      )}
    </MotionBox>
  );
};

export default HeadingText;
