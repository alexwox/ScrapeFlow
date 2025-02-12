import { ExecutionEnvironment } from "@/types/executor";
import { PageToHTMLTask } from "../task/PageToHTML";

export async function PageToHTMLExecutor(
  environment: ExecutionEnvironment<typeof PageToHTMLTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
