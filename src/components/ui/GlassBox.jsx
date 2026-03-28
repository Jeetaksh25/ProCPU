import { Flex } from "@chakra-ui/react";
import { hexToRgba } from "../../functions/color";

const GlassBox = ({
  children,
  radius = "30px",
  blur = "12px",
  padding,
  hoverColor,
  ...props
}) => {
  return (
    <Flex
      position="relative"
      borderRadius={radius}
      p={padding}
      backdropFilter={`blur(${blur})`}
      overflow="hidden"
      transition="transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, background-color 0.25s ease"
      boxShadow={`
        inset 0 1px 0 rgba(255,255,255,0.15),
        inset 0 -2px 6px rgba(0,0,0,0.4),
        0 8px 32px rgba(0,0,0,0.2)
      `}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        pointerEvents: "none",
        transition: "opacity 0.25s ease",
        background: `
          linear-gradient(120deg, rgba(255,255,255,0.08), transparent 35%),
          linear-gradient(300deg, rgba(255,255,255,0.05), transparent 45%)
        `,
        opacity: 0.4,
      }}
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        pointerEvents: "none",
        transition: "opacity 0.25s ease",
        background: `
          radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12), transparent 50%),
          radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1), transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(255,255,255,0.08), transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%)
        `,
        opacity: 0.25,
      }}
      {...(hoverColor && {
        _hover: {
          color: hoverColor,
          backgroundColor: hexToRgba(hoverColor, 0.08),
        },
      })}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default GlassBox;
