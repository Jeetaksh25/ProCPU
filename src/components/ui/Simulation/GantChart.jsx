import { useEffect } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import GlassBox from "../GlassComponents/GlassBox";
import { useProcessStore } from "../../../store/processStore";
import { motion } from "framer-motion";
import { theme } from "../../../theme/theme";

const MotionBox = motion.create(Box);

const PALETTE = [
  "#4ade80",
  "#60a5fa",
  "#f472b6",
  "#facc15",
  "#a78bfa",
  "#fb923c",
  "#34d399",
  "#f87171",
  "#38bdf8",
  "#c084fc",
];

const colorCache = {};
let colorCounter = 0;
const colorForId = (id) => {
  if (!colorCache[id]) {
    colorCache[id] = PALETTE[colorCounter % PALETTE.length];
    colorCounter++;
  }
  return colorCache[id];
};

const TOTAL = 60;
const LABEL_W = 30;
const BAR_H = 20;
const ROW_GAP = 10;
const ROW_H = BAR_H + ROW_GAP;
const RULER_H = 28;
const TICK_COUNT = 24;
const RIGHT_PADDING = 20;

const GanttChart = ({ isfullScreen, setFullScreen }) => {
  const { timeline, currentTime, isPlaying, setCurrentTime, processes } =
    useProcessStore();

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentTime((prev) => {
        const next = parseFloat((prev + 0.1).toFixed(2));
        if (next >= TOTAL) {
          useProcessStore.getState().pause();
          return TOTAL;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [isPlaying]);

  if (!timeline || timeline.length === 0) {
    return (
      <GlassBox
        flexDir="column"
        p={6}
        flex="1"
        minW="320px"
        w="100%"
        justifyContent="center"
        alignItems="center"
        minH="140px"
      >
        <Text color="whiteAlpha.400" fontSize="sm">
          No processes — add some and run the simulation.
        </Text>
      </GlassBox>
    );
  }

  // const processIds = [...new Set(timeline.map((t) => t.id))];
  const processIds = processes.map((p) => p.id);
  const rowCount = processIds.length;

  const nameOf = {};
  for (const seg of timeline) {
    if (!nameOf[seg.id]) nameOf[seg.id] = seg.name || seg.id.slice(0, 6);
  }

  const currentTask = timeline.find(
    (t) => currentTime >= t.scaledStart && currentTime < t.scaledEnd
  );

  const SVG_W = 800;
  const CHART_X = LABEL_W;
  const CHART_W = SVG_W - LABEL_W - RIGHT_PADDING;
  const SVG_H = rowCount * ROW_H + RULER_H + 8;

  // const xOfplaybackHead = (t) => CHART_X + (t / TOTAL) * CHART_W;
  // const wOfplaybackHead = (start, end) => ((end - start) / TOTAL) * CHART_W;

  const xOf = (t) => {
    const gridUnitTime = TOTAL / TICK_COUNT;
    const snapped = Math.round(t / gridUnitTime);
    return CHART_X + (snapped / TICK_COUNT) * CHART_W;
  };
  const wOf = (start, end) => {
    const gridUnitTime = TOTAL / TICK_COUNT;

    const snappedStart = Math.round(start / gridUnitTime);
    const snappedEnd = Math.round(end / gridUnitTime);

    return ((snappedEnd - snappedStart) / TICK_COUNT) * CHART_W;
  };

  const yOf = (rowIdx) => rowIdx * ROW_H + 4;

  const playheadX = xOf(Math.min(currentTime, TOTAL));

  const color = colorForId(currentTask?.id);

  return (
    <GlassBox
      flexDir="column"
      gap={3}
      p={6}
      flex="1"
      minW="320px"
      w="100%"
      userSelect="none"
      maxH={isfullScreen ? "92vh" : "70vh"}
    >
      <Flex align="center" gap={3} w={"95%"} mx="auto">
        <MotionBox
          w="12px"
          h="12px"
          borderRadius="full"
          flexShrink={0}
          bg={currentTask ? color : "red.600"}
          animate={
            currentTask
              ? {
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1, 0.8],
                }
              : { opacity: 0.4, scale: 1 }
          }
          transition={
            currentTask
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
        />
        <Text
          color={currentTask ? color : "red.600"}
          fontSize="md"
          fontWeight={500}
        >
          {currentTask ? `Running: ${currentTask.name}` : "Idle"}
        </Text>
        <Text color="black" fontSize="sm" ml="auto">
          Time = {currentTime.toFixed(1)}s
        </Text>
        <Text color="black" fontSize="sm">
          Progress = {((currentTime / TOTAL) * 100).toFixed(1)}%
        </Text>

        <Button variant={"subtle"} onClick={() => setFullScreen(!isfullScreen)}>
          {isfullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </Button>
      </Flex>

      <Box w="100%" overflowX="auto" overflowY="auto">
        <Box
          transform={isfullScreen ? "scale(0.75)" : "scale(1)"}
          transformOrigin="top center"
          transition="0.2s ease"
        >
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width={"100%"}
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: "block",
              minWidth: "360px",
              overflow: "auto",
            }}
          >
            {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
              const x = CHART_X + (i / TICK_COUNT) * CHART_W;

              return (
                <line
                  key={"grid-" + i}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={rowCount * ROW_H}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth={1}
                />
              );
            })}
            {processIds.map((pid, rowIdx) => {
              const color = colorForId(pid);
              const y = yOf(rowIdx);
              const rowSegs = timeline.filter((t) => t.id === pid);

              return (
                <g key={pid}>
                  <text
                    x={LABEL_W - 6}
                    y={y + BAR_H / 2 + 3}
                    textAnchor="end"
                    style={{ fontSize: "10px" }}
                    fill="rgba(0,0,0,0.55)"
                    fontFamily="Inter, sans-serif"
                    fontWeight="400"
                  >
                    {nameOf[pid]}
                  </text>
                  <rect
                    x={CHART_X}
                    y={y}
                    width={CHART_W}
                    height={BAR_H}
                    rx={4}
                    fill="rgba(0,0,0,0.04)"
                  />

                  {rowSegs.map((seg, si) => {
                    const sx = xOf(seg.scaledStart);
                    const sw = wOf(seg.scaledStart, seg.scaledEnd);

                    const fillRatio =
                      currentTime <= seg.scaledStart
                        ? 0
                        : currentTime >= seg.scaledEnd
                        ? 1
                        : (currentTime - seg.scaledStart) /
                          (seg.scaledEnd - seg.scaledStart);

                    const isActive =
                      currentTime >= seg.scaledStart &&
                      currentTime < seg.scaledEnd;

                    return (
                      <g key={si}>
                        <rect
                          x={sx}
                          y={y}
                          width={sw}
                          height={BAR_H}
                          rx={3}
                          fill={color}
                          opacity={0.22}
                        />
                        <rect
                          x={sx}
                          y={y}
                          width={sw * fillRatio}
                          height={BAR_H}
                          rx={3}
                          fill={color}
                          opacity={0.9}
                        />
                        {isActive && (
                          <rect
                            x={sx}
                            y={y}
                            width={sw}
                            height={BAR_H}
                            rx={3}
                            fill="none"
                            stroke={color}
                            strokeWidth={1.5}
                            opacity={0.8}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
              const rx = CHART_X + (i / TICK_COUNT) * CHART_W;

              const totalRealTime = timeline[timeline.length - 1].end;
              const realTime = Math.round((i / TICK_COUNT) * totalRealTime);

              return (
                <g key={i}>
                  <line
                    x1={rx}
                    y1={rowCount * ROW_H + 4}
                    x2={rx}
                    y2={rowCount * ROW_H + 10}
                    stroke="rgba(0,0,0,0.2)"
                    strokeWidth={1}
                  />
                  <text
                    x={rx}
                    y={rowCount * ROW_H + 22}
                    textAnchor="middle"
                    style={{ fontSize: "10px" }}
                    fill="rgba(0,0,0,0.45)"
                    fontFamily="sans-serif"
                  >
                    {realTime}
                  </text>
                </g>
              );
            })}

            {/* <line
            x1={CHART_X}
            y1={rowCount * ROW_H + 4}
            x2={CHART_X + CHART_W}
            y2={rowCount * ROW_H + 4}
            stroke="rgba(0,0,0,0.12)"
            strokeWidth={1}
          />

          <line
            x1={playheadX}
            y1={4}
            x2={playheadX}
            y2={rowCount * ROW_H + RULER_H}
            stroke="rgba(0,0,0,0.30)"
            strokeWidth={1.5}
          />
          <polygon
            points={`${playheadX - 5},4 ${playheadX + 5},4 ${playheadX},11`}
            fill="rgba(80,80,80,1)"
          /> */}
          </svg>
        </Box>
      </Box>

      <Flex
        flexWrap="wrap"
        gap={3}
        mt={2}
        overflow={"auto"}
        minH={"100px"}
        maxH={"200px"}
        bg={theme.colors.background}
        p={2}
        rounded={"15px"}
      >
        {processIds.map((pid) => {
          const color = colorForId(pid);

          const segs = timeline.filter((t) => t.id === pid);

          const totalDuration = segs.reduce(
            (acc, s) => acc + (s.scaledEnd - s.scaledStart),
            0
          );

          const completedDuration = segs.reduce((acc, s) => {
            if (currentTime >= s.scaledEnd)
              return acc + (s.scaledEnd - s.scaledStart);
            if (currentTime > s.scaledStart)
              return acc + (currentTime - s.scaledStart);
            return acc;
          }, 0);

          const progress = Math.min(
            100,
            Math.round((completedDuration / totalDuration) * 100 || 0)
          );

          const isRunning = segs.some(
            (s) => currentTime >= s.scaledStart && currentTime < s.scaledEnd
          );

          const isDone = progress === 100;

          return (
            <Flex
              key={pid}
              align="center"
              gap={3}
              px={2}
              py={2}
              borderRadius="lg"
              bg="whiteAlpha.50"
              border="1px solid"
              borderColor={isRunning ? color : "whiteAlpha.100"}
              boxShadow={isRunning ? `0 0 8px ${color}55` : "none"}
              transition="all 0.2s"
              minW="150px"
            >
              <Box
                w="15px"
                h="15px"
                borderRadius="sm"
                bg={color}
                flexShrink={0}
              />

              <Box flex={1} minW={0}>
                <Text
                  fontSize="xs"
                  fontWeight={700}
                  color="black"
                  noOfLines={1}
                >
                  {nameOf[pid]}
                </Text>

                <Text fontSize="12px" color="gray.600">
                  {progress}% done
                </Text>
              </Box>

              {isDone && (
                <Box
                  fontSize="12px"
                  px={1.5}
                  py={0.5}
                  borderRadius="sm"
                  bg="green.200"
                  color="green.800"
                >
                  ✓
                </Box>
              )}

              {isRunning && (
                <Box
                  fontSize="8px"
                  px={1.5}
                  py={0.5}
                  borderRadius="sm"
                  bg="purple.200"
                  color="purple.800"
                >
                  RUN
                </Box>
              )}
            </Flex>
          );
        })}
      </Flex>
    </GlassBox>
  );
};

export default GanttChart;
