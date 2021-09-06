import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const manager = axios.create({
  baseURL: 'https://mobile.maxiconsystems.com.br/management',
  headers: {
    product: 7,
    'Content-Type': 'application/json',
  },
});

manager.interceptors.request.use(
  (value: AxiosRequestConfig): AxiosRequestConfig => {
    // console.info('REQUEST - manager -> ', value);
    return value;
  },
  (error: AxiosError) => {
    console.log('MANAGER REQ -> ', error);
    console.log(JSON.stringify(error));
  },
);

manager.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    console.log(
      'RESPONSE - MANAGER -> ',
      JSON.stringify(response.data, null, 4),
    );
    return response;
  },
  (error) => {
    console.log('API ERROR -> ', error);
    console.log(JSON.stringify(error));
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Network Connect aborted!`);
    }

    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        `Network Connect Timeout. Waiting for server connection: ${manager.defaults.baseURL}`,
      );
    }
    if (error.code === 'ENOTFOUND') {
      throw new Error(`Api Server "${manager.defaults.baseURL}" not response!`);
    }

    if (error.code === 'ETIMEDOUT') {
      throw new Error(`Api Server "${manager.defaults.baseURL}" timeout!`);
    }
    // console.log('error.response) -> ', JSON.stringify(error.response, null, 4));

    // console.log('error.response.data -> ', JSON.stringify(error.response.data, null, 4));

    return Promise.reject(
      error.response && error.response.data
        ? error.response.data
        : error.request._response,
    );
  },
);

export default manager;
