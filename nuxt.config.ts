// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui',  '@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt','@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      apiAppKeySecret: '44b1e64142c416bff11a4e5aec93cca7',
      apiAppIdSecret: 'dc777e8f',
      apiEndPoint: 'https://api.edamam.com/api/food-database/v2/parser?',
    },
  },
  devtools: { enabled: true }
})