import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import Topbar from "../../_components/topbar/Topbar";
import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { waitFor } from "@/lib/helper/waitFor";

export default function ExecutionsPage({
  params,
}: {
  params: {
    workflowId: string;
  };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="List of all your workflow runs"
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTable workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionsTable({ workflowId }: { workflowId: string }) {
  const execusions = await GetWorkflowExecutions(workflowId);
  if (!execusions) {
    <div className="">No data</div>;
  }

  if (execusions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="">
          <div className="">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
        </div>
      </div>
    );
  }

  return <pre> {JSON.stringify(execusions, null, 4)}</pre>;
}
