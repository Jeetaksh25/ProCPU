import { Box } from "@chakra-ui/react";
import { theme } from "../../theme/theme";

const CursorHighlight = ({ pos }) => {
  return (
    <Box position="fixed" inset={0} pointerEvents="none" zIndex={9999}>
      <Box
        position="absolute"
        left={`${pos.x}px`}
        top={`${pos.y}px`}
        transform="translate(-50%, -50%)"
        width="120px"
        height="120px"
        borderRadius="50%"
        backdropFilter="brightness(1.02)"
        WebkitBackdropFilter="brightness(1.02)"
        style={{
          transform: "translate(-50%, -50%) scale(1.08)",
        }}
        border={`0.5px solid ${theme.colors.primary}22`}
        boxShadow={`
            inset 0 0 6px rgba(255,255,255,0.08),
            0 0 4px ${theme.colors.primary}33
          `}
        background="rgba(0,0,0,0.0.1)"
      />
    </Box>
  );
};

export default CursorHighlight;
