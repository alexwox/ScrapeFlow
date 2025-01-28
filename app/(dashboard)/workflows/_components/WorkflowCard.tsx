"use client"

import { Card, CardContent } from "@/components/ui/card";
import { WorkflowStatus } from "@/types/workflow";
import { FileTextIcon } from "lucide-react";
import { Workflow } from "@prisma/client";
import { PlayIcon } from "lucide-react";

import React from "react";
import { cn } from "@/lib/utils";

function WorkflowCard({ workflow }: { workflow: Workflow }) {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;

    return (
        <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md
        dark:shadow-primary/30">
            <CardContent className="p4 flex items-center justify-between h-[100px]">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center bg-red-500 justify-center"
                )}>
                    {isDraft ? (
                        <FileTextIcon className="h-5 w-5" />
                    ) : (<PlayIcon className="h-5 w-5 text-white" />)}
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkflowCard;