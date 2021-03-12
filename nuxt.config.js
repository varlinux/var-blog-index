if (process.env.NODE_ENV === 'prod') {
  require('custom-env').env('prod')
} else if (process.env.NODE_ENV === 'test') {
  require('custom-env').env('test')
} else {
  require('custom-env').env('dev')
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Var Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@toast-ui/editor/dist/toastui-editor.css', // Editor's Style
    '@toast-ui/editor/dist/toastui-editor-viewer.css', // Editor's Style
    'codemirror/lib/codemirror.css', // Editor's Dependency Style
    '@/assets/style/base.sass'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/route'
    // {
    //   src: '@/plugins/toast-ui',
    //   mode: 'client'
    // },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true, // 开启代理
    credentials: true // 表示跨域请求时是否需要凭证
  },

  proxy: {
    '/api': {
      target: process.env.API_URL || 'http://localhost:3000',
      pathRewrite: {
        changeOrigin: true // 表示是否跨域
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
