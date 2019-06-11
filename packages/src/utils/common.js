"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
function isAuthenticated(data) {
    return get_1.default(data, 'd.user.token', '') !== '';
}
exports.isAuthenticated = isAuthenticated;
function toKey(...rest) {
    return rest.join('.');
}
exports.toKey = toKey;
