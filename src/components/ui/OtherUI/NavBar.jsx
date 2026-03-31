import { Box, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "../../../theme/theme";
import { hexToRgba } from "../../../functions/color";
import HeadingText from "./HeadingText";
import { IoHome } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import GlassBox from "../GlassComponents/GlassBox";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo2.png";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const Item = ({ text, onClick, icon, ...props }) => {
  return (
    <GlassBox
      px={4}
      py={2}
      cursor="pointer"
      radius="full"
      color={theme.colors.primary}
      onClick={onClick}
      alignItems="center"
      gap={2}
      flexDir="row"
      hoverColor={theme.colors.accent}
      {...props}
    >
      {icon}
      <Text>{text}</Text>
    </GlassBox>
  );
};

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <GlassBox
      borderRadiusTopLeft={"20px"}
      borderRadiusTopRight={"20px"}
      borderBottomRightRadius={"20px"}
      borderBottomLeftRadius={"20px"}
      radius="0px"
      position="fixed"
      top={0}
      left="50%"
      transform="translateX(-50%)"
      zIndex={999}
      w={{ base: "90%", md: "60%" }}
      blur="10px"
      px={6}
      pt={2}
      pb={3}
      direction={{ base: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      gap={{ base: 3, sm: 10 }}
    >
      <HeadingText
        title="ProCPU"
        align="center"
        variant="section"
        mb="0px"
        color={theme.colors.primary}
        hoverColor={theme.colors.accent}
        logo={Logo}
        logoSize={"40px"}
        onClick={() => navigate("/")}
      />

      <Box flexDir={"row"} display={"flex"} gap={4}>
        <Item text="Home" icon={<IoHome />} onClick={() => navigate("/")} />
        <Item
          text="Stats"
          icon={<IoStatsChartSharp />}
          onClick={() => navigate("/stats")}
        />
        <Item
          text="About"
          icon={<IoInformationCircle />}
          onClick={() => navigate("/about")}
        />
      </Box>
    </GlassBox>
  );
};

export default NavBar;
