"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Endpoints_1 = __importDefault(require("../constants/Endpoints"));
const API = {
    login: (data) => axios_1.default({ ...Endpoints_1.default.login, data }).then(r => r.data),
};
exports.default = API;
