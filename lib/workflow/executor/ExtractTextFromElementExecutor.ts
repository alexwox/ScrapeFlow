import { ExecutionEnvironment } from "@/types/executor";
import { PageToHTMLTask } from "../task/PageToHTML";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }
    const html = environment.getInput("HTML");
    if (!html) {
      environment.log.error("Html not defined");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error(`No elements found matching selector: ${selector}`);
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Element has no text content");
      return false;
    }

    return true;
  } catch (error: any) {
    environment.log.error(`Error in extraction: ${error.message}`);
    return false;
  }
}
