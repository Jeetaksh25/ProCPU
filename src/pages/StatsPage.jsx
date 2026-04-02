import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import HeadingText from "../components/ui/OtherUI/HeadingText";
import { useProcessStore } from "../store/processStore";
import { generateSampleProcesses } from "../functions/sampeData";
import { theme } from "../theme/theme";
import {
  runSchedulingAlgo,
  getRecommendedAlgo,
} from "../functions/algoRecommend";
import { getRecommendationReasons } from "../components/utils/statsConfig";
import StatsCards from "../components/ui/StatsComponents/StatsCards";
import StatsTable from "../components/ui/StatsComponents/StatsTable";
import BarChart from "../components/ui/StatsComponents/BarChart";
import PieChart from "../components/ui/StatsComponents/PieChart";
import LineChart from "../components/ui/StatsComponents/LineChart";

const StatsPage = () => {
  const { processes, selectedAlgo, schedulingType, timeQuantum, setProcesses } =
    useProcessStore();

  useEffect(() => {
    if (processes.length === 0) {
      setProcesses(generateSampleProcesses());
    }
  }, []);

  const result = runSchedulingAlgo(
    selectedAlgo,
    processes,
    schedulingType,
    timeQuantum
  );

  const recommended = getRecommendedAlgo(
    processes,
    schedulingType,
    timeQuantum
  );

  const algosToCompare =
    schedulingType === "preemptive"
      ? ["SJF", "RR"]
      : ["FCFS", "SJF", "Priority", "RR"];

  const allResults = {};
  algosToCompare.forEach((algo) => {
    const r = runSchedulingAlgo(algo, processes, schedulingType, timeQuantum);
    if (r) allResults[algo] = r;
  });

  const reasons =
    recommended && allResults[recommended]
      ? getRecommendationReasons(recommended, processes, allResults)
      : [];

  const tableData =
    result?.processes?.map((p) => ({
      pid: p.id,
      at: p.arrivalTime,
      bt: p.burstTime,
      ct: p.completionTime,
      tat: p.turnAroundTime,
      wt: p.waitingTime,
    })) || [];

  const avgWT = result?.avgWT ?? 0;
  const avgTAT = result?.avgTAT ?? 0;

  const barData = tableData.map((p) => ({ x: p.pid, y: p.wt }));
  const lineData = tableData.map((p) => ({ x: p.pid, y: p.tat }));

  const totalWT = tableData.reduce((acc, p) => acc + p.wt, 0);
  const totalBT = tableData.reduce((acc, p) => acc + p.bt, 0);

  const pieData = [
    {
      x: "Waiting Time",
      y: totalWT,
      color: theme.colors.primary,
      text: `Waiting: ${totalWT}`,
    },
    {
      x: "Burst Time",
      y: totalBT,
      color: theme.colors.accent,
      text: `Burst: ${totalBT}`,
    },
  ];
  const summaryStats = [
    {
      label: "Avg WT",
      value: `${avgWT.toFixed(2)} ms`,
      description: "Average Waiting Time",
    },
    { label: "Avg TAT", value: `${avgTAT.toFixed(2)} ms`, description: "" },
    { label: "Algo", value: selectedAlgo, description: "" },
    {
      label: "Best",
      value: recommended ?? "--",
      color: "green.300",
      description: "",
    },
  ];

  return (
    <Box
      w="90%"
      mx="auto"
      minH="100vh"
      display="flex"
      flexDir="column"
      p={6}
      mt={20}
      gap={20}
    >
      <Box w="90%" mx={"auto"} display="flex" flexDir="column">
        <HeadingText
          title="Statistics"
          subtitle="Analyze scheduling performance and metrics"
          variant="hero"
        />
        <StatsCards
          avgWT={avgWT}
          avgTAT={avgTAT}
          selectedAlgo={selectedAlgo}
          recommended={recommended}
          reasons={reasons}
        />
      </Box>

      <StatsTable title="Process Table" data={tableData} />

      <Flex gap={6} wrap="wrap" mb={6}>
        <BarChart
          title="Waiting Time per Process"
          data={barData}
          xTitle="Process"
          yTitle="Waiting Time (ms)"
          seriesName="Waiting Time"
        />

        <PieChart title="Time Distribution" data={pieData} showLabels />
      </Flex>

      <Flex gap={6} wrap="wrap">
        <LineChart
          title="Turnaround Time per Process"
          data={lineData}
          xTitle="Process"
          yTitle="Turnaround Time (ms)"
          seriesName="TAT"
        />
      </Flex>
    </Box>
  );
};

export default StatsPage;
