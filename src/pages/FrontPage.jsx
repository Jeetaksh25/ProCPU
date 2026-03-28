import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { theme } from './../theme/theme'
import { useState, useEffect, useRef } from 'react';
import HeadingText from '../components/ui/HeadingText';
import Hero from '../components/ui/Hero';

const FrontPage = () => {
    return (
        <Box w={"100%"} h={"100%"}>
            <Hero/>
        </Box>
    );
};

export default FrontPage;