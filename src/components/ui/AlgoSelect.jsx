import { Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GlassBox from "./GlassBox";
import HeadingText from "./HeadingText";
import { theme } from "../../theme/theme";
import { algorithms } from "../../data/algorithms";
import { useProcessStore } from "../../store/processStore";
import { getRecommendedAlgo } from "../../functions/algoRecommend";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import GlassInput from "./GlassInput";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
  }),
};

const AlgoSelect = ({ selectedAlgo, setSelectedAlgo }) => {
  const {
    processes,
    setSchedulingType,
    setTimeQuantum,
    schedulingType,
    timeQuantum,
  } = useProcessStore();
  const recommended = getRecommendedAlgo(processes);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setHasUserInteracted(true);
    setDirection(1);

    const newIndex = (index + 1) % algorithms.length;
    setIndex(newIndex);
    setSelectedAlgo(algorithms[newIndex].id);
  };

  const handlePrev = () => {
    setHasUserInteracted(true);
    setDirection(-1);

    const newIndex = (index - 1 + algorithms.length) % algorithms.length;
    setIndex(newIndex);
    setSelectedAlgo(algorithms[newIndex].id);
  };

  const algo = algorithms[index];
  const Icon = algo.icon;

  return (
    <GlassBox
      flexDir="column"
      gap={2}
      p={6}
      flex="1"
      minW="320px"
      userSelect="none"
      blur="2px"
    >
      <HeadingText
        title="Select an Algorithm"
        subtitle="Choose an algorithm to visualize performance"
        variant="card"
      />

      <Flex justify="center" align="center" gap={4} mb={4}>
        <Box
          fontSize="2xl"
          cursor={"pointer"}
          onClick={handlePrev}
          _hover={{ color: theme.colors.primary }}
        >
          <IoChevronBack />
        </Box>

        <AnimatePresence mode="wait" custom={direction}>
          <GlassBox
            key={algo.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            p={6}
            align="center"
            justify="center"
            flexDir="row"
            radius="30px"
            justifyContent="space-around"
            w="500px"
            position="relative"
            border={`1px solid ${
              selectedAlgo === algo.id
                ? theme.colors.primary
                : theme.colors.accent
            }`}
            height="200px"
            onViewportEnter={() => {
              if (!hasUserInteracted && recommended) {
                const i = algorithms.findIndex((a) => a.id === recommended);
                if (i !== -1) {
                  setDirection(1); // smooth auto-slide
                  setIndex(i);
                  setSelectedAlgo(recommended);
                }
              }
            }}
            viewport={{ once: true }}
          >
            <Box
              gap={3}
              display={"flex"}
              flexDir={"column"}
              alignItems="center"
            >
              <Box fontSize="4xl" color={theme.colors.accent}>
                <Icon />
              </Box>

              <Text
                fontSize="sm"
                fontWeight="bold"
                color={theme.colors.textMuted}
              >
                {algo.id}
              </Text>
            </Box>

            <Box>
              {recommended === algo.id && processes.length > 0 && (
                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  bg={theme.colors.primary}
                  color="white"
                  w={"min-content"}
                  textAlign="center"
                  mx="auto"
                  mb={2}
                >
                  Recommended
                </Box>
              )}

              <Text
                fontSize="sm"
                fontWeight="bold"
                color={theme.colors.textMuted}
                w={"200px"}
              >
                {algo.smallDescription}
              </Text>
            </Box>
          </GlassBox>
        </AnimatePresence>

        <Box
          fontSize="2xl"
          cursor={"pointer"}
          onClick={handleNext}
          _hover={{ color: theme.colors.primary }}
        >
          <IoChevronForward />
        </Box>
      </Flex>

      <HeadingText
        textAlign="center"
        fontWeight="bold"
        fontSize="lg"
        color={theme.colors.primary}
        title={algo.name}
        mb="0px"
      />

      <Flex
        gap={3}
        justify="center"
        color={"white"}
        fontSize={"xs"}
        align={"flex-end"}
      >
        <Box display={"flex"} gap={2} flexDir={"row"}>
          <Box
            px={3}
            py={2}
            borderRadius="20px"
            cursor="pointer"
            bg={
              schedulingType === "non-preemptive"
                ? theme.colors.primary
                : theme.colors.textMuted
            }
            onClick={() => setSchedulingType("non-preemptive")}
            h={"min-content"}
          >
            Non-Preemptive
          </Box>

          <Box
            px={3}
            py={2}
            borderRadius="20px"
            cursor="pointer"
            bg={
              schedulingType === "preemptive"
                ? theme.colors.primary
                : theme.colors.textMuted
            }
            onClick={() => setSchedulingType("preemptive")}
            h={"min-content"}
          >
            Preemptive
          </Box>
        </Box>

        {selectedAlgo === "RR" && (
          <GlassInput
            placeholder="Time Quantum"
            width="200px"
            height="40px"
            type="number"
            value={timeQuantum}
            onChange={(e) => {
              let val = Number(e.target.value);

              if (val < 1) val = 1;
              if (val > 20) val = 20;

              setTimeQuantum(val);
            }}
            titleFontSize="1.2em"
          />
        )}
      </Flex>

      <GlassBox
        p={4}
        radius="20px"
        flexDir="column"
        gap={2}
        bg="rgba(255,255,255,0.03)"
        border={`1px solid ${theme.colors.accent}`}
      >
        <Text fontSize="sm" color={theme.colors.textMuted}>
          {algo.description}
        </Text>

        <Text fontSize="xs" color="green.300">
          ✔ {algo.best}
        </Text>

        <Text fontSize="xs" color="red.300">
          ✖ {algo.worst}
        </Text>
      </GlassBox>
    </GlassBox>
  );
};

export default AlgoSelect;
