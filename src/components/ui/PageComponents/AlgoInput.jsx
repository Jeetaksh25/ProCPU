import { Flex, Box } from "@chakra-ui/react";
import GlassBox2 from "../GlassComponents/GlassBox2";
import HeadingText from "../OtherUI/HeadingText";
import AlgoSelect from "../AlgoInput/AlgoSelect";
import AlgoPerformance from "../AlgoInput/AlgoPerformance";
import { useState } from "react";
import CustomButton from "../OtherUI/CustomButton";

const AlgoInput = ({ scrollTargetRef }) => {
  const [selectedAlgo, setSelectedAlgo] = useState("FCFS");
  const handleScroll = () => {
    scrollTargetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
          title="Algo Select"
          subtitle="Choose an algorithm and analyze its performance"
        />

        <Flex wrap="wrap" gap={6} justify="space-around">
          <AlgoSelect
            selectedAlgo={selectedAlgo}
            setSelectedAlgo={setSelectedAlgo}
          />
          <AlgoPerformance selectedAlgo={selectedAlgo} />
        </Flex>

        <CustomButton
          text="Start Simulation"
          onClick={handleScroll}
          width="max-content"
          mt={4}
        />
      </GlassBox2>
    </Box>
  );
};

export default AlgoInput;
