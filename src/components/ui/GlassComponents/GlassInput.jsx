import { Flex, Input } from "@chakra-ui/react";
import { hexToRgba } from "../../../functions/color";
import { theme } from "../../../theme/theme";
import HeadingText from "../OtherUI/HeadingText";

const BOX_SHADOW_DEFAULT = `
  inset 0 1px 0 rgba(255,255,255,0.12),
  inset 0 -2px 6px rgba(0,0,0,0.35),
  0 6px 20px rgba(0,0,0,0.2)
`;

const SX_STYLES = (radius) => ({
  position: "relative",
  overflow: "hidden",
  willChange: "transform",
  contain: "layout style",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: radius,
    pointerEvents: "none",
    background: `linear-gradient(120deg, rgba(255,255,255,0.08), transparent 40%),
                 linear-gradient(300deg, rgba(255,255,255,0.05), transparent 50%)`,
    opacity: 0.5,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: radius,
    pointerEvents: "none",
    background: `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12), transparent 50%),
                 radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%)`,
    opacity: 0.25,
  },
});

const PLACEHOLDER_STYLES = { color: theme.colors.textMuted };

const CONTAINER_STYLES = {
  userSelect: "none",
};

const GlassInput = ({
  placeholder,
  radius = "20px",
  blur = "10px",
  hoverColor,
  focusColor = "#7C3AED",
  width = "100%",
  titleFontSize = "1em",
  ...props
}) => {
  const focusShadow = `
    inset 0 1px 0 rgba(255,255,255,0.18),
    inset 0 -2px 6px rgba(0,0,0,0.4),
    0 0 0 2px ${hexToRgba(focusColor, 0.4)},
    0 8px 30px rgba(0,0,0,0.25)
  `;

  const focusVisibleShadow = `0 0 0 2px ${hexToRgba(focusColor, 0.5)}`;

  return (
    <Flex
      direction="column"
      w={width}
      align="flex-start"
      justify="flex-start"
      sx={CONTAINER_STYLES}
    >
      <HeadingText
        variant="card"
        color={theme.colors.textSecondary}
        title={placeholder}
        mb="0px"
        fontFamily={theme.fonts.mono}
        paddingLeft={"1em"}
        textAlign="left"
        w="100%"
        fontSize={titleFontSize}
      />
      <Input
        placeholder={placeholder}
        border="none"
        borderRadius={radius}
        backdropFilter={`blur(${blur})`}
        bg="rgba(255,255,255,0.04)"
        color={theme.colors.primary}
        fontSize="md"
        h="50px"
        px={4}
        py={4}
        boxShadow={BOX_SHADOW_DEFAULT}
        transition="all 0.25s ease"
        _placeholder={PLACEHOLDER_STYLES}
        _hover={hoverColor ? { bg: hexToRgba(hoverColor, 0.08) } : undefined}
        _focus={{
          outline: "none",
          boxShadow: focusShadow,
          bg: hexToRgba(focusColor, 0.08),
        }}
        _focusVisible={{ boxShadow: focusVisibleShadow }}
        sx={SX_STYLES(radius)}
        {...props}
      />
    </Flex>
  );
};

export default GlassInput;
