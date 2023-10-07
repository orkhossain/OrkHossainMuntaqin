module.exports = {
    env: {
      node: true,
    },
    extends: [
      '@nuxt/eslint-config',
      'plugin:vue/vue3-recommended',
    ],
    rules: {
        'vue/multi-word-component-names': 0,
    }
  }