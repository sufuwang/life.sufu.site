const cookies = {
  getObj: () => Object.fromEntries(document.cookie.split('; ').map(k => k.split('='))),
  get: (key?: string) => {
    const cookies = document.cookie;
    if (!key) {
      return cookies;
    }
    const cookiesObj = Object.fromEntries(cookies.split('; ').map(k => k.split('=')));
    return cookiesObj[key] || '';
  },
  del: (key: string) => {
    document.cookie = `${key}=;`;
  }
};

export default cookies;
