import { Flex, Input } from "@chakra-ui/react";
import { hexToRgba } from "../../functions/color";
import { theme } from "../../theme/theme";
import HeadingText from "./HeadingText";

const GlassInput = ({
  placeholder,
  radius = "20px",
  blur = "10px",
  hoverColor,
  focusColor = "#7C3AED",
  ...props
}) => {
  return (
    <Flex direction="column" w="100%" align="flex-start" justify="flex-start">
      <HeadingText
        variant="card"
        color={theme.colors.textSecondary}
        title={placeholder}
        mb="0px"
        fontFamily={theme.fonts.mono}
        paddingLeft={"1em"}
        textAlign="left"
        w="100%"
      />
      <Input
        placeholder={placeholder}
        border="none"
        borderRadius={radius}
        backdropFilter={`blur(${blur})`}
        bg="rgba(255,255,255,0.04)"
        color={theme.colors.primary}
        fontSize={"md"}
        h={"50px"}
        px={4}
        py={4}
        boxShadow={`
        inset 0 1px 0 rgba(255,255,255,0.12),
        inset 0 -2px 6px rgba(0,0,0,0.35),
        0 6px 20px rgba(0,0,0,0.2)
      `}
        transition="all 0.25s ease"
        _placeholder={{
          color: theme.colors.textMuted,
        }}
        _hover={{
          ...(hoverColor && {
            bg: hexToRgba(hoverColor, 0.08),
          }),
        }}
        _focus={{
          outline: "none",
          boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.18),
          inset 0 -2px 6px rgba(0,0,0,0.4),
          0 0 0 2px ${hexToRgba(focusColor, 0.4)},
          0 8px 30px rgba(0,0,0,0.25)
        `,
          bg: hexToRgba(focusColor, 0.08),
        }}
        _focusVisible={{
          boxShadow: `
          0 0 0 2px ${hexToRgba(focusColor, 0.5)}
        `,
        }}
        sx={{
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            pointerEvents: "none",
            background: `
            linear-gradient(120deg, rgba(255,255,255,0.08), transparent 40%),
            linear-gradient(300deg, rgba(255,255,255,0.05), transparent 50%)
          `,
            opacity: 0.5,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            pointerEvents: "none",
            background: `
            radial-gradient(circle at 0% 0%, rgba(255,255,255,0.12), transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%)
          `,
            opacity: 0.25,
          },
        }}
        {...props}
      />
    </Flex>
  );
};

export default GlassInput;
