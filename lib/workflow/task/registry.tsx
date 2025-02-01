import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHTML } from "./PageToHTML";
import { TaskType } from "@/types/task";

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTML,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
