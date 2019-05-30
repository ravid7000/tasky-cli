"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assign_1 = __importDefault(require("lodash/assign"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const defaultKey = crypto_1.default.randomBytes(32);
const defaultIv = crypto_1.default.randomBytes(16);
const filePath = './encty.djs';
const getRelativePath = (p) => {
    return path_1.default.join(__dirname, p);
};
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(getRelativePath(file), 'utf8', (err, buffer) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(buffer);
            }
        });
    });
};
const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(getRelativePath(file), data, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
const encrypt = (key, iv, data) => {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return JSON.stringify({ i: iv, d: encrypted.toString('hex') });
};
const decrypt = (key, cipher) => {
    const buffKey = Buffer.from(key, 'hex');
    const iv = Buffer.from(cipher.i, 'hex');
    const encryptedData = Buffer.from(cipher.d, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, buffKey, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
};
exports.getData = async () => {
    try {
        const file = await readFile(filePath);
        if (!file) {
            return {
                key: Buffer.from(defaultKey).toString('hex'),
                i: Buffer.from(defaultIv).toString('hex'),
                d: null,
            };
        }
        const newLineIndex = file.indexOf('\n');
        const key = file.substring(0, newLineIndex);
        const eData = JSON.parse(file.substring(newLineIndex + 1));
        return {
            key,
            i: eData.i,
            d: decrypt(key, eData),
        };
    }
    catch (err) {
        return {
            key: Buffer.from(defaultKey).toString('hex'),
            i: Buffer.from(defaultIv).toString('hex'),
            d: null,
        };
    }
};
exports.setData = async (data) => {
    try {
        const cipher = await exports.getData();
        const dData = assign_1.default({}, cipher.d, data);
        const eData = encrypt(cipher.key, cipher.i, dData);
        await writeFile(filePath, `${cipher.key} \n ${eData}`);
        return true;
    }
    catch (err) {
        return false;
    }
};
const STORAGE = { getData: exports.getData, setData: exports.setData };
exports.default = STORAGE;
