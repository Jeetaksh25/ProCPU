export const runSchedulingAlgo = (
  algo,
  processes,
  schedulingType = "non-preemptive",
  timeQuantum = 2
) => {
  if (!processes || processes.length === 0) return null;

  let procs = processes.map((p) => ({ ...p }));
  let time = 0;
  let completed = 0;
  const n = procs.length;

  let waitingTimes = {};
  let remaining = {};
  let arrivalMap = {};

  procs.forEach((p) => {
    remaining[p.id] = p.burst;
    arrivalMap[p.id] = p.arrival;
    waitingTimes[p.id] = 0;
  });

  let queue = [];

  if (algo !== "RR" && schedulingType === "non-preemptive") {
    switch (algo) {
      case "SJF":
        procs.sort((a, b) => a.burst - b.burst);
        break;
      case "Priority":
        procs.sort((a, b) => a.priority - b.priority);
        break;
      default:
        procs.sort((a, b) => a.arrival - b.arrival);
    }

    let currentTime = 0;

    procs.forEach((p) => {
      const start = Math.max(currentTime, p.arrival);
      waitingTimes[p.id] = start - p.arrival;
      currentTime = start + p.burst;
    });
  } else if (algo === "RR") {
    if (!timeQuantum || timeQuantum <= 0) {
      timeQuantum = 1;
    }
    procs.sort((a, b) => a.arrival - b.arrival);

    let i = 0;
    time = 0;
    let safety = 10000;

    while (completed < n && safety--) {
      while (i < n && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (queue.length === 0) {
        time++;
        continue;
      }

      const p = queue.shift();

      const exec = Math.min(timeQuantum, remaining[p.id]);

      waitingTimes[p.id] += time - (p.lastExecuted || p.arrival);

      time += exec;
      remaining[p.id] -= exec;
      p.lastExecuted = time;

      while (i < n && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (remaining[p.id] > 0) {
        queue.push(p);
      } else {
        completed++;
      }
    }
  } else if (algo === "SJF" && schedulingType === "preemptive") {
    let visited = Array(n).fill(false);

    while (completed < n) {
      let idx = -1;
      let minBurst = Infinity;

      for (let i = 0; i < n; i++) {
        if (
          procs[i].arrival <= time &&
          remaining[procs[i].id] > 0 &&
          remaining[procs[i].id] < minBurst
        ) {
          minBurst = remaining[procs[i].id];
          idx = i;
        }
      }

      if (idx === -1) {
        time++;
        continue;
      }

      remaining[procs[idx].id]--;
      time++;

      if (remaining[procs[idx].id] === 0) {
        completed++;
        const finish = time;
        waitingTimes[procs[idx].id] =
          finish - procs[idx].arrival - procs[idx].burst;
      }
    }
  }

  const graph = procs.map((p, i) => ({
    x: p.name || `P${i + 1}`,
    y: waitingTimes[p.id],
  }));

  const avgWT = Object.values(waitingTimes).reduce((a, b) => a + b, 0) / n;

  return { graph, avgWT };
};

export const getRecommendedAlgo = (
  processes,
  schedulingType = "non-preemptive",
  timeQuantum = 2
) => {
  if (!processes || processes.length === 0) return null;

  const algos =
    schedulingType === "preemptive"
      ? ["SJF", "RR"]
      : ["FCFS", "SJF", "Priority", "RR"];

  let bestAlgo = null;
  let bestWT = Infinity;

  algos.forEach((algo) => {
    const result = runSchedulingAlgo(
      algo,
      processes,
      schedulingType,
      timeQuantum
    );

    if (!result) return;

    if (result.avgWT < bestWT) {
      bestWT = result.avgWT;
      bestAlgo = algo;
    }
  });

  return bestAlgo;
};

export const generateGraphData = (
  algo,
  processes,
  schedulingType,
  timeQuantum
) => {
  const result = runSchedulingAlgo(
    algo,
    processes,
    schedulingType,
    timeQuantum
  );

  if (!result) return null;

  return result.graph;
};
