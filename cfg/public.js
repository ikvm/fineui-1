"use strict";

let path = require("path");
let webpack = require("webpack");

let baseConfig = require("./base");
let defaultSettings = require("./defaults");

//改一下输出路径,这样 public 时候输出目录就不会和开发目录冲突了
let newConfig=Object.assign({},baseConfig,{
    output: {
        path: path.join(__dirname, '/../public'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    }
})

let config = Object.assign({}, newConfig, {
	entry: path.join(__dirname, "../src/public"),
	cache: false,
	devtool: "sourcemap",
	plugins: [],
	module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: "babel",
	include: [].concat(config.additionalPaths, [path.join(__dirname, "/../src")])
});

module.exports = config;
