import axios from '@utils/axios';
import env from '@root/env';
import localstorage from './localstorage';
// import cookies from './cookies';

const { BASE_URL, SYSTEM_URL } = env;

interface TypeLoginRes {
  status: number;
  message: string;
  data: {
    account: string;
    avatarUrl: string;
  }
}

/**
 * 使用 sessionId 进行登陆
 * 若 sessionId 不存在, 则跳转至 http://system.sufu.site/login 页面进行登陆
 */
export const login = async () => {
  const { status, data } = await axios<TypeLoginRes>({
    url: `${BASE_URL}/system/login`,
    method: 'post',
  });
  if (status !== 200) {
    setTimeout(() => {
      window.location.href = `${SYSTEM_URL}/login?redirect=${window.location.href}`;
    }, 1000);
    return;
  }
  localstorage.set('user', JSON.stringify(data));
};
