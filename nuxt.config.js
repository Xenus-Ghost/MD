export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'theme-color',
        content: '#2396FF'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2396FF' },
  /*
   ** Global CSS
   */
  css: [{ src: 'assets/scss/app/_theme.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/globalComponents.js'
    // { src: '~/plugins/VueCoolLightBox.client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    crossDomain: true
  },
  /*
   ** Build configuration
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url:
              'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/logout',
            method: 'post'
          },
          user: {
            url: 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/me',
            method: 'post',
            propertyName: 'data'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: require('autoprefixer')(),
    splitChunks: {
      layouts: true
    },
    extractCSS: true
  }
}
