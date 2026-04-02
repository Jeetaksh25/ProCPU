import {
  FiCpu,
  FiZap,
  FiBook,
  FiLayers,
  FiRepeat,
  FiActivity,
  FiStar,
  FiGitBranch,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiSliders,
} from "react-icons/fi";
import {
  MdOutlineSchool,
  MdOutlineSpeed,
  MdOutlineTimeline,
} from "react-icons/md";
import { BsCpu, BsListCheck, BsDiagram3 } from "react-icons/bs";
import { theme } from "../../../theme/theme";

export const FEATURES = [
  {
    icon: FiActivity,
    color: theme.colors.primary,
    title: "Live Gantt Chart Simulation",
    desc: "Watch processes execute in real time with a dynamic Gantt chart. Observe how each algorithm assigns CPU time across your custom process set.",
  },
  {
    icon: FiSliders,
    color: theme.colors.accent,
    title: "Custom Process Builder",
    desc: "Define arrival times, burst durations, and priorities. Instantly see how process parameters influence scheduling decisions and metrics.",
  },
  {
    icon: MdOutlineSpeed,
    color: "#a78bfa",
    title: "Algorithm Comparison Engine",
    desc: "Run all four algorithms on the same process set simultaneously and compare average waiting time and turnaround time side by side.",
  },
  {
    icon: BsListCheck,
    color: "#34d399",
    title: "Smart Recommendation",
    desc: "ProCPU analyses your process distribution and recommends the optimal scheduling algorithm, explaining why it performs best for your input.",
  },
  {
    icon: MdOutlineTimeline,
    color: "#f472b6",
    title: "Preemptive & Non-Preemptive Modes",
    desc: "Toggle between both scheduling modes for SJF and Priority algorithms. See firsthand how preemption changes execution order and metrics.",
  },
  {
    icon: MdOutlineSchool,
    color: "#fbbf24",
    title: "Student-First Design",
    desc: "Every interaction is designed for learning — clean tables, formula overlays, and concept tooltips help you build intuition, not just observe results.",
  },
];

export const ALGOS = [
  {
    title: "First Come First Served (FCFS)",
    formula: "Execution order ← sorted by Arrival Time",
    preemptive: false,
    color: theme.colors.primary,
    pros: [
      "Extremely simple to implement and understand.",
      "Completely fair in terms of arrival order — no starvation.",
      "Low overhead; no complex comparisons needed.",
    ],
    cons: [
      'Suffers from the "Convoy Effect": short jobs stuck behind long ones.',
      "High average waiting time when burst times vary widely.",
      "Not suitable for interactive or real-time systems.",
    ],
  },
  {
    title: "Shortest Job First (SJF)",
    formula: "Select process with minimum Burst Time",
    preemptive: false,
    color: "#fbbf24",
    pros: [
      "Provably optimal average waiting time among non-preemptive algorithms.",
      "Efficient for batch systems where burst times are known.",
      "Minimises time spent waiting for short processes.",
    ],
    cons: [
      "Requires prior knowledge of burst time — impractical in real OS.",
      "Long processes may starve indefinitely.",
      "Difficult to estimate remaining CPU burst accurately.",
    ],
  },
  {
    title: "Shortest Remaining Time First (SRTF)",
    formula: "At each unit: run process with min Remaining Time",
    preemptive: true,
    color: "#34d399",
    pros: [
      "Preemptive variant of SJF — lowest possible average waiting time.",
      "Rapidly responds to short incoming processes.",
      "Maximises CPU throughput for short-heavy workloads.",
    ],
    cons: [
      "Context switch overhead at every time unit in worst case.",
      "Starvation risk for long-running processes.",
      "Still requires burst time prediction.",
    ],
  },
  {
    title: "Priority Scheduling",
    formula: "Select process with highest priority (lowest value)",
    preemptive: false,
    color: "#f472b6",
    pros: [
      "Critical tasks can always be guaranteed faster execution.",
      "Flexible — priorities can encode real-world constraints.",
      "Supports both static and dynamic priority assignment.",
    ],
    cons: [
      "Low-priority processes may starve without aging.",
      "Determining correct priority values is non-trivial.",
      "Preemptive variant increases context switch frequency.",
    ],
  },
  {
    title: "Round Robin (RR)",
    formula: "Each process runs for Time Quantum Q, then rotates",
    preemptive: true,
    color: theme.colors.accent,
    pros: [
      "Inherently fair — each process gets equal CPU slices cyclically.",
      "Excellent for time-sharing and interactive systems.",
      "No starvation; every process is guaranteed CPU time.",
    ],
    cons: [
      "Large Q → degrades to FCFS. Small Q → high context switch overhead.",
      "Higher average turnaround time than SJF for burst-uniform workloads.",
      "Performance highly sensitive to quantum size choice.",
    ],
  },
];

