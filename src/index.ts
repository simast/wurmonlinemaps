import express from 'express'
import throng from 'throng'
import compressionMiddleware from 'compression'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackConfig from '../webpack.config'
import {STATIC_DIR, INDEX_FILE} from './constants'

// Server-side environment constants
const PORT = process.env.PORT || 5000
const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1

// Start web server process
function start() {

	const app = express()
		.disable('x-powered-by')
		.enable('case sensitive routing')
		.enable('strict routing')
		.enable('trust proxy')

	// Enable gzip compression
	app.use(compressionMiddleware())

	// Redirect direct index file request to root /
	app.get('/' + INDEX_FILE, (_req, res) => {
		res.redirect('/')
	})

	if (process.env.NODE_ENV !== 'production') {
		setupForDevelopment(app)
	}
	else {
		setupForProduction(app)
	}

	app.listen(PORT)
}

// Setup app for production environment
function setupForProduction(app: express.Application) {

	// Enable static client-side file serving on root /
	app.use('/', express.static(STATIC_DIR, {
		index: INDEX_FILE
	}))
}

// Setup app for development environment
function setupForDevelopment(app: express.Application) {

	app.use(webpackDevMiddleware(
		webpack(webpackConfig),
		{
			publicPath: '',
			index: INDEX_FILE,
			lazy: true
		}
	))
}

// Spawn required number of web server processes
throng({
	workers: WEB_CONCURRENCY,
	lifetime: Infinity,
	start
})
