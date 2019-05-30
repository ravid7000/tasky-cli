import axios from 'axios';
import Endpoints from '../constants/Endpoints';

const API = {
  login: (data: object) => axios({ ...Endpoints.login, data }).then(r => r.data),
};

export default API;
