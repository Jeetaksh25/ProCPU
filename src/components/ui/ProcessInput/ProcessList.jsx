import { Box, Text, Flex } from "@chakra-ui/react";
import { useProcessStore } from "../../../store/processStore";
import GlassBox from "../GlassComponents/GlassBox";
import { theme } from "../../../theme/theme";
import { IoTrash } from "react-icons/io5";
import { hexToRgba } from "../../../functions/color";
import HeadingText from "../OtherUI/HeadingText";
import CustomButton from "../OtherUI/CustomButton";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionGlassBox = motion(GlassBox);

const containerVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      mass: 0.5,
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const ProcessListItem = ({ p, removeProcess, setSelected, isSelected }) => {
  return (
    <MotionGlassBox
      p={4}
      radius={theme.radii.md}
      cursor="pointer"
      onClick={() => setSelected(p.id)}
      w="100%"
      hoverColor={theme.colors.accent}
      color={theme.colors.primary}
      bg={isSelected ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)"}
      border={
        isSelected
          ? `1px solid ${hexToRgba(theme.colors.primary, 0.4)}`
          : `1px solid ${hexToRgba(theme.colors.accent, 0.3)}`
      }
      variants={itemVariants}
    >
      <Flex justify="space-between" align="center" w={"100%"}>
        <Box>
          <Text fontWeight="bold">{p.name}</Text>
          <Text fontSize="sm">
            AT: {p.arrival} | BT: {p.burst} | PR: {p.priority}
          </Text>
        </Box>

        <Box
          color="red.400"
          fontSize="2xl"
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation();
            removeProcess(p.id);
          }}
          _hover={{ color: "red.600" }}
        >
          <IoTrash />
        </Box>
      </Flex>
    </MotionGlassBox>
  );
};

const ProcessList = () => {
  const { processes, removeProcess, setSelected, selectedId, clearProcesses } =
    useProcessStore();

  return (
    <GlassBox
      key={processes.length}
      flexDir="column"
      gap={theme.spacing.md}
      flex="1"
      py={theme.spacing.md}
      minW="320px"
      maxW="500px"
      blur="2px"
      alignSelf="stretch"
      overflowY="auto"
      overflowX="hidden"
      maxH="580px"
      alignContent="center"
      justifyContent="center"
    >
      <HeadingText
        title={"Processes"}
        color={theme.colors.primary}
        variant="card"
        mb="0px"
      />

      {processes.length === 0 && (
        <Text color={theme.colors.textMuted} textAlign="center">
          No processes added
        </Text>
      )}

      <MotionFlex
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        flexDir="column"
        gap={theme.spacing.md}
        px={theme.spacing.md}
        flex="1"
        overflowY="auto"
        overflowX={"hidden"}
      >
        {processes.map((p) => (
          <ProcessListItem
            key={p.id}
            p={p}
            removeProcess={removeProcess}
            setSelected={setSelected}
            isSelected={selectedId === p.id}
          />
        ))}
      </MotionFlex>

      {processes.length > 0 && (
        <Box
          justifyContent={"center"}
          w={"100%"}
          alignContent={"center"}
          display={"flex"}
          m={0}
          p={0}
        >
          <CustomButton text="Clear All Processes" onClick={clearProcesses} />
        </Box>
      )}
    </GlassBox>
  );
};

export default ProcessList;
