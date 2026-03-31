import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { theme } from "../../theme/theme";
import { hexToRgba } from "../../functions/color";

const Background = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.3}
        backgroundImage={`
          linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)
        `}
        backgroundSize="40px 40px"
      />

      <Box
        position="absolute"
        inset={0}
        backgroundImage={`
          linear-gradient(${hexToRgba(
            theme.colors.primary,
            0.3
          )} 2px, transparent 1px),
          linear-gradient(90deg, ${hexToRgba(
            theme.colors.accent,
            0.3
          )} 2px, transparent 1px)
        `}
        backgroundSize="45px 45px"
        style={{
          maskImage: `radial-gradient(
            circle 70px at ${pos.x}px ${pos.y}px,
            rgba(0,0,0,1),
            rgba(0,0,0,0)
          )`,
          WebkitMaskImage: `radial-gradient(
            circle 70px at ${pos.x}px ${pos.y}px,
            rgba(0,0,0,1),
            rgba(0,0,0,0)
          )`,
          transform: `translate(
            ${Math.sin(pos.x * 0.02) * 8}px,
            ${Math.cos(pos.y * 0.02) * 8}px
          )`,
          filter: "drop-shadow(0 0 0px rgba(124,58,237,0.8))",
          opacity: 1,
        }}
      />
    </Box>
  );
};

export default Background;
