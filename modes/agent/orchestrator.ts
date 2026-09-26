import chalk from "chalk";
import {isCancel, isCI, text} from "@clack/prompts"
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-taker";
import { ToolExecuter } from "./tool-executor";

export async function runAgentMode(){
    console.log(chalk.bold('\n 🧠 Agent mode\n'));

    const gole = await text({message:"what would you like the agent to do ?", placeholder: "concrete task for the codebase...",});

    if(isCancel(gole) || !gole.trim()) {

        return;
    }
    const config = defaultAgentConfig();
    const tracker = new ActionTracker();
    const executer = new ToolExecuter(tracker, config)
}

// runAgentMode()