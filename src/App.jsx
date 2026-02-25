import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";

const App = () => {
  return (
    <Box>
      <Text>ProCPU</Text>
      <ColorModeButton />
    </Box>
  );
};

export default App;
