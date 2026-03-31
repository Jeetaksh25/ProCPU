export const generateSampleProcesses = () => {
  const count = Math.floor(Math.random() * 6) + 5;

  let currentArrival = 0;

  const usePriority = Math.random() < 0.25;

  return Array.from({ length: count }).map((_, i) => {
    const burst = Math.floor(Math.random() * 9) + 1;

    const priority = usePriority
      ? Math.floor(Math.random() * 5) + 1
      : 0;

    currentArrival += Math.floor(Math.random() * 3);

    return {
      id: crypto.randomUUID(),
      name: `P${i + 1}`,
      arrival: currentArrival,
      burst,
      priority,
    };
  });
};