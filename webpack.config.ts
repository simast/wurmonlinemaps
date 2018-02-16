import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

import {STATIC_DIR, INDEX_FILE} from './src/constants'

// TypeScript compiler option overrides for client-side code
const tsCompilerOptions = {
	target: 'es5',
	// NOTE: Transpiling all client code to native ES modules (and not default CommonJS)
	// to take advantage of webpack's tree shaking and module scope hoisting support.
	module: 'esnext',
	sourceMap: true
}

// Webpack build configuration for client-side code distribution
const config: webpack.Configuration = {
	entry: {
		app: './src/client/index.ts'
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, STATIC_DIR),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			// Load app TypeScript .ts and .tsx files
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					compilerOptions: tsCompilerOptions
				}
			},
			// Load all asset files as base64 data URLs
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader'
			},
			// Load .css files from third-party dependencies
			{
				test: /\.css$/,
				include: /node_modules/,
				use: ExtractTextWebpackPlugin.extract({
					use: {
						loader: 'css-loader'
					},
					fallback: 'style-loader'
				})
			},
			// Load app .less files
			{
				test: /\.less$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								camelCase: 'only'
							}
						},
						{
							loader: 'less-loader'
						}
					]
				})
			}
		]
	},
	plugins: getPlugins()
}

// Build a list of webpack plugins
function getPlugins(): webpack.Plugin[] {

	const plugins = []

	// Enable module scope hoisting
	plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

	// Inline "process.env.NODE_ENV" checks for dead code elimination in production builds
	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}))

	// Minify with dead code elimination
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true
	}))

	// Generate main HTML file
	plugins.push(new HtmlWebpackPlugin({
		title: 'Wurm Online Maps',
		filename: INDEX_FILE,
		minify: {
			collapseWhitespace: true
		}
	}))

	// Add chunk banner comments
	plugins.push(new webpack.BannerPlugin(
		[
			'[file]',
			process.env.HEROKU_RELEASE_VERSION,
			process.env.HEROKU_RELEASE_CREATED_AT
		].filter(Boolean).join(' ')
	))

	// Extract all CSS styles to a separate style.css file
	plugins.push(new ExtractTextWebpackPlugin('style.css'))

	// Minify CSS files
	plugins.push(new OptimizeCssAssetsWebpackPlugin({
		cssProcessorOptions: {
			discardComments: {
				removeAll: true
			}
		}
	}))

	return plugins
}

export default config
