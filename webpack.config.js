module.exports = {
    devtool: 'source-map',
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'app.js'
	}
};
