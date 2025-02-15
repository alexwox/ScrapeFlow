"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import parser from "cron-parser";

export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
    const interval = parser.parse(cron, { tz: "UTC" });
    return await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Invalid cron", message);
    throw new Error("Invalid cron expression");
  }
}
