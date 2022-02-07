const _localStorage = {
  get: (key: string) => {
    const value = localStorage[key];
    if (/^{.*}$/.test(value)) {
      return JSON.parse(value);
    }
    return value;
  },
  set: <T>(key: string, value: T extends undefined ? unknown : T) => {
    localStorage[key] = value;
  }
};

export default _localStorage;
