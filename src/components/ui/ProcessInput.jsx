import { Flex, Box } from "@chakra-ui/react";
import ProcessForm from "./ProcessForm";
import ProcessList from "./ProcessList";
import GlassBox from "./GlassBox";
import HeadingText from "./HeadingText";
import GlassBox2 from "./GlassBox2";

const ProcessInput = () => {
  const radius = "30px";
  return (
    <GlassBox2
      direction="column"
      w="80%"
      mx="auto"
      position="relative"
      py={10}
      px={6}
      minH="500px"
    >
      <HeadingText
        variant="section"
        title="Process Input"
        subtitle="Start by adding processes to visualize and analyze CPU scheduling"
      />
      <Flex
        justifyContent="space-around"
        align="stretch"
        flexWrap="wrap"
        w={"80%"}
        mx={"auto"}
      >
        <ProcessForm />
        <ProcessList />
      </Flex>
    </GlassBox2>
  );
};

export default ProcessInput;
