interface TypeUrl {
  BASE_URL: string
  SYSTEM_URL: string
}
const settings: Record<typeof ProcessEnvPlatform, TypeUrl> = {
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
