import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHTMLTask } from "../task/PageToHTML";

export async function PageToHTMLExecutor(
  environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Web page");
    console.log("@@WEBSITE URL", websiteUrl);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
