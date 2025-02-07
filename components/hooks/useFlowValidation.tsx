import { FlowValidationContext } from "../context/FlowValidationContext";
import { useContext } from "react";

export default function useFlowValdiation() {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error("useFlowValidation must be within a FlowValidationContext");
  }
  return context;
}
