import assign from 'lodash/assign';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const defaultKey = crypto.randomBytes(32);
const defaultIv = crypto.randomBytes(16);

const filePath = './encty.djs';

const getRelativePath = (p: string): string => {
  return path.join(__dirname, p);
};

const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(getRelativePath(file), 'utf8', (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

const writeFile = (file: string, data: object | string | null): Promise<{}> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(getRelativePath(file), data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const encrypt = (key: string, iv: string, data: any) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return JSON.stringify({ i: iv, d: encrypted.toString('hex') });
};

const decrypt = (key: string, cipher: { i: string, d: string }) => {
  const buffKey = Buffer.from(key, 'hex');
  const iv = Buffer.from(cipher.i, 'hex');
  const encryptedData = Buffer.from(cipher.d, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, buffKey, iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
};

export const getData = async (): Promise<{
  key: string;
  i: string;
  d: object | null;
}> => {
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
  } catch (err) {
    return {
      key: Buffer.from(defaultKey).toString('hex'),
      i: Buffer.from(defaultIv).toString('hex'),
      d: null,
    };
  }
};

export const setData = async (data: object) => {
  try {
    const cipher = await getData();
    const dData = assign({}, cipher.d, data);
    const eData = encrypt(cipher.key, cipher.i, dData);
    await writeFile(filePath, `${cipher.key} \n ${eData}`);
    return true;
  } catch (err) {
    return false;
  }
};

const STORAGE = { getData, setData };
export default STORAGE;
