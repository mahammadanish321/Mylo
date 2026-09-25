import { select, isCancel, log } from "@clack/prompts"
import chalk from "chalk"
import { program } from "commander";
import figlet from "figlet"
import { reduceEachLeadingCommentRange } from "typescript/unstable/ast";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE = chalk.hex('#e8dcf8').bold;




function printBannerWithShadow(ascii: string) {

    const bannerLines = ascii.replace(/\s+$/, '').split('\n');
    const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
    const rowWidth = maxLen + 2;

    for (const line of bannerLines) {
        console.log(SHADOW(('  ' + line).padEnd(rowWidth)));
    }
    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for (const line of bannerLines) {
        console.log(FACE(line.padEnd(rowWidth)));
    }
    console.log();
}




export async function runWakeup() {
    let ascii: string;
    try {
        ascii = figlet.textSync('mylo', { font: BANNER_FONT })
    }
    catch (error) {
        ascii = figlet.textSync('mylo', { font: 'Standard' })
        console.log("BANNER_FORN NOT WORKING !");

    }

    printBannerWithShadow(ascii)


    const mode = await select({
        message:"which mode do you want to proceed with ?",
        options:[
            {value:'cli',label:'CLI'},
            {value:"telegram",label:"Telegram"},
            {value:"exit",label:"Exit"}
        ]
    });

    if (isCancel(mode || mode == 'exit')){
        console.log(chalk.dim("\ngood bye see you soon !\n"));
        return;
    }
    if(mode === "cli"){
        console.log(chalk.dim("Starting cli mode....."))
        await runCliMode();
    }
    else if(mode === "telegram"){
        console.log(chalk.dim("Starting Telegram mode....."))
    }
}