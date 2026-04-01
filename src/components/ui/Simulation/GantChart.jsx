import { useEffect, useMemo, useCallback, memo, useRef } from "react";
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
const SVG_W = 800;
const CHART_X = LABEL_W;
const CHART_W = SVG_W - LABEL_W - RIGHT_PADDING;
const GRID_UNIT_TIME = TOTAL / TICK_COUNT;

const xOf = (t) =>
  CHART_X + (Math.round(t / GRID_UNIT_TIME) / TICK_COUNT) * CHART_W;
const wOf = (start, end) =>
  ((Math.round(end / GRID_UNIT_TIME) - Math.round(start / GRID_UNIT_TIME)) /
    TICK_COUNT) *
  CHART_W;
const yOf = (rowIdx) => rowIdx * ROW_H + 4;

const GridLines = memo(({ rowCount }) => (
  <>
    {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
      const x = CHART_X + (i / TICK_COUNT) * CHART_W;
      return (
        <line
          key={i}
          x1={x}
          y1={0}
          x2={x}
          y2={rowCount * ROW_H}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1}
        />
      );
    })}
  </>
));

const Ruler = memo(({ rowCount, totalRealTime }) => (
  <>
    {Array.from({ length: TICK_COUNT + 1 }).map((_, i) => {
      const rx = CHART_X + (i / TICK_COUNT) * CHART_W;
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
  </>
));

const GanttRowStatic = memo(({ pid, rowIdx, nameOf }) => {
  const y = yOf(rowIdx);
  return (
    <>
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
    </>
  );
});

const GanttRowBars = memo(({ pid, rowIdx, segments }) => {
  const color = colorForId(pid);
  const y = yOf(rowIdx);
  const fillRefs = useRef([]);

  useEffect(() => {
    const updaters =
      GanttRowBars._updaters ?? (GanttRowBars._updaters = new Map());
    updaters.set(pid, (currentTime) => {
      segments.forEach((seg, si) => {
        const el = fillRefs.current[si];
        if (!el) return;
        const sw = wOf(seg.scaledStart, seg.scaledEnd);
        const fillRatio =
          currentTime <= seg.scaledStart
            ? 0
            : currentTime >= seg.scaledEnd
            ? 1
            : (currentTime - seg.scaledStart) /
              (seg.scaledEnd - seg.scaledStart);
        el.setAttribute("width", String(sw * fillRatio));

        const strokeEl = el.nextSibling;
        if (strokeEl) {
          strokeEl.setAttribute(
            "opacity",
            currentTime >= seg.scaledStart && currentTime < seg.scaledEnd
              ? "0.8"
              : "0"
          );
        }
      });
    });
    return () => updaters.delete(pid);
  }, [pid, segments]);

  return (
    <>
      {segments.map((seg, si) => {
        const sx = xOf(seg.scaledStart);
        const sw = wOf(seg.scaledStart, seg.scaledEnd);
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
              ref={(el) => (fillRefs.current[si] = el)}
              x={sx}
              y={y}
              width={0}
              height={BAR_H}
              rx={3}
              fill={color}
              opacity={0.9}
            />
            <rect
              x={sx}
              y={y}
              width={sw}
              height={BAR_H}
              rx={3}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              opacity={0}
            />
          </g>
        );
      })}
    </>
  );
});
GanttRowBars._updaters = new Map();

const LegendCard = memo(
  ({ pid, nameOf, segments, currentTime }) => {
    const color = colorForId(pid);
    const totalDuration = useMemo(
      () => segments.reduce((acc, s) => acc + (s.scaledEnd - s.scaledStart), 0),
      [segments]
    );
    const completedDuration = segments.reduce((acc, s) => {
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
    const isRunning = segments.some(
      (s) => currentTime >= s.scaledStart && currentTime < s.scaledEnd
    );
    const isDone = progress === 100;

    return (
      <Flex
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
        h={"max-content"}
      >
        <Box w="15px" h="15px" borderRadius="sm" bg={color} flexShrink={0} />
        <Box flex={1} minW={0}>
          <Text fontSize="xs" fontWeight={700} color="black" noOfLines={1}>
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
  },

  (prev, next) => {
    if (prev.currentTime === next.currentTime) return true;
    const calc = (segs, t) => {
      const total = segs.reduce((a, s) => a + (s.scaledEnd - s.scaledStart), 0);
      const done = segs.reduce((a, s) => {
        if (t >= s.scaledEnd) return a + (s.scaledEnd - s.scaledStart);
        if (t > s.scaledStart) return a + (t - s.scaledStart);
        return a;
      }, 0);
      return Math.min(100, Math.round((done / total) * 100 || 0));
    };
    const wasRunning = prev.segments.some(
      (s) => prev.currentTime >= s.scaledStart && prev.currentTime < s.scaledEnd
    );
    const nowRunning = next.segments.some(
      (s) => next.currentTime >= s.scaledStart && next.currentTime < s.scaledEnd
    );
    return (
      calc(prev.segments, prev.currentTime) ===
        calc(next.segments, next.currentTime) && wasRunning === nowRunning
    );
  }
);

const ANIM_ACTIVE = { opacity: [0.6, 1, 0.6], scale: [0.8, 1, 0.8] };
const ANIM_IDLE = { opacity: 0.4, scale: 1 };
const TRANS_ACTIVE = { duration: 1.5, repeat: Infinity, ease: "easeInOut" };
const TRANS_IDLE = { duration: 0.2 };

const StatusDot = memo(({ color, isActive }) => (
  <MotionBox
    w="12px"
    h="12px"
    borderRadius="full"
    flexShrink={0}
    bg={color}
    animate={isActive ? ANIM_ACTIVE : ANIM_IDLE}
    transition={isActive ? TRANS_ACTIVE : TRANS_IDLE}
  />
));

const HeaderStats = memo(({ totalRef, progressRef }) => (
  <>
    <Text ref={totalRef} color="black" fontSize="sm" ml="auto">
      Time = 0.0s
    </Text>
    <Text ref={progressRef} color="black" fontSize="sm">
      Progress = 0.0%
    </Text>
  </>
));

const GanttChart = ({ isfullScreen, setFullScreen }) => {
  const { timeline, currentTime, isPlaying, setCurrentTime, processes } =
    useProcessStore();

  const timeTextRef = useRef(null);
  const progressTextRef = useRef(null);
  const rafRef = useRef(null);
  const lastTickRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastTickRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - lastTickRef.current;
      if (elapsed >= 100) {
        lastTickRef.current = now - (elapsed % 100);
        setCurrentTime((prev) => {
          const next = parseFloat((prev + 0.1).toFixed(2));
          if (next >= TOTAL) {
            useProcessStore.getState().pause();
            return TOTAL;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (timeTextRef.current)
      timeTextRef.current.textContent = `Time = ${currentTime.toFixed(1)}s`;
    if (progressTextRef.current)
      progressTextRef.current.textContent = `Progress = ${(
        (currentTime / TOTAL) *
        100
      ).toFixed(1)}%`;

    GanttRowBars._updaters?.forEach((update) => update(currentTime));
  }, [currentTime]);

  const { processIds, nameOf, segsByPid, totalRealTime, rowCount, SVG_H } =
    useMemo(() => {
      if (!timeline?.length) return {};
      const processIds = processes.map((p) => p.id);
      const nameOf = {};
      const segsByPid = {};
      for (const seg of timeline) {
        if (!nameOf[seg.id]) nameOf[seg.id] = seg.name || seg.id.slice(0, 6);
        if (!segsByPid[seg.id]) segsByPid[seg.id] = [];
        segsByPid[seg.id].push(seg);
      }
      return {
        processIds,
        nameOf,
        segsByPid,
        totalRealTime: timeline[timeline.length - 1].end,
        rowCount: processIds.length,
        SVG_H: processIds.length * ROW_H + RULER_H + 8,
      };
    }, [timeline, processes]);

  const currentTask = useMemo(
    () =>
      timeline?.find(
        (t) => currentTime >= t.scaledStart && currentTime < t.scaledEnd
      ),
    [timeline, currentTime]
  );

  const handleFullScreen = useCallback(
    () => setFullScreen(!isfullScreen),
    [isfullScreen, setFullScreen]
  );

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

  const dotColor = currentTask
    ? colorForId(currentTask.id)
    : "var(--chakra-colors-red-600)";

  return (
    <GlassBox
      flexDir="column"
      gap={3}
      p={6}
      flex="1"
      minW="320px"
      w="100%"
      userSelect="none"
      maxH={isfullScreen ? "100vh" : "70vh"}
    >
      <Flex align="center" gap={3} w="95%" mx="auto">
        <StatusDot color={dotColor} isActive={!!currentTask} />
        <Text color={dotColor} fontSize="md" fontWeight={500}>
          {currentTask ? `Running: ${currentTask.name}` : "Idle"}
        </Text>
        <Text ref={timeTextRef} color="black" fontSize="sm" ml="auto">
          Time = {currentTime.toFixed(1)}s
        </Text>
        <Text ref={progressTextRef} color="black" fontSize="sm">
          Progress = {((currentTime / TOTAL) * 100).toFixed(1)}%
        </Text>
        <Button variant="subtle" onClick={handleFullScreen}>
          {isfullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </Button>
      </Flex>

      <Box
        w="100%"
        overflowX="auto"
        overflowY="auto"
        h={isfullScreen ? "68vh" : "70vh"}
      >
        <Box
          transform={isfullScreen ? "scale(0.75)" : "scale(1)"}
          transformOrigin="top center"
          transition="0.2s ease"
        >
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", minWidth: "360px", overflow: "auto" }}
          >
            <GridLines rowCount={rowCount} />
            {processIds.map((pid, rowIdx) => (
              <g key={pid}>
                <GanttRowStatic pid={pid} rowIdx={rowIdx} nameOf={nameOf} />
                <GanttRowBars
                  pid={pid}
                  rowIdx={rowIdx}
                  segments={segsByPid[pid] ?? []}
                />
              </g>
            ))}
            <Ruler rowCount={rowCount} totalRealTime={totalRealTime} />
          </svg>
        </Box>
      </Box>

      <Flex
        flexWrap="wrap"
        gap={3}
        mt={2}
        overflow="auto"
        minH="100px"
        maxH="200px"
        bg={theme.colors.background}
        p={2}
        rounded="15px"
        align={"center"}
      >
        {processIds.map((pid) => (
          <LegendCard
            key={pid}
            pid={pid}
            nameOf={nameOf}
            segments={segsByPid[pid] ?? []}
            currentTime={currentTime}
          />
        ))}
      </Flex>
    </GlassBox>
  );
};

export default GanttChart;
