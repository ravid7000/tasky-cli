const axios = require('axios')
const API = require('../constants/Endpoints')

module.exports = {
    login: data => axios({ ...API.login, data }).then(r => r.data),
}
