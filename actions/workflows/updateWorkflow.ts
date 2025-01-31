"use server"

import { waitFor } from "@/lib/helper/waitFor";
import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server"

export async function UpdateWorkflow({
    id, 
    definition
}:{
    id: string,
    definition: string,
}) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unathorized")
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId,
        },
    });
    if (!workflow) throw new Error("Workflow not found");
    if (workflow.status !== WorkflowStatus.DRAFT ) {
        throw new Error("Workflow is not a draft");
    }

    await prisma.workflow.update({
        data: {
            definition, 
        }, 
        where: {
            id, 
            userId,
        },
    });
}