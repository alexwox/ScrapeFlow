"use client";

import {
    Tooltip,
    TooptipContent, 
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip"

import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
}

function TooltipWrapper(props: Props) {
    return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
                {props.children}
            </TooltipTrigger>
            <TooltipContent side={props.side}>
                {props.children}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)}

export default TooltipWrapper