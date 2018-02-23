import express from 'express'
import throng from 'throng'
import compressionMiddleware from 'compression'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import historyFallbackMiddleware from 'connect-history-api-fallback'
import helmet from 'helmet'

import webpackConfig from '../webpack.config'
import {DIST_DIR, INDEX_FILE, MAP_ROUTE} from './constants'

// Server-side environment constants
const PORT = process.env.PORT || 5000
const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1

// Start web server process
function start() {

	const app = express()
		.enable('case sensitive routing')
		.enable('strict routing')
		.enable('trust proxy')

	// Use helmet middleware (for simple XSS/clickjacking protection and more)
	app.use(helmet())

	// Use gzip compression middleware
	app.use(compressionMiddleware())

	// Redirect direct index file request to root /
	app.get('/' + INDEX_FILE, (_req, res) => {
		res.redirect('/')
	})

	// Fallback to index file for client-side map routes
	app.get(MAP_ROUTE, historyFallbackMiddleware({
		index: `/${INDEX_FILE}`
	}))

	if (process.env.NODE_ENV !== 'production') {
		setupForDevelopment(app)
	}
	else {
		setupForProduction(app)
	}

	app.listen(PORT, (error?: Error) => {

		if (error) {
			throw error
		}

		// tslint:disable-next-line
		console.info(`Server listening on http://localhost:${PORT}/`)
	})
}

// Setup app for production environment
function setupForProduction(app: express.Application) {

	// Enable static client-side file serving on root /
	app.use('/', express.static(DIST_DIR, {
		index: INDEX_FILE
	}))
}

// Setup app for development environment
function setupForDevelopment(app: express.Application) {

	const config = webpackConfig()
	const publicPath = config.output && config.output.publicPath || ''

	app.use(webpackDevMiddleware(
		webpack(config),
		{
			publicPath,
			index: INDEX_FILE,
			lazy: true,
			stats: 'errors-only'
		}
	))
}

// Spawn required number of web server processes
throng({
	workers: WEB_CONCURRENCY,
	lifetime: Infinity,
	start
})
