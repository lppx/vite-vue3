import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { Modal, message } from 'ant-design-vue';
import store from '@/store/index';
interface ApiRequestOptions extends AxiosRequestConfig {
  reqName?: string;
  headers?: { [key: string]: any };
  data?: any;
}

const defaultAxiosOptions: AxiosRequestConfig = {
  // baseURL: "http://cadre.myclub2.cn",
  timeout: 1000 * 60 * 5,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  maxContentLength: 1024 * 1024 * 20,
  method: 'GET',
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
};

const apiAxios = axios.create(defaultAxiosOptions);
apiAxios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      const time = new Date().getTime();
      if (config.params) {
        config.params = Object.assign(config.params, { t: time });
      } else {
        config.params = { t: time };
      }
    }
    let token = store.getters['user/getToken'];
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    // Handle request error here
    // Promise.reject(error);
  }
);

// respone 拦截器
apiAxios.interceptors.response.use(
  response => {
    if (response.status === 401) {
      Modal.confirm({
        content: '您的登录凭证已经过期，请重新登录',
        title: '重新登录',
        okText: '重新登录',
        cancelText: '取消',
        onOk: () => {
          store.dispatch('user/LogOut');
          location.href = '/';
        },
      });
    }
    if (response.status !== 200) {
      message.error(`错误，code=${response.status}.${response.statusText ? response.statusText : response.data}`);
      throw new Error(response.statusText || response.data);
    }
    if (!response.data.success) {
      message.error(response.data.msg);
      throw new Error('网络请求成功但结果不符合预期');
    }
    return response;
  },
  error => {
    console.log('respone 拦截器 err:', error.response);
    if (error.response) {
      let msg = `status=${error.response.status}: ${error.response.statusText}`;
      switch (error.response.status) {
        case 401:
          Modal.confirm({
            content: '您的登录凭证已经过期，请重新登录',
            title: '重新登录',
            okText: '重新登录',
            cancelText: '取消',
            onOk: () => {
              store.dispatch('user/LogOut');
              location.href = '/';
            },
          });

          break;
        default:
          message.error(msg);
      }
    } else {
      Modal.confirm({ content: `错误:response=${error}`, title: '错误' });
    }
    return Promise.reject(error);
  }
);

async function apiRequest<R>(reqOptions: ApiRequestOptions): Promise<R> {
  const options = Object.assign(defaultAxiosOptions, reqOptions);

  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await apiAxios(reqOptions);
      resolve({ data: res.data.data, statusCode: res.status, message: res.data.msg, success: res.data.success });
    } catch (error) {
      reject(error);
    }
  });

  return promise as Promise<R>;
  // return apiAxios( reqOptions ) as any as Promise<R>;
}

async function apiSendAsync<R>(method: string, url: string, data: any, params: any): Promise<R> {
  const options = Object.assign(defaultAxiosOptions, {
    url,
    method,
    data: JSON.stringify(data),
    params,
  });

  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await apiAxios(options);
      resolve({ data: res.data.data, statusCode: res.status, message: res.data.msg, success: res.data.success });
    } catch (error) {
      reject(error);
    }
  });
  return promise as Promise<R>;
}
export default apiRequest;
export { apiRequest, ApiRequestOptions, apiSendAsync };
