const chalk = require('chalk')

const info = function(msg) {
    console.log()
    console.log(chalk.blue('    Info'), chalk.blue(msg))
    console.log()
}

const success = function(msg) {
    console.log()
    console.log('    ', chalk.green(msg))
    console.log()
}

const error = function(msg) {
    console.log()
    console.log(chalk.red('    Error:'), chalk.red(msg))
    console.log()
}

module.exports = { error, success, info }
