import { useEffect, useState } from "react";
import { Flex, Box, Portal } from "@chakra-ui/react";
import GlassBox from "../GlassComponents/GlassBox";
import GlassBox2 from "../GlassComponents/GlassBox2";
import HeadingText from "../OtherUI/HeadingText";
import CustomButton from "../OtherUI/CustomButton";
import GanttChart from "../Simulation/GantChart";
import { useProcessStore } from "../../../store/processStore";
import { FaBackward, FaForward } from "react-icons/fa6";
import { PiPlayPauseFill } from "react-icons/pi";
import { BiReset } from "react-icons/bi";
import {
  generateTimeline,
  normalizeTimeline,
} from "../../../functions/algoRecommend";

const Simulation = ({ scrollTargetRef }) => {
  const {
    processes,
    selectedAlgo,
    schedulingType,
    timeQuantum,
    timeline,
    currentTime,
    isPlaying,
    setTimeline,
    setCurrentTime,
    play,
    pause,
    reset,
  } = useProcessStore();

  const [isfullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (!processes || processes.length === 0) {
      setTimeline([]);
      reset();
      return;
    }

    const raw = generateTimeline(
      selectedAlgo,
      processes,
      schedulingType,
      timeQuantum
    );

    const normalized = normalizeTimeline(raw, 60);
    setTimeline(normalized);
    reset();
  }, [processes, selectedAlgo, schedulingType, timeQuantum]);

  const handlePlayPause = () => {
    if (isPlaying) pause();
    else play();
  };

  const handleNext = () => {
    const next = timeline.find((t) => t.scaledStart > currentTime);
    if (next) setCurrentTime(next.scaledStart);
  };

  const handlePrevious = () => {
    const prev = [...timeline]
      .reverse()
      .find((t) => t.scaledEnd <= currentTime && t.scaledStart < currentTime);
    if (prev) setCurrentTime(prev.scaledStart);
  };

  const handleReset = () => reset();

  useEffect(() => {
    if (isfullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isfullScreen]);

  return (
    <Box
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
      mt={10}
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

        {!isfullScreen && (
          <GanttChart
            isfullScreen={isfullScreen}
            setFullScreen={setFullScreen}
          />
        )}

        {isfullScreen && (
          <Portal>
            <Box
              position="fixed"
              inset={0}
              zIndex={9999}
              h={"100vh"}
              bg={"white"}
              overflow={"hidden"}
            >
              <GanttChart
                isfullScreen={isfullScreen}
                setFullScreen={setFullScreen}
              />
              <GlassBox
                justifyContent="center"
                align="stretch"
                flexWrap="wrap"
                w="max-content  "
                mx="auto"
                gap={4}
                blur="1px"
                pb={4}
                pt={0}
                px={5}
              >
                <CustomButton
                  text="Previous"
                  onClick={handlePrevious}
                  width="max-content"
                  mt={4}
                  iconSize="10px"
                  icon={<FaBackward />}
                />
                <CustomButton
                  text="Play / Pause"
                  onClick={handlePlayPause}
                  width="max-content"
                  mt={4}
                  iconSize="10px"
                  icon={<PiPlayPauseFill />}
                />
                <CustomButton
                  text="Next"
                  onClick={handleNext}
                  width="max-content"
                  mt={4}
                  iconSize="10px"
                  icon={<FaForward />}
                />
                <CustomButton
                  text="Reset"
                  onClick={handleReset}
                  width="max-content"
                  mt={4}
                  iconSize="10px"
                  icon={<BiReset />}
                />
              </GlassBox>
            </Box>
          </Portal>
        )}

        <Flex
          justifyContent="center"
          align="stretch"
          flexWrap="wrap"
          w="80%"
          mx="auto"
          gap={4}
        >
          <CustomButton
            text="Previous"
            onClick={handlePrevious}
            width="max-content"
            mt={4}
            iconSize="10px"
            icon={<FaBackward />}
          />
          <CustomButton
            text="Play / Pause"
            onClick={handlePlayPause}
            width="max-content"
            mt={4}
            iconSize="10px"
            icon={<PiPlayPauseFill />}
          />
          <CustomButton
            text="Next"
            onClick={handleNext}
            width="max-content"
            mt={4}
            iconSize="10px"
            icon={<FaForward />}
          />
          <CustomButton
            text="Reset"
            onClick={handleReset}
            width="max-content"
            mt={4}
            iconSize="10px"
            icon={<BiReset />}
          />
        </Flex>
      </GlassBox2>
    </Box>
  );
};

export default Simulation;
