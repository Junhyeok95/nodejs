const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './index.js',
	output: { filename: './server.js'}, // 배포 할 경우에 package.json, server.js 만 ...
	target: 'node',
	externals: [nodeExternals()]
}
