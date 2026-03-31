import { Flex, Box } from "@chakra-ui/react";
import GlassBox2 from "./GlassBox2";
import HeadingText from "./HeadingText";
import AlgoSelect from "./AlgoSelect";
import AlgoPerformance from "./AlgoPerformance";
import { useState } from "react";

const AlgoInput = () => {
  const [selectedAlgo, setSelectedAlgo] = useState("FCFS");

  return (
    <Box
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <GlassBox2
        w="80%"
        mx="auto"
        py={10}
        px={6}
        minH="500px"
        direction="column"
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
      </GlassBox2>
    </Box>
  );
};

export default AlgoInput;
