const _path = require('path');

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: `${__dirname}/dist`,
		filename: "main.js"
	},
	resolve: {
		extensions: [".js"],
		modules: [
			_path.resolve('./node_modules')
		]
	}
};
