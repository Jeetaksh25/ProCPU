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
  let completionTimes = {};
  let remaining = {};

  procs.forEach((p) => {
    remaining[p.id] = p.burst;
    waitingTimes[p.id] = 0;
    completionTimes[p.id] = 0;
  });

  let queue = [];

  // ── Non-preemptive (except RR) ───────────────────────────────────────────────
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
      completionTimes[p.id] = currentTime;
    });

  // ── Round Robin ──────────────────────────────────────────────────────────────
  } else if (algo === "RR") {
    if (!timeQuantum || timeQuantum <= 0) timeQuantum = 1;
    procs.sort((a, b) => a.arrival - b.arrival);

    let i = 0;
    time = 0;
    let safety = 10000;

    while (completed < n && safety--) {
      while (i < n && procs[i].arrival <= time) {
        queue.push(procs[i]);
        i++;
      }

      if (queue.length === 0) { time++; continue; }

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
        completionTimes[p.id] = time;
      }
    }

  // ── Preemptive SJF (SRTF) ────────────────────────────────────────────────────
  } else if (algo === "SJF" && schedulingType === "preemptive") {
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

      if (idx === -1) { time++; continue; }

      remaining[procs[idx].id]--;
      time++;

      if (remaining[procs[idx].id] === 0) {
        completed++;
        completionTimes[procs[idx].id] = time;
        waitingTimes[procs[idx].id] =
          time - procs[idx].arrival - procs[idx].burst;
      }
    }

  // ── Preemptive Priority ──────────────────────────────────────────────────────
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

      if (idx === -1) { time++; continue; }

      remaining[procs[idx].id]--;
      time++;

      if (remaining[procs[idx].id] === 0) {
        completed++;
        completionTimes[procs[idx].id] = time;
        waitingTimes[procs[idx].id] =
          time - procs[idx].arrival - procs[idx].burst;
      }
    }
  }

  // ── Build per-process result rows ────────────────────────────────────────────
  const resultProcesses = procs.map((p) => {
    const ct  = completionTimes[p.id] ?? 0;
    const wt  = waitingTimes[p.id]    ?? 0;
    const tat = ct - p.arrival;          // TAT = CT - Arrival

    return {
      id:            p.name || p.id,     // use human-readable name for table PID
      arrivalTime:   p.arrival,
      burstTime:     p.burst,
      completionTime: ct,
      turnAroundTime: tat,
      waitingTime:   wt,
    };
  });

  // ── Aggregates ───────────────────────────────────────────────────────────────
  const avgWT  = resultProcesses.reduce((s, p) => s + p.waitingTime,    0) / n;
  const avgTAT = resultProcesses.reduce((s, p) => s + p.turnAroundTime, 0) / n;

  const graph = resultProcesses.map((p) => ({
    x: p.id,
    y: p.waitingTime,
  }));

  return { processes: resultProcesses, graph, avgWT, avgTAT };
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
    const result = runSchedulingAlgo(algo, processes, schedulingType, timeQuantum);
    if (!result) return;
    if (result.avgWT < bestWT) {
      bestWT = result.avgWT;
      bestAlgo = algo;
    }
  });

  return bestAlgo;
};

export const generateGraphData = (algo, processes, schedulingType, timeQuantum) => {
  const result = runSchedulingAlgo(algo, processes, schedulingType, timeQuantum);
  if (!result) return null;
  return result.graph;
};

