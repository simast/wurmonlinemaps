import webpack from 'webpack'
import path from 'path'

const outputDir = path.resolve(__dirname, 'dist')

// Webpack build configuration for client-side code distribution
const config: webpack.Configuration = {
	entry: './src/client/index.ts',
	output: {
		path: outputDir,
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx']
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
		new webpack.optimize.ModuleConcatenationPlugin()
	]
}

export default config
