// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: false,
  app: {
    baseURL: '/', // ใช้แค่ '/' สำหรับ Repository ชื่อ username.github.io
    buildAssetsDir: 'assets',
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
