import { Flex, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProcessStore } from "../../store/processStore";
import CustomButton from "./CustomButton";
import GlassBox from "./GlassBox";
import { theme } from "../../theme/theme";
import GlassInput from "./GlassInput";
import HeadingText from "./HeadingText";
import { motion } from "framer-motion";
import { generateSampleProcesses } from "../../functions/sampeData";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      mass: 0.5,
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const ProcessForm = () => {
  const {
    processes,
    selectedId,
    addProcess,
    updateAndClearSelected,
    clearSelected,
    setProcesses,
  } = useProcessStore();

  const EMPTY_FORM = { name: "", arrival: "", burst: "", priority: "" };

  const selectedProcess = processes.find((p) => p.id === selectedId) ?? null;

  const [form, setForm] = useState(EMPTY_FORM);

  const [status, setStatus] = useState({
    message: "Create a new process",
    isError: false,
  });

  const validate = (data) => {
    if (!data.name)
      return { message: "Process name is required", isError: true };
    if (data.arrival === "" || Number(data.arrival) < 0)
      return { message: "Arrival time must be ≥ 0", isError: true };
    if (data.burst === "" || Number(data.burst) <= 0)
      return { message: "Burst time must be > 0", isError: true };

    return { message: "All good", isError: false };
  };

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    const result = validate(updatedForm);
    setStatus(result);
  };

  const handleSubmit = () => {
    const result = validate(form);

    if (result.isError) {
      setStatus(result);
      return;
    }

    const payload = {
      name: form.name.trim(),
      arrival: Number(form.arrival),
      burst: Number(form.burst),
      priority: form.priority === "" ? 0 : Math.max(0, Number(form.priority)),
    };

    if (selectedId) {
      updateAndClearSelected(selectedId, payload);
    } else {
      addProcess(payload);
      setForm(EMPTY_FORM);
      setStatus({ message: "Process added successfully", isError: false });
    }
  };

  const handleCancel = () => {
    clearSelected();
    setForm(EMPTY_FORM);
    setStatus({ message: "Create a new process", isError: false });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const isDisabled =
    !form.name ||
    form.arrival.toString().trim() === "" ||
    form.burst.toString().trim() === "";

  useEffect(() => {
    if (selectedProcess) {
      setForm({
        name: selectedProcess.name,
        arrival: String(selectedProcess.arrival),
        burst: String(selectedProcess.burst),
        priority: String(selectedProcess.priority),
      });
    } else {
      setForm(EMPTY_FORM);
      setStatus({ message: "Create a new process", isError: false });
    }
  }, [selectedId]);

  const handleLoadSample = () => {
    const sample = generateSampleProcesses();
    setProcesses(sample);
    setForm(EMPTY_FORM);
    setStatus({ message: "Sample processes loaded", isError: false });
  };

  return (
    <GlassBox
      flexDir="column"
      gap={theme.spacing.lg}
      p={6}
      flex="1"
      minW="320px"
      maxW="500px"
      blur="2px"
      alignSelf="stretch"
    >
      <HeadingText
        title={selectedId ? "Edit Process" : "Add Process"}
        color={theme.colors.primary}
        variant="card"
        mb="0px"
      />

      <MotionBox
        onViewportEnter={() => {
          if (processes.length === 0) {
            setTimeout(() => {
              handleLoadSample();
            }, 300);
          }
        }}
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        display="flex"
        flexDir="column"
        gap={4}
      >
        <MotionBox variants={itemVariants}>
          <GlassInput
            placeholder="Process Name (e.g. P1)"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <GlassInput
            placeholder="Arrival Time"
            type="number"
            value={form.arrival}
            onChange={(e) =>
              handleChange("arrival", e.target.value.replace(/[^0-9]/g, ""))
            }
            onKeyDown={handleKeyDown}
          />
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <GlassInput
            placeholder="Burst Time"
            type="number"
            value={form.burst}
            onChange={(e) =>
              handleChange("burst", e.target.value.replace(/[^0-9]/g, ""))
            }
            onKeyDown={handleKeyDown}
          />
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <GlassInput
            placeholder="Priority (optional)"
            type="number"
            value={form.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value.replace(/[^0-9]/g, ""))
            }
            onKeyDown={handleKeyDown}
          />
        </MotionBox>
      </MotionBox>

      <Text fontSize="sm" color={status.isError ? "red.300" : "green.300"}>
        {status.message}
      </Text>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        w="100%"
        display="flex"
        gap={3}
        justifyContent="center"
      >
        {selectedId && (
          <CustomButton text="Cancel" onClick={handleCancel} variant="ghost" />
        )}

        <CustomButton
          text={selectedId ? "Update Process" : "Add Process"}
          onClick={handleSubmit}
          isDisabled={isDisabled}
        />
        {!selectedId && (
          <CustomButton text="Load Sample" onClick={handleLoadSample} />
        )}
      </MotionBox>
    </GlassBox>
  );
};

export default ProcessForm;
