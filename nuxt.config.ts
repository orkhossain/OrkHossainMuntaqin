// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
    modules: [
      '@nuxtjs/i18n',
      '@nuxtjs/eslint-module',
      '@nuxt/devtools',
    ],
  
})
