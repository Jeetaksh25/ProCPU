import { Flex, Text, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProcessStore } from "../../store/processStore";
import CustomButton from "./CustomButton";
import GlassBox from "./GlassBox";
import { theme } from "../../theme/theme";
import GlassInput from "./GlassInput";
import HeadingText from "./HeadingText";
import { motion } from "framer-motion";

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
  } = useProcessStore();

  const EMPTY_FORM = { name: "", arrival: "", burst: "", priority: "" };

  const selectedProcess = processes.find((p) => p.id === selectedId) ?? null;

  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name) return "Process name is required";
    if (form.arrival === "" || Number(form.arrival) < 0)
      return "Arrival time must be ≥ 0";
    if (form.burst === "" || Number(form.burst) <= 0)
      return "Burst time must be > 0";
    return "";
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
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
      setError("");
    }
  };

  const handleCancel = () => {
    clearSelected();
    setForm(EMPTY_FORM);
    setError("");
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
      setError("");
    }
  }, [selectedId]);

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
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
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

      {error && (
        <Text fontSize="sm" color="red.300">
          {error}
        </Text>
      )}

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
      </MotionBox>
    </GlassBox>
  );
};

export default ProcessForm;
