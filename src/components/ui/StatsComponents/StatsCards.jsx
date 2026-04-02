import { Grid, Box, Text, Flex, Badge } from "@chakra-ui/react";
import { ALGO_META } from "../../utils/statsConfig";
import { theme } from "../../../theme/theme";
import GlassBox from "../GlassComponents/GlassBox";
import StatCardItem from "./StatsCardItem";
import { FaRegClock } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";

const StatsCard = ({
  avgWT,
  avgTAT,
  selectedAlgo,
  recommended,
  reasons = [],
}) => {
  const algoMeta = ALGO_META[selectedAlgo] ?? {};
  const recMeta = ALGO_META[recommended] ?? {};

  const STATS_CONFIG = [
    {
      id: "avgWT",
      label: "Avg Waiting Time",
      value: `${avgWT.toFixed(2)} ms`,
      icon: FaRegClock,
      iconBg: "orange.100",
      iconColor: "orange.500",
      valueColor: "orange.600",
      hoverColor: "#F6AD55",
      formula: "WT = Start Time - Arrival Time",
      formulaBg: "orange.50",
      formulaColor: "orange.700",
      description:
        "Time a process waits in the ready queue before the CPU picks it up.",
      badge: "Lower is better",
      badgeScheme: "orange",
    },
    {
      id: "avgTAT",
      label: "Avg Turnaround Time",
      value: `${avgTAT.toFixed(2)} ms`,
      icon: GrPowerCycle,
      iconBg: "blue.100",
      iconColor: "blue.500",
      valueColor: "blue.600",
      hoverColor: "#2D9CDB",
      formula: "TAT = Completion Time - Arrival Time",
      formulaBg: "blue.50",
      formulaColor: "blue.700",
      description:
        "Full lifecycle time, covers both waiting and CPU execution. Always ≥ WT.",
      badge: "Reflects full lifecycle",
      badgeScheme: "blue",
    },
    {
      id: "algo",
      label: "Algorithm",
      value: selectedAlgo,
      subtitle: algoMeta.name ?? "",
      icon: FaProjectDiagram,
      iconBg: "purple.100",
      iconColor: "purple.500",
      valueColor: "purple.600",
      formula: algoMeta.formula ?? "—",
      formulaBg: "purple.50",
      formulaColor: "purple.700",
      description: algoMeta.description ?? "",
      badge: "Currently selected",
      badgeScheme: "purple",
    },
    {
      id: "best",
      label: "Recommended",
      value: recommended ?? "—",
      subtitle: recMeta.name ?? "",
      isBest: true,
      hoverColor: "#39FF14",
      valueColor: "green.600",
      formula: recMeta.formula ?? "—",
      formulaBg: "green.50",
      formulaColor: "green.700",
      description: recMeta.description ?? "",
      reasons,
      badge: "Optimal for this dataset",
      badgeScheme: "green",
    },
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={10} w="100%">
      {STATS_CONFIG.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </Grid>
  );
};

export default StatsCard;
