const inquirer = require('inquirer')
const _ = require('lodash')
const ora = require('ora')
const { login } = require('./utils/api')
const { setData } = require('./utils/storage')

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
        setData(response)
        spinner.succeed('Logged in successfully.')
    } catch (err) {
        if (err.response) {
            const { data } = err.response
            spinner.fail(_.get(data, 'error'))
        }
    }
}
