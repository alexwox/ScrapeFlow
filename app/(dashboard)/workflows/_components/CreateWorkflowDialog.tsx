"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Layers2Icon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";


export function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createWorkflow,
        onSuccess: () => {
            toast.success("Workflow created", { id: "create-workflow" });
        },
        onError: () => {
            toast.error("Failed to create workflow", { id: "create-workflow" });
        },
    })

    const onSubmit = useCallback(
        (values: createWorkflowSchemaType) => {
            toast.loading("Creating workflow...", { id: "create-workflow" });
            mutate(values);
        }, 
        [mutate]
    );

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            setOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button> {triggerText ?? "Create Workflow"} </Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title="Create Workflow"
                    subTitle="Start building your workflow"
                />

                <div className="p-6">
                    <Form {...form}>
                        <form 
                            className="space-y-8 w-full" 
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Name
                                            <p className="text-xs text-primary"> (required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="My Workflow" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Choose a unique name for your workflow.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Description
                                            <p className="text-xs text-muted-foreground"> (optional)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea className="resize-none" placeholder="My Workflow Description" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Describe your workflow in a few words.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {!isPending && "Submit"}
                                {isPending && <Loader2Icon className="w-4 h-4 animate-spin" />}
                            </Button>
                        </form>
                    </Form>
                </div>



            </DialogContent>
        </Dialog>
    )
}