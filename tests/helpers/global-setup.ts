import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  console.log(`[INFO]: Starting the global setup..`);

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[INFO]: Detecting local runs...`);

    //Delete allure results
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`Deleting allure results in ${resultsDir}`);

    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log("Allure results deleted successfully.");
    }
  }
  console.log(`[INFO]: Completed the global setup..`);
}
