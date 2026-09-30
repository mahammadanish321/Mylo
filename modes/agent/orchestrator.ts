import chalk from "chalk";
import {isCancel, isCI, text} from "@clack/prompts"
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-taker";
import { ToolExecuter } from "./tool-executor";
import { createAgentTools } from "./agent-tools";
import { stepCountIs, ToolLoopAgent } from "ai";
import { getTouchingToken } from "typescript/unstable/ast";
import { getAgentModel} from "../../ai";

export async function runAgentMode(){
    console.log(chalk.bold('\n 🧠 Agent mode\n'));

    const gole = await text({message:"what would you like the agent to do ?", placeholder: "concrete task for the codebase...",});

    if(isCancel(gole) || !gole.trim()) {

        return;
    }
    const config = defaultAgentConfig();
    const tracker = new ActionTracker();
    const executer = new ToolExecuter(tracker, config);
    const tools = createAgentTools(executer);

    const agent = new ToolLoopAgent({
        model:getAgentModel(),
        stopWhen:stepCountIs(40)
    })
}

// runAgentMode()