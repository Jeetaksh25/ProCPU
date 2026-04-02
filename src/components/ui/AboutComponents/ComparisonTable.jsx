import { Box } from "@chakra-ui/react";
import { theme } from "../../../theme/theme";
import GlassBox from "../GlassComponents/GlassBox";

const ComparisonTable = ({ TABLECOLUMNS, TABLEDATA }) => {
  return (
    <GlassBox
      borderRadius="22px"
      p={5}
      overflow="hidden"
      border={`1px solid ${theme.colors.primary}20`}
      shadowColor={theme.colors.primary}
      w="100%"
      blur="2px"
    >
      <Box
        overflowX="auto"
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        mx={"auto"}
      >
        <Box as="table" w="100%" borderCollapse="collapse">
          <Box as="thead">
            <Box as="tr" bg={`${theme.colors.primary}12`}>
              {TABLECOLUMNS.map((h) => (
                <Box
                  key={h}
                  as="th"
                  px={4}
                  py={3}
                  textAlign="left"
                  fontFamily={theme.fonts.body}
                  fontSize="1rem"
                  fontWeight={700}
                  color={theme.colors.primary}
                  textTransform="uppercase"
                  letterSpacing="0.07em"
                  borderBottom={`1px solid ${theme.colors.primary}20`}
                >
                  {h}
                </Box>
              ))}
            </Box>
          </Box>
          <Box as="tbody">
            {TABLEDATA.map(([algo, type, awt, starv, oh, best], ri) => (
              <Box
                as="tr"
                key={algo}
                bg={ri % 2 === 0 ? "transparent" : `${theme.colors.primary}05`}
                _hover={{ bg: `${theme.colors.primary}0d` }}
                transition="background 0.2s"
              >
                {[algo, type, awt, starv, oh, best].map((cell, ci) => (
                  <Box
                    key={ci}
                    as="td"
                    px={4}
                    py={3}
                    fontFamily={theme.fonts.body}
                    fontSize="1rem"
                    color={
                      ci === 0 ? theme.colors.accent : theme.colors.textMuted
                    }
                    fontWeight={ci === 0 ? 700 : 400}
                    borderBottom={`1px solid ${theme.colors.primary}0f`}
                  >
                    {cell}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </GlassBox>
  );
};

export default ComparisonTable;
