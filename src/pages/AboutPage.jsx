import { Box, Flex, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { theme } from "./../theme/theme";
import GlassBox from "../components/ui/GlassComponents/GlassBox";
import HeadingText from "../components/ui/OtherUI/HeadingText";
import { useNavigate } from "react-router-dom";
import StatPill from "../components/ui/AboutComponents/StatPill";
import FeatureCard from "../components/ui/AboutComponents/FeatureCard";
import AlgoCard from "../components/ui/AboutComponents/AlgoCard";
import ConceptBlock from "../components/ui/AboutComponents/ConceptBlock";
import ComparisonTable from "../components/ui/AboutComponents/ComparisonTable";
import Simulate from "../components/ui/AboutComponents/Simulate";
import HeroCard from "../components/ui/AboutComponents/HeroCard";
import {
  ALGOS,
  FEATURES,
  CONCEPTS,
  STATDATA,
  HERODATA,
  TABLECOLUMNS,
  TABLEDATA,
} from "../components/ui/AboutComponents/content";

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Divider = () => (
  <Box h="0.5px" bg={theme.colors.border ?? "gray.200"} my={2} />
);

const Section = ({ children, mt = 16 }) => (
  <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.09 } },
    }}
    mt={mt}
  >
    {children}
  </MotionBox>
);

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      w="80%"
      minH="100vh"
      px={[4, 8, 14]}
      py={[10, 14]}
      mx="auto"
      mt={20}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      flexDir={"column"}
    >
      <Section mt={0}>
        <GlassBox
          bg={`${theme.colors.primary}07`}
          border={`1px solid ${theme.colors.primary}20`}
          borderRadius="28px"
          p={[6, 10]}
          flexDir="column"
          gap={5}
          shadowColor={theme.colors.primary}
          blur="2px"
        >
          <MotionBox variants={fadeUp} custom={0}>
            <Flex gap={3} wrap="wrap">
              {STATDATA.map((stat, i) => (
                <StatPill
                  key={i}
                  icon={stat.icon}
                  label={stat.label}
                  color={stat.color}
                />
              ))}
            </Flex>
          </MotionBox>

          <MotionBox variants={fadeUp} custom={1}>
            <HeadingText
              title="ProCPU - CPU Scheduling Visualiser"
              subtitle="An interactive simulation platform built for OS students to deeply understand how CPU scheduling works through hands-on experimentation."
              variant="hero"
              align="left"
              mb={0}
              color={theme.colors.primary}
            />
          </MotionBox>

          <MotionBox variants={fadeUp} custom={2}>
            <Grid
              templateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)"]}
              gap={4}
              mt={2}
            >
              {HERODATA.map((s) => (
                <HeroCard key={s.label} s={s} />
              ))}
            </Grid>
          </MotionBox>
        </GlassBox>
      </Section>

      <Section>
        <MotionBox variants={fadeUp} custom={0} mb={8}>
          <HeadingText
            title="What is ProCPU?"
            variant="section"
            align="left"
            mb={1}
            color={theme.colors.primary}
            subtitle={"Everything you get out of the box."}
          />
        </MotionBox>

        <Grid
          templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={5}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i + 1} fadeUp={fadeUp} />
          ))}
        </Grid>
      </Section>

      <Box mt={16} mb={0} opacity={0.15}>
        <Divider borderColor={theme.colors.primary} />
      </Box>

      <Section>
        <MotionBox variants={fadeUp} custom={0} mb={8}>
          <HeadingText
            title="Understanding CPU Scheduling"
            subtitle="Core concepts every OS student must know — from scheduler types to performance metrics."
            variant="section"
            align="left"
            mb={1}
            color={theme.colors.primary}
          />
        </MotionBox>

        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={5}>
          {CONCEPTS.map((c, i) => (
            <ConceptBlock key={c.title} {...c} index={i + 1} fadeUp={fadeUp} />
          ))}
        </Grid>
      </Section>

      <Box mt={16} mb={0} opacity={0.15}>
        <Divider borderColor={theme.colors.accent} />
      </Box>

      <Section>
        <MotionBox variants={fadeUp} custom={0} mb={8}>
          <HeadingText
            title="Scheduling Algorithms — In Depth"
            subtitle="Explore each algorithm's logic, formula, strengths, and limitations. Toggle preemptive mode in the simulator to see the difference live."
            variant="section"
            align="left"
            mb={1}
            color={theme.colors.primary}
          />
        </MotionBox>

        <Grid
          templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={5}
        >
          {ALGOS.map((a, i) => (
            <AlgoCard key={a.title} {...a} index={i + 1} fadeUp={fadeUp} />
          ))}
        </Grid>
      </Section>

      <Section>
        <MotionBox variants={fadeUp} custom={0} mb={6}>
          <HeadingText
            title="Quick Comparison"
            variant="section"
            align="left"
            mb={1}
            color={theme.colors.primary}
          />
        </MotionBox>

        <MotionBox variants={fadeUp} custom={1}>
          <ComparisonTable TABLECOLUMNS={TABLECOLUMNS} TABLEDATA={TABLEDATA} />
        </MotionBox>
      </Section>

      <Section>
        <MotionBox variants={fadeUp} custom={0}>
          <Simulate />
        </MotionBox>
      </Section>

      <Box h={16} />
    </Box>
  );
};

export default AboutPage;
