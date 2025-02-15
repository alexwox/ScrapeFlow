"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return <div>RunBtn</div>;
}

export default RunBtn;
