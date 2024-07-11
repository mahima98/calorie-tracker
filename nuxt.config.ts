// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui',  '@nuxtjs/tailwindcss'],
  devtools: { enabled: true }
})