"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const ora_1 = __importDefault(require("ora"));
const get_1 = __importDefault(require("lodash/get"));
const api_1 = __importDefault(require("../utils/api"));
const storage_1 = require("../utils/storage");
const inputQuestion = {
    type: 'input',
    name: 'email',
};
const inputPassword = {
    type: 'password',
    name: 'password',
};
const QUESTIONS = [
    inputQuestion,
    inputPassword,
];
const LOGIN = async () => {
    const SPINNER = ora_1.default('Logging in...');
    try {
        const answers = await inquirer_1.default.prompt(QUESTIONS);
        SPINNER.start();
        const response = await api_1.default.login(answers);
        await storage_1.setData(response.data);
        SPINNER.succeed('Logged in successfully.');
    }
    catch (err) {
        if (err.response) {
            const { data } = err.response;
            SPINNER.fail(get_1.default(data, 'error'));
        }
    }
};
exports.default = LOGIN;
