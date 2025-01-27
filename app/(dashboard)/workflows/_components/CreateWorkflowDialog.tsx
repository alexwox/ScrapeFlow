"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Layers2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkflowSchema } from "@/schema/workflows";
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


export function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        <form className="space-y-8 w-full">
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
                            <Button type="submit" className="w-full">
                                Submit 
                            </Button>
                        </form>
                    </Form>
                </div>



            </DialogContent>
        </Dialog>
    )
}