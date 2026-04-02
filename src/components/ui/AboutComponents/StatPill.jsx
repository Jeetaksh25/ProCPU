import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../theme/theme";

const StatPill = ({ icon: Icon, label, color }) => (
  <Flex
    align="center"
    gap={2}
    px={3}
    py={1.5}
    borderRadius="full"
    border={`1px solid ${color}33`}
    bg={`${color}11`}
  >
    <Icon size={14} color={color} />
    <Text
      fontSize="0.78rem"
      color={color}
      fontFamily={theme.fonts.body}
      fontWeight={600}
    >
      {label}
    </Text>
  </Flex>
);

export default StatPill;