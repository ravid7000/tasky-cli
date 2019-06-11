"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import inquirer from 'inquirer';
const get_1 = __importDefault(require("lodash/get"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const storage_1 = require("../utils/storage");
const logger_1 = __importDefault(require("../utils/logger"));
const api_1 = __importStar(require("../utils/api"));
const common_1 = require("../utils/common");
const common_2 = require("../constants/common");
const logProjectList = (list) => {
    // tslint:disable-next-line: no-console
    console.log();
    // tslint:disable-next-line: no-console
    console.log(chalk_1.default.green('No. [id] Project Name'));
    // tslint:disable-next-line: no-console
    console.log('------------------------');
    list.forEach((part, idx) => {
        // tslint:disable-next-line: no-console
        console.log(`${idx + 1}. [${part.id}]   ${part.name}`);
    });
    // tslint:disable-next-line: no-console
    console.log();
};
const getProjectList = async () => {
    const data = await storage_1.getData();
    const token = get_1.default(data, common_1.toKey('d', common_2.CURRENT_USER, common_2.AUTH_TOKEN));
    const projects = get_1.default(data, common_1.toKey('d', common_2.PROJECTS));
    if (!common_1.isAuthenticated(data)) {
        return logger_1.default('You must login first.', 'warning');
    }
    if (projects) {
        return logProjectList(projects);
    }
    api_1.setAuthHeaders(token);
    const spinner = ora_1.default('Loading projects...');
    try {
        spinner.start();
        const response = await api_1.default.getProjects();
        spinner.stop();
        logProjectList(response.data);
        await storage_1.setData({ [common_2.PROJECTS]: response.data });
    }
    catch (err) {
        spinner.fail(get_1.default(err, 'message'));
    }
    finally {
        return true;
    }
};
const selectProject = async (id) => {
    const data = await storage_1.getData();
    if (!common_1.isAuthenticated(data)) {
        return logger_1.default('You must login first.', 'warning');
    }
    const projects = get_1.default(data, common_1.toKey('d', common_2.PROJECTS));
    const project = projects.filter((part) => part.id === id);
    if (project.length) {
    }
};
const PROJECT_ = async (cmd) => {
    if (cmd.list) {
        return await getProjectList();
    }
    if (cmd.select) {
        return await selectProject(cmd.select);
    }
};
exports.default = PROJECT_;
