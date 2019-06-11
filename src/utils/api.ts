import axios from 'axios';
import Endpoints from '../constants/Endpoints';

const API = {
  login: (data: object) => axios({ ...Endpoints.login, data }).then(r => r.data),
  getProjects: () => axios({ ...Endpoints.getProjects }).then(r => r.data),
};

export function setAuthHeaders(token?: string) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default API;
