import fs from 'node:fs';
import path from 'node:path';
import { homedir } from 'node:os';
import {spawnSync} from 'node:child_process';
import type {AgentConfig, ActionLog} from './types';
import { ActionTracker } from './action-taker';


const TEXT_EXT = new Set([
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mjs',
    '.json',
    '.md',
    '.mdx',
    '.css',
    '.html',
    '.yml',
    '.yaml',
    '.toml',
    '.txt',
]);


function isProbablyTextFile(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return TEXT_EXT.has(ext) || ext === '';
}


export class ToolExecuter{
// 1:22:33 <----- here 

    constructor(
        private readonly tracker:ActionTracker,
        private readonly config:AgentConfig,
    ){}
}