import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    const headless = !(process.env.NEXT_PUBLIC_DEV_MODE === "true");
    const browser = await puppeteer.launch({
      headless: headless,
    });
    environment.setBrowser(browser);
    environment.log.info("Browser started successfully");
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