export const CONCEPTS = [
  {
    icon: BsCpu,
    color: theme.colors.primary,
    title: "What is a Process Scheduler?",
    body: "A process scheduler is an OS subsystem that decides which process in the ready queue gets CPU time next. It manages the transition of processes between states: New → Ready → Running → Waiting → Terminated. The scheduler's goal is to maximise CPU utilisation and throughput while minimising waiting and response times.",
  },
  {
    icon: FiLayers,
    color: "#a78bfa",
    title: "Long-Term Scheduler (Job Scheduler)",
    body: "Controls which programs are admitted into the ready queue from the job pool. It determines the degree of multiprogramming — how many processes are concurrently in memory. Runs infrequently (seconds to minutes apart) and focuses on maintaining a balanced mix of CPU-bound and I/O-bound processes.",
  },
  {
    icon: FiZap,
    color: theme.colors.accent,
    title: "Short-Term Scheduler (CPU Scheduler)",
    body: "The most critical scheduler — executes very frequently (milliseconds apart) and selects the next process to receive the CPU from the ready queue. Must be extremely fast to avoid wasting CPU on scheduling overhead itself. This is the scheduler ProCPU simulates.",
  },
  {
    icon: FiRepeat,
    color: "#f472b6",
    title: "Medium-Term Scheduler (Swapper)",
    body: "Temporarily removes processes from main memory (swapping out) to reduce the degree of multiprogramming when memory is constrained. Swapped processes are later reintroduced. This helps maintain a healthy balance between memory pressure and CPU utilisation.",
  },
  {
    icon: FiGitBranch,
    color: "#34d399",
    title: "Preemptive vs Non-Preemptive Scheduling",
    body: "Non-preemptive scheduling lets a process run to completion (or until it voluntarily yields) once it has the CPU. Preemptive scheduling allows the OS to interrupt a running process — e.g., when a higher-priority process arrives or a time quantum expires — enabling better responsiveness at the cost of context switch overhead.",
  },
  {
    icon: FiClock,
    color: "#fbbf24",
    title: "Key Performance Metrics",
    body: "CPU Utilisation: fraction of time CPU is busy. Throughput: processes completed per unit time. Turnaround Time: total time from submission to completion. Waiting Time: time spent in the ready queue. Response Time: time from submission until first response. Schedulers balance these often-conflicting objectives.",
  },
];


export const STATDATA = [
  {
    icon: FiCpu,
    label: "4 Algorithms",
    color: theme.colors.primary
  },
  {
    icon: FiActivity,
    label: "Live Simulation",
    color: theme.colors.accent
  },
  {
    icon: MdOutlineSchool,
    label: "Student-Focused",
    color: "#a78bfa"
  }, {
    icon: BsDiagram3,
    label: "Gantt Charts",
    color: "#34d399"
  }
]

export const HERODATA = [
  {
    label: "Algorithms Covered",
    val: "4 (+ preemptive variants)",
    color: theme.colors.primary,
  },
  {
    label: "Scheduling Modes",
    val: "Preemptive & Non-Preemptive",
    color: theme.colors.accent,
  },
  {
    label: "Metrics Tracked",
    val: "WT · TAT · CT · Response",
    color: "#a78bfa",
  },
]

export const TABLECOLUMNS = [
  "Algorithm",
  "Type",
  "Avg WT",
  "Starvation",
  "Overhead",
  "Best For",
]

export const TABLEDATA = [
  [
    "FCFS",
    "Non-Preemptive",
    "High",
    "No",
    "Low",
    "Batch jobs (equal burst)",
  ],
  [
    "SJF",
    "Non-Preemptive",
    "Optimal",
    "Yes",
    "Low",
    "Batch (known burst times)",
  ],
  [
    "SRTF",
    "Preemptive",
    "Optimal",
    "Yes",
    "High",
    "Short interactive bursts",
  ],
  [
    "Priority",
    "Both",
    "Medium",
    "Yes",
    "Medium",
    "Real-time critical tasks",
  ],
  [
    "Round Robin",
    "Preemptive",
    "Medium",
    "No",
    "Medium",
    "Time-sharing systems",
  ],
]