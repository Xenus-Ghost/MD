import { BACKEND_API_URL, BACKEND_URL } from './constants'
console.log(BACKEND_API_URL)
const isDev = process.env.NODE_ENV !== 'production'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  ...(!isDev && {
    modern: 'client',
  }),
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: 'Монтаж Демонтаж',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Монтаж Демонтаж',
      },
      {
        name: 'theme-color',
        content: '#2161BC',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/',
      },
    ],
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
    '@nuxtjs/eslint-module',
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
    // ['@nuxtjs/localtunnel', { subdomain: 'md' }],
    [
      'nuxt-imagemin',
      {
        optipng: { optimizationLevel: 5 },
        gifsicle: { optimizationLevel: 2 },
        svgo: { optimizationLevel: 2 },
        jpegtran: { progressive: true },
      },
    ],
    'nuxt-trailingslash-module',
    // ['@nuxtjs/proxy'],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: BACKEND_API_URL,
    // crossDomain: true,
    // proxy: true,
    // proxyHeaders: false,
    credentials: false,
    // proxy: {
    //   '/api/': 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/',
    //   '^/api/': 'https://admin.xn--80aaledd0beefeg0ch.xn--p1ai/api/',
    // },
  },
  /* proxy: {
    '/api/': {
      changeOrigin: true,
      // localAddress: '127.0.0.1',
      // protocolRewrite: 'https',
      target: `${BACKEND_URL}api/`,
      // ws: false,
    },
  }, */
  /*
   PWA
   */
  pwa: {
    manifest: {
      crossorigin: 'use-credentials',
      lang: 'ru',
    },
    workbox: {
      cachingExtensions: '@/plugins/workbox-range-request.js',
    },
    config: {
      debug: true,
      dev: true,
    },
  },
  /*
   ** Build configuration
   */
  auth: {
    strategies: {
      local: {
        refreshToken: {
          property: 'authorization', // change to your refresh token property
          url: `${BACKEND_API_URL}auth/refresh`,
        },
        endpoints: {
          login: {
            url: `${BACKEND_API_URL}auth/login`,
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: `${BACKEND_API_URL}auth/logout`,
            method: 'post',
          },
          user: {
            url: `${BACKEND_API_URL}auth/me`,
            method: 'post',
            propertyName: 'data',
          },
          refresh: {
            url: `${BACKEND_API_URL}auth/refresh`,
          },
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
    },
  },
  optimization: {
    minimize: !isDev,
    runtimeChunk: true,
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: !!isDev,
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
      }
    },
    cssSourceMap: !!isDev,
    postcss: require('autoprefixer')(),
    // splitChunks: {
    //   layouts: true
    // },
    splitChunks: {
      layouts: true,
      pages: false,
      commons: true,
    },
    extractCSS: {
      ignoreOrder: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
    },
    vendor: ['axios'],
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
          useShortDoctype: true,
        },
      },
    }),
    parallel: true,
  },
  cache: true,
  router: {
    routeNameSplitter: '/',
    // trailingSlash: false,
    /* extendRoutes(routes, resolve) {
     routes.splice(
       0,
       routes.length,
       ...routes.map((route) => {
         return { ...route, component: resolve(__dirname, route.component) }
       })
     )
     }, */
  },
}
