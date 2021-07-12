/**
 * @file san config
 * @author lvming <lvming@zztabc.com>
 *
 * 环境变量, scripts/preview.js脚本中定义
 * COM_PAGE: 组件类型默认情况下, 组件路径是src/components; 值为src/pages中有效目录时, 路径为src/pages/$COM_PAGE/components
 * COM_NAME: 组件名称, 默认avatar
 */
const path = require('path');
const { name } = require('./package');
// 静态文件域名
const CDN = 'https://s.bdstatic.com/';

// 生产环境下的静态目录
const STATIC_PRO = 'static/qiankun-san';

const resolve = pathname => path.resolve(__dirname, pathname);

// 这个是 release 目录，打包机器只能支持 output，所以谨慎修改
const outputDir = 'output';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	assetsDir: isProduction ? STATIC_PRO : 'static',
	publicPath: isProduction ? CDN : '/',
	outputDir,
	// 文件名是否 hash
	filenameHashing: isProduction,
	devServer: {
		headers: {
      'Access-Control-Allow-Origin': '*',
    },
		proxy: {
			'/': {
				target: 'http://localhost:8899',
				bypass: () => 'index.html'
			},
		}
	},
	// 这是多页面配置
	pages: {
		// 这里是多页打包配置
		index: {
			entry: './src/main.js',
			template: './pages.template.ejs',
			filename: 'index.html'
		}
	},
	// 默认node_modules的依赖是不过 babel 的
	// 如果依赖是 ESM 版本，要过 babel，请开启这里
	// transpileDependencies:['@baidu/nano'],
	css: {
		sourceMap: isProduction,
		cssPreprocessor: 'less',
		requireModuleExtension: false
	},
	splitChunks: {
		// splitChunks 配置
		// chunks name 如果要在 page 中使用：
		// 如果拆的 chunk 不在 page 中，
		// 那么需要添加 page 的 chunks:[${chunk-name}]
		cacheGroups: {
			vendors: {
				name: 'vendors',
				test: /[\\/]node_modules(?!\/@baidu)[\\/]/,
				// minChunks: 1,
				priority: -10
			}
		}
	},
	alias: {
		'@assets': resolve('src/assets'),
		'@components': resolve('src/components'),
		'@app': resolve('src/lib/App.js')
	},
	loaderOptions: {
		babel: {
			plugins: [
				[
					require.resolve('babel-plugin-import'),
					{
						libraryName: 'santd',
						libraryDirectory: 'es',
						style: true
					}
				]
			]
		}
	},
	chainWebpack: config => {
		// 这里可以用来扩展 webpack 的配置，使用的是 webpack-chain 语法
		config.module.rule('css')
			.test(/\.css$/)
			.oneOf('module')
				.resourceQuery(/module/)
				.use('style-loader').loader('style-loader')
					.end()
				.use('css-loader').loader('css-loader')
					.options({ modules: { localIdentName: '[local]_[hash:base64:5]' }, localsConvention: 'camelCase' })
						.end()
				.end()
			.oneOf('css-normal')
				.use('style-loader').loader('style-loader').end()
				.use('css-loader').loader('css-loader')
		
		// config.module.rule('img')
		//     .test(/\.(png|jpe?g|gif)(\?.*)?$/)
		//     .use('url-loader').loader(require.resolve('url-loader'))
		//     .options({
		//         limit: 1000,
		//         name: STATIC_PRO + '/img/[name].[contenthash:7].[ext]',
		//         publicPath: isProduction ? CDN : ''
		//     });
	},
	configWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
	sourceMap: isProduction
};
