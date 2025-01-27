"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Layers2Icon } from "lucide-react";

export function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button> {triggerText ?? "Create Workflow"} </Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon = {Layers2Icon}
                    title = "Create Workflow"
                    subTitle = "Start building your workflow"
                />

            </DialogContent>
        </Dialog>
    )
}