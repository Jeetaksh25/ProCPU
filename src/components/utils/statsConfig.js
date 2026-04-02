export const ALGO_META = {
  FCFS: {
    name: "First Come First Served (FCFS)",
    formula: "Execution Order = Sorted by Arrival Time",
    description:
      "A non-preemptive scheduling algorithm where processes are executed strictly in the order of their arrival. It is simple to implement and guarantees no starvation. However, it suffers from the convoy effect, where short processes wait for long ones, leading to poor average waiting and turnaround times.",
  },

  SJF: {
    name: "Shortest Job First (SJF)",
    formula: "Select process with minimum Burst Time",
    description:
      "A non-preemptive scheduling algorithm that selects the process with the smallest CPU burst time. It provides the optimal minimum average waiting time when all burst times are known in advance. However, it is not practical in real systems due to difficulty in predicting burst time and may cause starvation for longer processes.",
  },

  Priority: {
    name: "Priority Scheduling",
    formula: "CPU allocated to process with highest priority (lowest value)",
    description:
      "Processes are scheduled based on priority levels, where higher priority processes are executed before lower ones. It can be either preemptive or non-preemptive. While effective for critical task handling, it may lead to starvation of low-priority processes unless aging techniques are applied.",
  },

  RR: {
    name: "Round Robin (RR)",
    formula: "Time Slice = Fixed Quantum (Q)",
    description:
      "A preemptive scheduling algorithm where each process is assigned a fixed time quantum in a cyclic order. It ensures fairness and responsiveness, making it suitable for time-sharing systems. However, too small a quantum increases context switching overhead, while too large a quantum reduces it to FCFS behavior.",
  },
};

export const getRecommendationReasons = (bestAlgo, processes, allResults) => {
  const best = allResults[bestAlgo];
  const reasons = [];

  const sorted = Object.entries(allResults).sort(
    (a, b) => a[1].avgWT - b[1].avgWT
  );
  reasons.push(
    `Lowest average waiting time (${best.avgWT.toFixed(
      2
    )} ms) among all tested algorithms`
  );

  if (bestAlgo === "SJF") {
    const avgBurst =
      processes.reduce((s, p) => s + p.burst, 0) / processes.length;
    reasons.push(
      `Short average burst (${avgBurst.toFixed(
        1
      )} ms) favors SJF's greedy shortest-job selection`
    );
  } else if (bestAlgo === "FCFS") {
    const spread =
      Math.max(...processes.map((p) => p.burst)) -
      Math.min(...processes.map((p) => p.burst));
    reasons.push(
      `Low burst-time variance (spread: ${spread} ms) means arrival order is near-optimal`
    );
  } else if (bestAlgo === "RR") {
    reasons.push(
      `Mixed burst times benefit from Round Robin's fair time-sharing`
    );
  } else if (bestAlgo === "Priority") {
    reasons.push(
      `Priority values are well-distributed, minimizing starvation risk`
    );
  }

  reasons.push(
    "Non-preemptive mode avoids unnecessary context-switch overhead"
  );
  return reasons;
};
