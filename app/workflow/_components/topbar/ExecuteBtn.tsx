"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

function ExecuteBtn({ workflowId }: { workflowId: string }) {
  return (
    <Button variant={"outline"} className="flex items-center gap-2">
      <PlayIcon size={16} className="stroke-organge-400" />
    </Button>
  );
}

export default ExecuteBtn;
