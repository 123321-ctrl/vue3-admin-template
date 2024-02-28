import { defineConfig, loadEnv, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import legacyPlugin from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'
// import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import compression from 'vite-plugin-compression'

// UI按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // 获取对应环境所在文件位置
  const env = loadEnv(mode, process.cwd())

  // 判断当前是否为测试环境，注意构建命令要使用 vite build --mode test
  const isTest = mode === 'test'
  console.log('env', env, isTest, mode, command)
  return {
    plugins: [
      vue(),
      // UI按需引入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve', //保证在开发阶段可以使用mock接口
      }),
      visualizer({
        open: true,
      }),
      legacyPlugin({
        targets: ['defaults', 'ie >= 11', 'chrome 52'], // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
        renderLegacyChunks: true,
      }),
      compression({
        algorithm: 'gzip', // 指定压缩算法为gzip,[ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz', // 指定压缩后的文件扩展名为.gz
        threshold: 10240, // 仅对文件大小大于threshold的文件进行压缩，默认为10KB
        deleteOriginFile: false, // 是否删除原始文件，默认为false
        filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件的正则表达式，默认为匹配.js、.css、.json、.html、.ico和.svg文件
        compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
        verbose: true, //是否在控制台输出压缩结果
        disable: false, //是否禁用插件
      }),
      importToCDN({
        prodUrl: 'https://unpkg.com/{name}@{path}', //覆盖全局 prodUrl，允许您指定特定模块的 CDN 位置
        modules: [
          autoComplete('vue'), // vue2 use autoComplete('vue2')
          autoComplete('axios'),
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: '4.2.2',
          },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: '2.3.6',
            css: '2.3.6/dist/index.css',
          },
          {
            name: 'pinia',
            var: 'Pinia',
            path: '2.1.3',
          },
          {
            name: 'lodash',
            var: 'lodash',
            path: '4.17.21',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    // scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        [env.VITE_APP_BASE_API_DEV]: {
          target: env.VITE_SERVE2,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/a/, ''),
        },
        [env.VITE_APP_BASE_API_DEV1]: {
          target: env.VITE_SERVE3,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/b/, ''),
        },
        ['/echarts']: {
          target: 'https://liyoro.github.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/echarts/, ''),
        },
      },
    },
    build: {
      cache: true,
      minify: 'terser', // 启用 terser 压缩
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          experimentalMinChunkSize: 20 * 1024, // 单位b
          // 最小化拆分包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 通过拆分包的方式将所有来自node_modules的模块打包到单独的chunk中
              // return id
              //   .toString()
              //   .split('node_modules/')[1]
              //   .split('/')[0]
              //   .toString()
              return 'vendor'
            }
          },
        },
        //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
        external: ['vue', 'element-plus', 'echarts'],
      },
    },
  }
})
