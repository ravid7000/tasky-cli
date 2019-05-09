const inquirer = require('inquirer')
const _ = require('lodash')
// const log = require('./utils/logger')
const ora = require('ora')
const { login } = require('./utils/api')

const questions = [
    {
        type: 'input',
        name: 'email',
    },
    {
        type: 'password',
        name: 'password',
    },
]

module.exports = async () => {
    const spinner = ora('Logging in...')
    try {
        const answers = await inquirer.prompt(questions)
        spinner.start()
        const response = await login(answers)
        spinner.succeed('Logged in successfully.')
        console.log(response)
    } catch (err) {
        if (err.response) {
            const { data } = err.response
            spinner.fail(_.get(data, 'error'))
        }
    }
}
