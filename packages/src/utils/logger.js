"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const logger = (msg, type) => {
    // tslint:disable-next-line: no-console
    console.log();
    if (type === 'error') {
        // tslint:disable-next-line: no-console
        console.log(chalk_1.default.red('    Error:'), chalk_1.default.red(msg));
    }
    if (type === 'success') {
        // tslint:disable-next-line: no-console
        console.log(chalk_1.default.green('    '), chalk_1.default.green(msg));
    }
    if (type === 'warning') {
        // tslint:disable-next-line: no-console
        console.log(chalk_1.default.yellow('    Warning:'), chalk_1.default.yellow(msg));
    }
    // tslint:disable-next-line: no-console
    console.log();
};
exports.default = logger;
