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

// Help message
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

async function fetchFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.log('Error fetching data: ', error);
        exit(1);
    }
}


// Get HTML source
async function getHTMLSource() {
    let htmlSource;

    // If URL is provided, download the file
    if (m.get('in').startsWith('http')) {
        htmlSource = await fetchFile(m.get('in'));
    } else {
        htmlSource = fs.readFileSync(m.get('in'), 'utf8');
    }
    return htmlSource;
}

// Convert
try {
    const html = await getHTMLSource();
    const turndownService = new TurndownService(config);
    const markdown = turndownService.turndown(html);
    fs.writeFileSync(m.get('out'), markdown, 'utf8');
    exit(0);
} catch (e) {
    console.log('Error:', e);
    exit(1);
}
