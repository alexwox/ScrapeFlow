"use client"

import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';
import { AppNode } from '@/types/appNode';

const nodeTypes = {
    FlowScrapeNode: NodeComponent
}

const snapGrid: [number, number] = [10, 10];
const fitViewOptions = { padding: 0.2 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {setViewport} = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if(!flow) {
                return;
            }
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);

            if(!flow.viewport) return;
            const {x=0, y=0, zoom=1} = flow.viewport;
            setViewport({x, y, zoom});


        } catch (error) {
            
        }
    }, [workflow.definition, setEdges, setNodes, setViewport]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow");
        if(typeof taskType === undefined || !taskType) return;

        const newNode = CreateFlowNode(taskType as TaskType);
        setNodes(nds => nds.concat(newNode))
    }, []);

    return (
        <div className="h-full w-full bg-background">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                snapToGrid
                snapGrid={snapGrid}
                fitView
                className="bg-background"
                onDragOver= { onDragOver }
                onDrop = { onDrop }
            >
                <Controls position="top-left" fitViewOptions={fitViewOptions}/>
                <Background 
                    variant={BackgroundVariant.Dots} 
                    gap={12} 
                    size={1}
                    className="!bg-transparent"
                />
            </ReactFlow>
        </div>
    )
}

export default FlowEditor