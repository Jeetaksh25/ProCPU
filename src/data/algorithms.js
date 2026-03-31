import {
  FaLayerGroup,
  FaClock,
  FaBolt,
  FaSortAmountDown,
} from "react-icons/fa";

export const algorithms = [
  {
    id: "FCFS",
    name: "First Come First Serve",
    smallDescription: "Executes in arrival order.\nSimple but inefficient.",
    description:
      "FCFS executes processes strictly in arrival order. It is simple and non-preemptive, making it easy to implement but inefficient for mixed workloads. Long processes can block shorter ones, increasing waiting time. It is best suited for batch systems with predictable job sizes.",
    best: "Best for simple batch systems where arrival order matters.",
    worst: "Worst when long jobs arrive first (convoy effect).",
    icon: FaLayerGroup,
  },
  {
    id: "SJF",
    name: "Shortest Job First",
    smallDescription: "Shortest job runs first.\nOptimal avg waiting time.",
    description:
      "SJF selects the process with the smallest execution time. It minimizes average waiting time and is theoretically optimal. However, it requires knowing burst time in advance, which is often impractical. It can also cause starvation for longer processes.",
    best: "Best when burst times are known and jobs are short.",
    worst: "Worst for long processes due to starvation.",
    icon: FaBolt,
  },
  {
    id: "RR",
    name: "Round Robin",
    smallDescription: "Time-sliced execution.\nEnsures fairness.",
    description:
      "Round Robin assigns a fixed time quantum to each process in a cyclic order. It is preemptive and ensures fairness across all processes. Performance depends heavily on the quantum size. Too small causes overhead, too large behaves like FCFS.",
    best: "Best for time-sharing systems requiring fairness.",
    worst: "Worst when time quantum is poorly chosen.",
    icon: FaClock,
  },
  {
    id: "Priority",
    name: "Priority Scheduling",
    smallDescription: "Runs highest priority first.\nRisk of starvation.",
    description:
      "Priority Scheduling executes processes based on priority levels. Higher priority processes are executed first, either preemptively or non-preemptively. It is useful for critical tasks but can lead to starvation of low-priority processes without aging.",
    best: "Best for systems with critical task prioritization.",
    worst: "Worst when low-priority processes starve.",
    icon: FaSortAmountDown,
  },
];
