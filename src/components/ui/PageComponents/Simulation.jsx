import { Flex, Box } from "@chakra-ui/react";
import GlassBox from "../GlassComponents/GlassBox";
import HeadingText from "../OtherUI/HeadingText";
import GlassBox2 from "../GlassComponents/GlassBox2";
import CustomButton from "../OtherUI/CustomButton";
import GantChart from "../Simulation/GantChart";

import { FaBackward } from "react-icons/fa6";
import { FaForward } from "react-icons/fa6";
import { PiPlayPauseFill } from "react-icons/pi";
import { BiReset } from "react-icons/bi";

const Simulation = ({ scrollTargetRef }) => {
  const handleScroll = () => {
    scrollTargetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePrevious = () => {};
  const handleNext = () => {};
  const handlePlayPause = () => {};
  const handleReset = () => {};

  return (
    <Box
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <GlassBox2
        direction="column"
        w="80%"
        mx="auto"
        position="relative"
        py={6}
        px={6}
        minH="500px"
        alignItems="center"
      >
        <HeadingText
          variant="section"
          title="Simulation"
          subtitle="Visualize and analyze CPU scheduling algorithms using Gantt charts"
        />

        <GantChart
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handlePlayPause={handlePlayPause}
          handleReset={handleReset}
        />

        <Flex
          justifyContent="center"
          align="stretch"
          flexWrap="wrap"
          w={"80%"}
          mx={"auto"}
          gap={4}
        >
          <CustomButton
            text="Previous"
            onClick={handlePrevious}
            width="max-content"
            mt={4}
            iconSize={"10px"}
            icon={<FaBackward />}
          />
          <CustomButton
            text="Play/Pause"
            onClick={handlePlayPause}
            width="max-content"
            mt={4}
            iconSize={"10px"}
            icon={<PiPlayPauseFill />}
          />
          <CustomButton
            text="Next"
            onClick={handleNext}
            width="max-content"
            mt={4}
            iconSize={"10px"}
            icon={<FaForward />}
          />
          <CustomButton
            text="Reset"
            onClick={handleReset}
            width="max-content"
            mt={4}
            iconSize={"10px"}
            icon={<BiReset />}
          />
        </Flex>
      </GlassBox2>
    </Box>
  );
};

export default Simulation;