export const generateTimeline = (algo, processes, schedulingType, timeQuantum) => {
  if (!processes || processes.length === 0) return [];

  const isPreemptive = schedulingType === "preemptive";
  let procs = processes.map((p) => ({ ...p }));
  let time = 0;
  let remaining = {};
  let timeline = [];

  procs.forEach((p) => { remaining[p.id] = p.burst; });
  procs.sort((a, b) => a.arrival - b.arrival);

  // ── FCFS ─────────────────────────────────────────────────────────────────────
  if (algo === "FCFS") {
    let queue = [], i = 0;
    while (true) {
      while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
      if (queue.length === 0) {
        if (i >= procs.length) break;
        time = procs[i].arrival;
        continue;
      }
      const current = queue.shift();
      const start = time;
      const end = time + remaining[current.id];
      timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
      time = end;
      remaining[current.id] = 0;
      while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
    }
    return timeline;
  }

  // ── Round Robin ──────────────────────────────────────────────────────────────
  if (algo === "RR") {
    let queue = [], i = 0;
    while (true) {
      while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
      if (queue.length === 0) {
        if (i >= procs.length) break;
        time = procs[i].arrival;
        continue;
      }
      const current = queue.shift();
      const execTime = Math.min(timeQuantum, remaining[current.id]);
      const start = time;
      const end = time + execTime;
      timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
      time = end;
      remaining[current.id] -= execTime;
      while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
      if (remaining[current.id] > 0) queue.push(current);
    }
    return timeline;
  }

  // ── SJF ──────────────────────────────────────────────────────────────────────
  if (algo === "SJF") {
    if (!isPreemptive) {
      let queue = [], i = 0;
      while (true) {
        while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
        if (queue.length === 0) {
          if (i >= procs.length) break;
          time = procs[i].arrival;
          continue;
        }
        queue.sort((a, b) => remaining[a.id] - remaining[b.id]);
        const current = queue.shift();
        const start = time;
        const end = time + remaining[current.id];
        timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
        time = end;
        remaining[current.id] = 0;
        while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
      }
    } else {
      const totalBurst   = procs.reduce((s, p) => s + p.burst, 0);
      const lastArrival  = procs[procs.length - 1].arrival;
      const maxTime      = lastArrival + totalBurst + 1;

      while (time < maxTime) {
        const ready = procs.filter((p) => p.arrival <= time && remaining[p.id] > 0);
        if (ready.length === 0) {
          if (procs.every((p) => remaining[p.id] === 0)) break;
          time++; continue;
        }
        ready.sort((a, b) => remaining[a.id] - remaining[b.id]);
        const current     = ready[0];
        const nextArrival = procs.find((p) => p.arrival > time && remaining[p.id] > 0);
        const sliceLimit  = nextArrival
          ? Math.min(remaining[current.id], nextArrival.arrival - time)
          : remaining[current.id];
        const execTime = Math.max(1, sliceLimit);
        const start = time, end = time + execTime;
        if (timeline.length > 0 && timeline[timeline.length-1].id === current.id && timeline[timeline.length-1].end === start) {
          timeline[timeline.length-1].end = end;
        } else {
          timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
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
      let queue = [], i = 0;
      while (true) {
        while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
        if (queue.length === 0) {
          if (i >= procs.length) break;
          time = procs[i].arrival;
          continue;
        }
        queue.sort((a, b) => a.priority - b.priority);
        const current = queue.shift();
        const start = time, end = time + remaining[current.id];
        timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
        time = end;
        remaining[current.id] = 0;
        while (i < procs.length && procs[i].arrival <= time) queue.push(procs[i++]);
      }
    } else {
      const totalBurst  = procs.reduce((s, p) => s + p.burst, 0);
      const lastArrival = procs[procs.length - 1].arrival;
      const maxTime     = lastArrival + totalBurst + 1;

      while (time < maxTime) {
        const ready = procs.filter((p) => p.arrival <= time && remaining[p.id] > 0);
        if (ready.length === 0) {
          if (procs.every((p) => remaining[p.id] === 0)) break;
          time++; continue;
        }
        ready.sort((a, b) => a.priority - b.priority);
        const current       = ready[0];
        const nextPreemptor = procs.find((p) => p.arrival > time && remaining[p.id] > 0 && p.priority < current.priority);
        const sliceLimit    = nextPreemptor
          ? Math.min(remaining[current.id], nextPreemptor.arrival - time)
          : remaining[current.id];
        const execTime = Math.max(1, sliceLimit);
        const start = time, end = time + execTime;
        if (timeline.length > 0 && timeline[timeline.length-1].id === current.id && timeline[timeline.length-1].end === start) {
          timeline[timeline.length-1].end = end;
        } else {
          timeline.push({ id: current.id, name: current.name || `P${current.id.slice(0,4)}`, start, end });
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
    scaledEnd:   parseFloat((t.end   * scale).toFixed(4)),
  }));
};