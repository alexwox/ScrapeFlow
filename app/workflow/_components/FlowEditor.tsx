"use client"

import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useEffect } from 'react'

import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';

const nodeTypes = {
    FlowScrapeNode: NodeComponent
}

const snapGrid: [number, number] = [10, 10];
const fitViewOptions = { padding: 0.2 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
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