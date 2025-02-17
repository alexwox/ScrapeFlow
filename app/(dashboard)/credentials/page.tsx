import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldIcon } from "lucide-react";
import React from "react";

function CredentialsPage() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div>
        <div>
          <h1>Credentials</h1>
          <p>Manage your credentials</p>
        </div>
      </div>
      <div className="">
        <Alert>
          <ShieldIcon className="h-4 w-4 stroke-primary" />
          <AlertTitle className="text-primary">Encryption</AlertTitle>
          <AlertDescription>
            All information is securley encrypted, ensuring your data remains
            safe
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default CredentialsPage;
