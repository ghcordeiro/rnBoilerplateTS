import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { navigate } from './navigation';
import Storage from './Storage';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (value: AxiosRequestConfig): AxiosRequestConfig =>
    // console.log('api -> ', `${value.baseURL}${value.url}`);
    value,
  (error: AxiosError) => {
    console.error('API REQUEST ERROR -> ', error);
  },
);

api.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    console.log('RESPONSE - api -> ', JSON.stringify(response.data, null, 4));
    return response;
  },
  (error) => {
    console.error('API ERROR -> ', error);
    console.log(JSON.stringify(error));
    if (error.code === 'ECONNABORTED') {
      NetInfo.addEventListener((a) => {
        console.log('NETINFO -> ', JSON.stringify(a.details));
      });
      navigate('ConnectionError');
      throw new Error('Network Connect aborted!');
    }

    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        `Network Connect Timeout. Waiting for server connection: ${api.defaults.baseURL}`,
      );
    }
    if (error.code === 'ENOTFOUND') {
      throw new Error(`Api Server "${api.defaults.baseURL}" not response!`);
    }

    if (error.code === 'ETIMEDOUT') {
      throw new Error(`Api Server "${api.defaults.baseURL}" timeout!`);
    }
    // console.log('error.response) -> ', JSON.stringify(error.response, null, 4));

    // console.log('error.response.data -> ', JSON.stringify(error.response.data, null, 4));

    if (error.response && error.response.status === 401) {
      if (
        error.response.data
        && error.response.data.message === 'Usuário ou senha inválidos'
      ) {
        delete api.defaults.headers['authorization-produtor'];
        Storage.removeStorage('user');
        navigate('Login');
      } else if (error.response.data) {
        throw error.response.data.message;
      } else {
        throw new Error('Ops');
      }
    }

    return Promise.reject(
      error.response && error.response.data
        ? error.response.data
        : error.request._response,
    );
  },
);

export default api;
