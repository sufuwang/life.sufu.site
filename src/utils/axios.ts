import axios, { AxiosRequestConfig, Axios, AxiosPromise } from 'axios';
import env from '@root/env';
import { message } from 'antd';

const { BASE_URL } = env;

interface TypeHandleMessageArg {
  status: number;
  message: string;
  [key: string]: unknown;
}
interface AxiosInstance<T, K> extends Axios {
  (_config: AxiosRequestConfig<K>): AxiosPromise<T>;
  (_url: string, _config?: AxiosRequestConfig<K>): AxiosPromise<T>;
}

const handleMessage = (data: TypeHandleMessageArg) => {
  const { status = 500, message: msg = '' } = data;
  if (status === 200) {
    message.success(msg);
  } else {
    message.error(msg);
  }
  return data;
};

const resquest = async <T = null, K = null>(config: AxiosRequestConfig<K>): Promise<T> => {
  const Instance: AxiosInstance<T, K> = axios.create({
    baseURL: `${BASE_URL}/life`,
    withCredentials: true,
  });
  Instance.interceptors.response.use(
    (res) => handleMessage(res.data),
    (err) => handleMessage(err.response.data)
  );
  return await Instance.request(config);
};


export default resquest;
