const settings: Record<typeof ProcessEnvPlatform, any> = {
  development: {
    BASE_URL: 'http://localhost:4000',
    SYSTEM_URL: 'http://localhost:3001',
  },
  production: {
    BASE_URL: 'http://metaverse.sufu.site',
    SYSTEM_URL: 'http://system.sufu.site',
  }
};

export default settings[ProcessEnvPlatform];
