import chalk from "chalk";
import { isCancel, isCI, text } from "@clack/prompts"
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-taker";
import { ToolExecuter } from "./tool-executor";
import { createAgentTools } from "./agent-tools";
import { stepCountIs, ToolLoopAgent } from "ai";
import { getTouchingToken } from "typescript/unstable/ast";
import { getAgentModel } from "../../ai";
import { log } from "node:console";
import { renderTerminalMarkdown } from "../../tui/terminal-md";
import { runApprovalFlow } from "./approval";

export async function runAgentMode() {
    console.log(chalk.bold('\n 🧠 Agent mode\n'));

    const gole = await text({ message: "what would you like the agent to do ?", placeholder: "concrete task for the codebase...", });

    if (isCancel(gole) || !gole.trim()) {

        return;
    }
    const config = defaultAgentConfig();
    const tracker = new ActionTracker();
    const executer = new ToolExecuter(tracker, config);
    const tools = createAgentTools(executer);

    const agent = new ToolLoopAgent({
        model: getAgentModel(),
        stopWhen: stepCountIs(40),
        instructions: [
            `Workspace root: ${config.codebasePath}`,
            "All mutations are staged until approval.",
        ].join("\n"),
        tools,
    })

    const result = await agent.generate({
        prompt: gole.trim(),
        onStepFinish: ({ toolCalls }) => {
            for (const tc of toolCalls) {
                const preview = JSON.stringify(tc.input).slice(0, 160);
                console.log(
                    chalk.green('✓'),
                    chalk.bold(String(tc.toolName)),
                    chalk.dim(preview + (preview.length >= 160 ? "..." : ""))
                );

            }
        }
    });

    if (result.text?.trim()) console.log(renderTerminalMarkdown(result.text.trim()));

    const ok = await runApprovalFlow(tracker);
    if(!ok) return executer.clearStaging();

    const {errors} = executer.applyApprovedFromTracker();

    if(errors.length){
        console.log(chalk.red(`\n  ${errors.length} errors occured while applying approved changes:\n`));
    }else{
        console.log(chalk.green('\n Applied.\n'));
    }

    executer.clearStaging();

}

// runAgentMode()