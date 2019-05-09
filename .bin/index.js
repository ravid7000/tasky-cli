#!/usr/bin/env node

const program = require('commander')
const lib = require('../lib')

const VERSION = '0.1.0'

program
    .version(VERSION)
    .option('login', 'Login to Tasky')
    .action(lib.login)
    .parse(process.argv)