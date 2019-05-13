const assign = require('lodash/assign')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const defaultKey = crypto.randomBytes(32)
const defaultIv = crypto.randomBytes(16)

const filePath = './encty.djs'

const getRelativePath = function(p) {
    return path.join(__dirname, p)
}

const readFile = function(file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(getRelativePath(file), 'utf8', function(err, buffer) {
            if (err) {
                reject(err)
            } else {
                resolve(buffer)
            }
        })
    })
}

const writeFile = function(file, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(getRelativePath(file), data, function(err) {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const encrypt = function(key, iv, data) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
    let encrypted = cipher.update(JSON.stringify(data))
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return JSON.stringify({ i: iv.toString('hex'), d: encrypted.toString('hex') })
}

const decrypt = function(key, cipher) {
    key = Buffer.from(key, 'hex')
    const iv = Buffer.from(cipher.i, 'hex')
    const encryptedData = Buffer.from(cipher.d, 'hex')
    let decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedData)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return JSON.parse(decrypted.toString())
}

const getData = async function() {
    try {
        const file = await readFile(filePath)
        if (!file) {
            return {
                key: Buffer.from(defaultKey).toString('hex'),
                i: Buffer.from(defaultIv).toString('hex'),
                d: null,
            }
        }
        const newLineIndex = file.indexOf('\n')
        const key = file.substring(0, newLineIndex)
        const eData = JSON.parse(file.substring(newLineIndex + 1))
        return {
            key,
            i: eData.i,
            d: decrypt(key, eData),
        }
    } catch (err) {
        console.log(err)
        return {
            key: Buffer.from(defaultKey).toString('hex'),
            i: Buffer.from(defaultIv).toString('hex'),
            d: null,
        }
    }
}

const setData = async function(data) {
    try {
        const cipher = await getData()
        const dData = assign({}, cipher.d, data)
        const eData = encrypt(cipher.key, cipher.i, dData)
        await writeFile(filePath, cipher.key + '\n' + eData)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { getData, setData }
