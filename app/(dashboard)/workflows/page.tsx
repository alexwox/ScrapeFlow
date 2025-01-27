import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function page() {
    return (
        <div className="flex-1 flex flex-col h-full">
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-muted-foreground">Manage your workflows</p>
                </div>
            </div>

            <div className="h-full py-6" >
                 <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkflows />
                </Suspense>
            </div>
        </div>

    );
}

function UserWorkflowsSkeleton() {
    return(
    <div className = "space-y-2">
        {
            [1, 2, 3, 4].map((i) => (<Skeleton key={i}  className="h-32 w-full" />))
        }
    </div>

)
}

function UserWorkflows() {
    return <div>Workflows</div>;
}

export default page;

