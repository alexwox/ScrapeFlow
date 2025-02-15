"use server";

import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow({ id }: { id: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("Workflow not published");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
