import { Grid, Box, Text, Flex, Badge } from "@chakra-ui/react";
import { ALGO_META } from "../../utils/statsConfig";
import { theme } from "../../../theme/theme";
import GlassBox from "../GlassComponents/GlassBox";
import { IoStar } from "react-icons/io5";

const IconWrapper = ({ bg, color, icon: Icon }) => (
  <Box
    w="36px"
    h="36px"
    borderRadius="8px"
    bg={bg}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
  >
    <Box color={color}>
      <Icon size="20px" />
    </Box>
  </Box>
);

const Divider = () => (
  <Box h="0.5px" bg={theme.colors.border ?? "gray.200"} my={2} />
);

const StatCardItem = ({ card }) => (
  <GlassBox
    p={theme.spacing.xl}
    display="flex"
    flexDirection="column"
    gap={2}
    borderRadius="12px"
    hoverColor={card.hoverColor ?? theme.colors.primary}
    userSelect="none"
    blur="2px"
  >
    <Flex justify="space-between" align="flex-start">
      <Text
        fontSize="md"
        color={theme.colors.textMuted}
        fontWeight={500}
        textTransform="uppercase"
        letterSpacing="0.06em"
      >
        {card.label}
      </Text>

      {card.isBest ? (
        <Flex
          align="center"
          gap={1}
          bg="green.100"
          color="green.700"
          px={2}
          py={1}
          borderRadius="20px"
          fontSize="sm"
          fontWeight={500}
        >
          <IoStar size={16} /> Best match
        </Flex>
      ) : (
        <IconWrapper bg={card.iconBg} color={card.iconColor} icon={card.icon} />
      )}
    </Flex>

    <Text
      fontSize={"2xl"}
      fontWeight={600}
      color={card.valueColor ?? theme.colors.textPrimary}
      lineHeight={1}
    >
      {card.value}
    </Text>

    {card.subtitle && (
      <Text fontSize="12px" color={theme.colors.textMuted}>
        {card.subtitle}
      </Text>
    )}

    <Divider />

    <Text
      fontFamily="mono"
      fontSize="md"
      bg={card.formulaBg}
      px={2}
      py={1}
      borderRadius="6px"
      color={card.formulaColor}
    >
      {card.formula}
    </Text>

    <Text fontSize="md" color={theme.colors.textSecondary} lineHeight={1.5}>
      {card.description}
    </Text>

    {card.reasons?.length > 0 && (
      <Flex direction="column" gap={2} my={2}>
        {card.reasons.map((r, i) => (
          <Flex key={i} align="flex-start" gap={2}>
            <Box
              w="6px"
              h="6px"
              borderRadius="full"
              bg="green.400"
              mt="7px"
              flexShrink={0}
            />
            <Text
              fontSize="sm"
              color={theme.colors.textSecondary}
              lineHeight={1.4}
            >
              {r}
            </Text>
          </Flex>
        ))}
      </Flex>
    )}

    <Badge
      bg={card.isBest ? "green.100" : card.iconBg}
      color={card.isBest ? "green.700" : card.iconColor}
      variant="subtle"
      alignSelf="flex-start"
      borderRadius="6px"
      mt={card.isBest ? 1 : 0}
      p={2}
      position={"fixed"}
      bottom={"10px"}
      right={"10px"}
    >
      {card.badge}
    </Badge>
  </GlassBox>
);

export default StatCardItem;
