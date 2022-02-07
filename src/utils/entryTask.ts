import cookies from "./cookies";
import { login } from './request';
import env from '@root/env';

const { SYSTEM_URL } = env;

const auth = async () => {
  const sessionId = cookies.get('sessionId');
  if (!sessionId) {
    window.location.href = `${SYSTEM_URL}/login?redirect=${window.location.href}`;
  }
  await login();
};

const entryTask = () => {
  return Promise.allSettled([auth()]);
};

export default entryTask;
