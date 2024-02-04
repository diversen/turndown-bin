#!/usr/bin/env node

import TurndownService from 'turndown'
import fs from 'fs'
import minimist from 'minimist-mini'
import { exit } from 'process';

const opts = [];
opts.boolean = ['help'];
opts.string = ['in'];
opts.string = ['out'];
opts.string = ['config'];
opts.alias = { h: 'help', i: 'in', o: 'out', c: 'config' };
 
const m = minimist(opts);

if (m.get('help')) {
    m.helpMessage();
    exit(0);
}

// Check if 'in' and 'out' are provided
if (!m.get('in') || !m.get('out')) {
    console.log('Please provide input and output file names. Use --help for help.');
    exit(1);
}

// check if config is set and if it exists
let config = {};
try {
    if (m.get('config')) {
        config = JSON.parse(fs.readFileSync(m.get('config'), 'utf8'));
    }
} catch (e) {
    console.log('Error:', e);
    exit(1);
}


// Try and read and convert the file
try {
    const html = fs.readFileSync(m.get('in'), 'utf8');
    const turndownService = new TurndownService(config);
    const markdown = turndownService.turndown(html);
    fs.writeFileSync(m.get('out'), markdown, 'utf8');
    exit(0);
} catch (e) {
    console.log('Error:', e);
    exit(1);
}
