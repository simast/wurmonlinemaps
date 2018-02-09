import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {STATIC_DIR, INDEX_FILE} from './src/constants'

const outputDir = path.resolve(__dirname, STATIC_DIR)

// Webpack build configuration for client-side code distribution
const config: webpack.Configuration = {
	entry: {
		app: './src/client/index.tsx'
	},
	output: {
		path: outputDir,
		filename: '[name].js',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					compilerOptions: {
						outDir: outputDir,
						target: 'es5',
						sourceMap: true,
						// NOTE: Transpiling all client code to native ES modules (and not default
						// CommonJS) to take advantage of webpack's tree shaking support.
						module: 'esnext'
					}
				}
			}
		]
	},
	plugins: getPlugins()
}

function getPlugins(): webpack.Plugin[] {

	const plugins = []

	// Enable module scope hoisting
	plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

	// Generate main HTML file
	plugins.push(new HtmlWebpackPlugin({
		title: 'Wurm Online Maps',
		filename: INDEX_FILE,
		hash: true,
		minify: {
			collapseWhitespace: true
		}
	}))

	// Split all dependencies from node_modules into separate vendors.js chunk
	plugins.push(new webpack.optimize.CommonsChunkPlugin({
		name: 'vendors',
		minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
	}))

	return plugins
}

export default config
