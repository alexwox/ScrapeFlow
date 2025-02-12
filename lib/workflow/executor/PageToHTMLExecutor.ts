import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function PageToHTMLExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    console.log("@@WEBSITE URL", websiteUrl);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
