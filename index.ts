#!/usr/bin/env bun
import { Command } from "commander";

const program = new Command();

program
  .name("mylo")
  .description("mylo is an assistant")
  .version("0.0.1");

program
  .command("wakeup")
  .description("show the banner and pick cli and telegram mode")
  .action(async () => {
    console.log("wakeup calling....");
  });

await program.parseAsync(process.argv);