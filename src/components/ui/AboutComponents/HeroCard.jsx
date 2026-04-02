import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../theme/theme";

const HeroCard = ({ s }) => {
  return (
    <Box
      key={s.label}
      px={4}
      py={3}
      borderRadius="14px"
      bg={`${s.color}10`}
      border={`1px solid ${s.color}25`}
    >
      <Text
        fontFamily={theme.fonts.body}
        fontSize="0.72rem"
        color={theme.colors.textMuted}
        mb={0.5}
        textTransform="uppercase"
        letterSpacing="0.08em"
      >
        {s.label}
      </Text>
      <Text
        fontFamily={theme.fonts.heading}
        fontWeight={700}
        fontSize="0.9rem"
        color={s.color}
      >
        {s.val}
      </Text>
    </Box>
  );
};

export default HeroCard;
