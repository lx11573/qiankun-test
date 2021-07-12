/**
 * @Author lv
 * @Date 2021/6/29 10:37 上午
 */
const chainWebpack = require('./config/chainWebpack')
module.exports = {
	devServer: {
		hot: true,
		hotOnly: true,
		port: 7770,
		open: true,
		headers: {
			'Access-Control-Allow-Origin': "*"
		},
		proxy: {
			'/': {
				target: 'http://localhost:7770',
				bypass() {
						return '/index.html'
				}
			}
		},
	},
	chainWebpack
};
