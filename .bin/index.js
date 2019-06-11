#!/usr/bin/env node

const program = require('commander')
const lib = require('../packages/src')

const VERSION = '0.1.0'

program
    .version(VERSION, '-v, --version')
    .usage('[command, [option]] ')

program
    .command('login')
    .alias('l')
    .description('Login to Tasky')
    .action(lib.login)

program
    .command('project')
    .alias('p')
    .option('-l, --list [value]', 'View projects list')
    .description('View projects list or create project')
    .action(lib.projects)

program.parse(process.argv)
