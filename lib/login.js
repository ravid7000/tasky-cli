const inquirer = require('inquirer')
const _ = require('lodash')
const log = require('./utils/logger')
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
    try {
        const answers = await inquirer.prompt(questions)
        const response = await login(answers)
        console.log(response)
        log.success('Logged in successfully.')
    } catch (err) {
        if (err.response) {
            const { data } = err.response
            log.error(_.get(data, 'error'))
        }
    }
}
