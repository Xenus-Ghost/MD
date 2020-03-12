const isDev = process.env.NODE_ENV !== 'production'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  ...(!isDev && {
    modern: 'client'
  }),
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Монтаж Демонтаж',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Монтаж Демонтаж'
      },
      {
        name: 'theme-color',
        content: '#2161BC'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2396FF' },
  // loading: false,
  /*
   ** Global CSS
   */
  css: [{ src: 'assets/scss/app/_theme.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/globalComponents.js', '~plugins/auth.js'],
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
    '@nuxtjs/auth',
    '@nuxtjs/component-cache',
    'nuxt-vuex-router-sync',
    ['@nuxtjs/localtunnel', { subdomain: 'md' }],
    [
      'nuxt-imagemin',
      {
        optipng: { optimizationLevel: 5 },
        gifsicle: { optimizationLevel: 2 },
        svgo: { optimizationLevel: 2 },
        jpegtran: { progressive: true }
      }
    ],
    'nuxt-trailingslash-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: `https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/`,
    crossDomain: true
  },
  /*
   PWA
   */
  pwa: {
    manifest: {
      crossorigin: 'use-credentials',
      lang: 'ru'
    }
  },
  workbox: {
    cachingExtensions: '@/plugins/workbox-range-request.js'
  },
  /*
   ** Build configuration
   */
  auth: {
    strategies: {
      local: {
        refreshToken: {
          property: 'authorization', // change to your refresh token property
          url: 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/refresh'
        },
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
          },
          refresh: {
            url:
              'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/auth/refresh'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  /* filenames: {
    app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
    chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
    css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css'),
    img: ({ isDev }) =>
      isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) =>
      isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) =>
      isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }, */
  ...(!isDev && {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  }),
  splitChunks: {
    layouts: true,
    // pages: true,
    commons: true
  },
  optimization: {
    minimize: !isDev
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: require('autoprefixer')(),
    // splitChunks: {
    //   layouts: true
    // },
    extractCSS: true
  },
  cache: true,
  router: {
    extendRoutes(routes, resolve) {
      // routes.splice(
      //   0,
      //   routes.length,
      //   ...routes.map((route) => {
      //     return { ...route, component: resolve(__dirname, route.component) }
      //   })
      // )
    }
  }
}
