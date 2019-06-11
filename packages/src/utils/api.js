"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Endpoints_1 = __importDefault(require("../constants/Endpoints"));
const API = {
    login: (data) => axios_1.default({ ...Endpoints_1.default.login, data }).then(r => r.data),
    getProjects: () => axios_1.default({ ...Endpoints_1.default.getProjects }).then(r => r.data),
};
function setAuthHeaders(token) {
    if (token) {
        axios_1.default.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    else {
        delete axios_1.default.defaults.headers.common['Authorization'];
    }
}
exports.setAuthHeaders = setAuthHeaders;
exports.default = API;
