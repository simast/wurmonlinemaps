import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {STATIC_DIR, INDEX_FILE} from './src/constants'

const outputDir = path.resolve(__dirname, STATIC_DIR)

// Webpack build configuration for client-side code distribution
const config: webpack.Configuration = {
	entry: './src/client/index.tsx',
	output: {
		path: outputDir,
		filename: 'bundle.js'
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
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			title: 'Wurm Online Maps',
			filename: INDEX_FILE,
			hash: true,
			minify: {
				collapseWhitespace: true
			}
		})
	]
}

export default config
