import { Environment, ExecutionEnvironment } from "@/types/executor";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

chromium.setGraphicsMode = false;

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    environment.setBrowser(browser as any);
    environment.log.info("Browser started successfully");
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page as any);
    environment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
