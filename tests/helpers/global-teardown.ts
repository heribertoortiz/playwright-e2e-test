import { type FullConfig } from "@playwright/test";
import { exec } from "child_process";

export default async function globalTeardown(config: FullConfig) {
  /*Execute after all workers complete. Good place to clean up tasks*/
  console.log(`[INFO]: Starting the global teardown process..`);

  //generate allure report for local runs

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(
      `[INFO]: Local runs detected - Starting allure report server...`,
    );
    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing allure serve: ${error.message}`);
        return;
      }
    });
  }
  console.log(`[INFO]: Completed the global teardown process..`);
}
