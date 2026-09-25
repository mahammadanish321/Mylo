import chalk from 'chalk';
import { select, isCancel } from "@clack/prompts"


export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: 'chooose cli sub-mode',
            options: [
                { value: "agent", label: "Agent mode" },
                { value: "plan", label: "plain mode" },
                { value: "ask", label: "ask mode" },
                { value: "back", label: "<-Backe to main manu" },
            ],
        })

        if (isCancel(mode) || mode === "back") {
            return
        }
        else if (mode == "agent") {
            console.log('agen mode is on....');
            
        }
        else if (mode == "ask") {
            console.log('asking mode is on....');
        }
        else if (mode == "plan") {
            console.log('planing mode is on....');
        }
        if (mode !== 'agent' && mode !== 'ask' && mode !== 'plan') {
            console.log(chalk.yellow('\n That mode is not implemented yet.\n'));
        }
    }
}