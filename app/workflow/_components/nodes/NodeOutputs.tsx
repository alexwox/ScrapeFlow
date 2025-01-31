"use client"

import { TaskParam } from "@/types/task"
import { Handle, Position } from "@xyflow/react"
import { ReactNode } from "react"

export function NodeOutputs({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col divide-y gap-1">
            {children}
        </div>
    )
}

export function NodeOutput({ output }: { output: TaskParam }) {
    return (
        <div className="flex justify-end relative p-3 bg-secondary">
            <p className="text-xs text-muted-foreground">
                {output.name}
            </p>
            <Handle id={output.name} type="source" position={Position.Right}/>
        </div>
    )
}