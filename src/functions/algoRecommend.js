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
  } else if (algo === "Priority" && schedulingType === "preemptive") {
    while (completed < n) {
      let idx = -1;
      let highestPriority = Infinity;

      for (let i = 0; i < n; i++) {
        if (
          procs[i].arrival <= time &&
          remaining[procs[i].id] > 0 &&
          procs[i].priority < highestPriority
        ) {
          highestPriority = procs[i].priority;
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





export const generateTimeline = (
  algo,
  processes,
  schedulingType,
  timeQuantum
) => {
  if (!processes || processes.length === 0) return [];

  const isPreemptive = schedulingType === "preemptive";

  let procs = processes.map((p) => ({ ...p }));
  let time = 0;
  let remaining = {};
  let timeline = [];

  procs.forEach((p) => {
    remaining[p.id] = p.burst;
  });

  procs.sort((a, b) => a.arrival - b.arrival);

  // ── FCFS — always non-preemptive ────────────────────────────────────────────
  if (algo === "FCFS") {
    let queue = [];
    let i = 0;

    while (true) {
      while (i < procs.length && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (queue.length === 0) {
        if (i >= procs.length) break;
        time = procs[i].arrival;
        continue;
      }

      const current = queue.shift();
      const start = time;
      const end = time + remaining[current.id];

      timeline.push({
        id: current.id,
        name: current.name || `P${current.id.slice(0, 4)}`,
        start,
        end,
      });

      time = end;
      remaining[current.id] = 0;

      // Admit any processes that arrived while current was running
      while (i < procs.length && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }
    }

    return timeline;
  }

  // ── Round Robin — always preemptive ─────────────────────────────────────────
  if (algo === "RR") {
    let queue = [];
    let i = 0;

    while (true) {
      while (i < procs.length && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (queue.length === 0) {
        if (i >= procs.length) break;
        time = procs[i].arrival;
        continue;
      }

      const current = queue.shift();
      const execTime = Math.min(timeQuantum, remaining[current.id]);
      const start = time;
      const end = time + execTime;

      timeline.push({
        id: current.id,
        name: current.name || `P${current.id.slice(0, 4)}`,
        start,
        end,
      });

      time = end;
      remaining[current.id] -= execTime;

      while (i < procs.length && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (remaining[current.id] > 0) {
        queue.push(current);
      }
    }

    return timeline;
  }

  // ── SJF ─────────────────────────────────────────────────────────────────────
  if (algo === "SJF") {
    if (!isPreemptive) {
      // Non-preemptive SJF: pick shortest job from ready queue, run to completion
      let queue = [];
      let i = 0;

      while (true) {
        while (i < procs.length && procs[i].arrival <= time) {
          queue.push(procs[i]);
          i++;
        }

        if (queue.length === 0) {
          if (i >= procs.length) break;
          time = procs[i].arrival;
          continue;
        }

        queue.sort((a, b) => remaining[a.id] - remaining[b.id]);
        const current = queue.shift();
        const start = time;
        const end = time + remaining[current.id];

        timeline.push({
          id: current.id,
          name: current.name || `P${current.id.slice(0, 4)}`,
          start,
          end,
        });

        time = end;
        remaining[current.id] = 0;

        while (i < procs.length && procs[i].arrival <= time) {
          queue.push(procs[i]);
          i++;
        }
      }
    } else {
      // Preemptive SJF (SRTF): at every tick, run the process with shortest remaining time
      const totalBurst = procs.reduce((s, p) => s + p.burst, 0);
      const lastArrival = procs[procs.length - 1].arrival;
      const maxTime = lastArrival + totalBurst + 1;
      let i = 0;

      while (time < maxTime) {
        const ready = procs.filter(
          (p) => p.arrival <= time && remaining[p.id] > 0
        );

        if (ready.length === 0) {
          if (procs.every((p) => remaining[p.id] === 0)) break;
          time++;
          continue;
        }

        ready.sort((a, b) => remaining[a.id] - remaining[b.id]);
        const current = ready[0];

        // Find when the next process arrives (to limit this slice)
        const nextArrival = procs.find(
          (p) => p.arrival > time && remaining[p.id] > 0
        );
        const sliceLimit = nextArrival
          ? Math.min(remaining[current.id], nextArrival.arrival - time)
          : remaining[current.id];

        const execTime = Math.max(1, sliceLimit);
        const start = time;
        const end = time + execTime;

        // Merge with last segment if same process
        if (
          timeline.length > 0 &&
          timeline[timeline.length - 1].id === current.id &&
          timeline[timeline.length - 1].end === start
        ) {
          timeline[timeline.length - 1].end = end;
        } else {
          timeline.push({
            id: current.id,
            name: current.name || `P${current.id.slice(0, 4)}`,
            start,
            end,
          });
        }

        remaining[current.id] -= execTime;
        time = end;

        if (procs.every((p) => remaining[p.id] === 0)) break;
      }
    }

    return timeline;
  }

  // ── Priority ─────────────────────────────────────────────────────────────────
  if (algo === "Priority") {
    if (!isPreemptive) {
      // Non-preemptive Priority
      let queue = [];
      let i = 0;

      while (true) {
        while (i < procs.length && procs[i].arrival <= time) {
          queue.push(procs[i]);
          i++;
        }

        if (queue.length === 0) {
          if (i >= procs.length) break;
          time = procs[i].arrival;
          continue;
        }

        queue.sort((a, b) => a.priority - b.priority);
        const current = queue.shift();
        const start = time;
        const end = time + remaining[current.id];

        timeline.push({
          id: current.id,
          name: current.name || `P${current.id.slice(0, 4)}`,
          start,
          end,
        });

        time = end;
        remaining[current.id] = 0;

        while (i < procs.length && procs[i].arrival <= time) {
          queue.push(procs[i]);
          i++;
        }
      }
    } else {
      // Preemptive Priority: at every tick, run the highest-priority ready process
      const totalBurst = procs.reduce((s, p) => s + p.burst, 0);
      const lastArrival = procs[procs.length - 1].arrival;
      const maxTime = lastArrival + totalBurst + 1;

      while (time < maxTime) {
        const ready = procs.filter(
          (p) => p.arrival <= time && remaining[p.id] > 0
        );

        if (ready.length === 0) {
          if (procs.every((p) => remaining[p.id] === 0)) break;
          time++;
          continue;
        }

        ready.sort((a, b) => a.priority - b.priority);
        const current = ready[0];

        // Limit slice to next higher-priority arrival
        const nextPreemptor = procs.find(
          (p) =>
            p.arrival > time &&
            remaining[p.id] > 0 &&
            p.priority < current.priority
        );
        const sliceLimit = nextPreemptor
          ? Math.min(remaining[current.id], nextPreemptor.arrival - time)
          : remaining[current.id];

        const execTime = Math.max(1, sliceLimit);
        const start = time;
        const end = time + execTime;

        if (
          timeline.length > 0 &&
          timeline[timeline.length - 1].id === current.id &&
          timeline[timeline.length - 1].end === start
        ) {
          timeline[timeline.length - 1].end = end;
        } else {
          timeline.push({
            id: current.id,
            name: current.name || `P${current.id.slice(0, 4)}`,
            start,
            end,
          });
        }

        remaining[current.id] -= execTime;
        time = end;

        if (procs.every((p) => remaining[p.id] === 0)) break;
      }
    }

    return timeline;
  }

  return timeline;
};

export const normalizeTimeline = (timeline, totalDuration = 60) => {
  if (!timeline || !timeline.length) return [];

  const totalTime = timeline[timeline.length - 1].end;
  if (totalTime === 0) return [];

  const scale = totalDuration / totalTime;

  return timeline.map((t) => ({
    ...t,
    scaledStart: parseFloat((t.start * scale).toFixed(4)),
    scaledEnd: parseFloat((t.end * scale).toFixed(4)),
  }));
};