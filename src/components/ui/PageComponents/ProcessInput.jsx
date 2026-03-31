import { Flex, Box } from "@chakra-ui/react";
import ProcessForm from "../ProcessInput/ProcessForm";
import ProcessList from "../ProcessInput/ProcessList";
import GlassBox from "../GlassComponents/GlassBox";
import HeadingText from "../OtherUI/HeadingText";
import GlassBox2 from "../GlassComponents/GlassBox2";
import CustomButton from "../OtherUI/CustomButton";

const ProcessInput = ({ scrollTargetRef }) => {
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

        <CustomButton
          text="Select Algorithm"
          onClick={handleScroll}
          width="max-content"
          mt={4}
        />
      </GlassBox2>
    </Box>
  );
};

export default ProcessInput;
