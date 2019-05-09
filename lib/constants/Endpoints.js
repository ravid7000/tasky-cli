const BASE = 'https://tasky-me.herokuapp.com/'

const getUrl = url => `${BASE}${url}`

const createConfig = (url, method) => {
    return {
        method,
        url: getUrl(url),
    }
}

module.exports = {
    login: createConfig('auth/login/', 'post'),
    register: createConfig('auth/register/', 'post'),
    getProjects: createConfig('api/projects/', 'get'),
    createProject: createConfig('api/project/create/', 'post'),
    getTasks: createConfig('api/:project_id/tasks/', 'get'),
    createTask: createConfig('api/:project_id/task/create/', 'post'),
}
