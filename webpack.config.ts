import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'

import {DIST_DIR, INDEX_FILE} from './src/constants'

interface IEnvParams {
	isProduction?: boolean
}

// Webpack build configuration for client-side code distribution
// tslint:disable-next-line no-default-export
export default ({
	isProduction = false
}: IEnvParams = {}): webpack.Configuration => ({
	entry: {
		app: './src/client/index.ts'
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, DIST_DIR),
		filename: '[name].js'
	},
	devtool: isProduction ? false : 'eval-source-map',
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
					compilerOptions: {
						target: 'es5',
						// NOTE: Transpiling all client code to native ES modules (and not default CommonJS)
						// to take advantage of webpack's tree shaking and module scope hoisting support.
						module: 'esnext',
						sourceMap: !isProduction
					}
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
						loader: 'css-loader',
						options: {
							url: false
						}
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
	plugins: getPlugins(isProduction)
})

// Build a list of webpack plugins
function getPlugins(isProduction: boolean): webpack.Plugin[] {

	const plugins = []

	// Generate main HTML file
	plugins.push(new HtmlWebpackPlugin({
		title: 'Wurm Online Maps',
		filename: INDEX_FILE,
		minify: isProduction && {
			collapseWhitespace: true
		}
	}))

	// Extract all CSS styles to a separate style.css file
	plugins.push(new ExtractTextWebpackPlugin({
		filename: 'style.css',
		disable: !isProduction
	}))

	// Skip other plugins in non-production mode
	if (!isProduction) {
		return plugins
	}

	// Enable module scope hoisting
	plugins.push(new webpack.optimize.ModuleConcatenationPlugin())

	// Inline "process.env.NODE_ENV" checks for dead code elimination in production builds
	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}))

	// Minify with dead code elimination
	plugins.push(new webpack.optimize.UglifyJsPlugin())

	// Add chunk banner comments
	plugins.push(new webpack.BannerPlugin(
		[
			'[file]',
			process.env.HEROKU_RELEASE_VERSION,
			process.env.HEROKU_RELEASE_CREATED_AT
		].filter(Boolean).join(' ')
	))

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
