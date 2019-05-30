const BASE: string = 'https://tasky-me.herokuapp.com/';

const getUrl = (url: string): string => `${BASE}${url}`;

const createConfig = (url: string, method: string) => {
  return {
    method,
    url: getUrl(url),
  };
};

const endpoints = {
  login: createConfig('auth/login/', 'post'),
  register: createConfig('auth/register/', 'post'),
  getProjects: createConfig('api/projects/', 'get'),
  createProject: createConfig('api/project/create/', 'post'),
  getTasks: createConfig('api/:project_id/tasks/', 'get'),
  createTask: createConfig('api/:project_id/task/create/', 'post'),
};

export default endpoints;
