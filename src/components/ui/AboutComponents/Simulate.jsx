import { Text } from "@chakra-ui/react";
import GlassBox from "../GlassComponents/GlassBox";
import { theme } from "../../../theme/theme";
import CustomButton from "../OtherUI/CustomButton";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Simulate = () => {
    const navigate = useNavigate();
  return (
    <GlassBox
      bg={`${theme.colors.accent}08`}
      border={`1px solid ${theme.colors.accent}25`}
      borderRadius="24px"
      p={[7, 10]}
      flexDir="column"
      align="center"
      gap={4}
      shadowColor={theme.colors.accent}
      textAlign="center"
      blur="2px"
    >
      <FiStar size={28} color={theme.colors.accent} />
      <Text
        fontFamily={theme.fonts.heading}
        fontWeight={800}
        fontSize={["1.3rem", "1.7rem"]}
        color={theme.colors.primary}
      >
        Ready to simulate?
      </Text>
      <CustomButton
        text={"Simulate"}
        icon={<FiArrowRight />}
        onClick={() => navigate("/")}
      />
      <Text
        fontFamily={theme.fonts.body}
        fontSize="0.88rem"
        color={theme.colors.textMuted}
        maxW="520px"
        lineHeight="1.7"
      >
        Head over to the Simulator, add your processes, choose an algorithm, and
        watch the Gantt chart come to life. Then compare all four algorithms in
        a single click.
      </Text>
    </GlassBox>
  );
};


export default Simulate;