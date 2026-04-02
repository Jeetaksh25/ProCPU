import { Flex } from "@chakra-ui/react";
import { hexToRgba } from "../../../functions/color";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

// Static styles outside component — never recreated on re-render
const staticStyles = (radius) => ({
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  willChange: "transform",
});

const beforeStyles = (radius) => ({
  content: '""',
  position: "absolute",
  inset: 0,
  borderRadius: radius,
  pointerEvents: "none",
  background: `linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%),
               linear-gradient(300deg, rgba(255,255,255,0.05), transparent 45%)`,
  opacity: 0.4,
});

const afterStyles = (radius) => ({
  content: '""',
  position: "absolute",
  inset: 0,
  borderRadius: radius,
  pointerEvents: "none",
  background: `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12), transparent 50%),
               radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1), transparent 50%),
               radial-gradient(circle at 0% 100%, rgba(255,255,255,0.08), transparent 50%),
               radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%)`,
  opacity: 0.25,
});

const GlassBox = ({
  children,
  radius = "30px",
  blur = "12px",
  padding,
  hoverColor,
  p,
  variants,
  initial,
  animate,
  exit,
  shadowColor,
  ...props
}) => {
  return (
    <MotionFlex
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      position="relative"
      borderRadius={radius}
      p={p}
      overflow="visible"
      style={{
        backdropFilter: `blur(${blur})`,
        WebkitBackdropFilter: `blur(${blur})`,
        willChange: "transform",
        contain: "layout style",
      }}
      transition="transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, background-color 0.25s ease"
      boxShadow={`
        inset 0 1px 0 rgba(255,255,255,0.15),
        inset 0 -2px 6px rgba(0,0,0,0.4),
        0 8px 32px ${
          shadowColor ? hexToRgba(shadowColor, 0.25) : "rgba(0,0,0,0.2)"
        }
      `}
      _before={beforeStyles(radius)}
      _after={afterStyles(radius)}
      {...(hoverColor && {
        _hover: {
          color: hoverColor,
          backgroundColor: hexToRgba(hoverColor, 0.08),
        },
      })}
      {...props}
    >
      {children}
    </MotionFlex>
  );
};

export default GlassBox;
