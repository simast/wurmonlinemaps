import express from 'express'
import throng from 'throng'

// Constants
const PORT = process.env.PORT || 5000
const WEB_CONCURRENCY = process.env.WEB_CONCURRENCY || 1
const NODE_ENV = process.env.NODE_ENV || 'development'

// Start web server process
function start() {

	const app = express()
		.disable('x-powered-by')
		.enable('case sensitive routing')
		.enable('strict routing')
		.enable('trust proxy')
		.set('env', NODE_ENV)

	app.get('/', (req, res) => {
		res.send('req.ips: ' + JSON.stringify(req.ips))
	})

	app.listen(PORT)
}

// Spawn required number of web server processes
throng({
	workers: WEB_CONCURRENCY,
	lifetime: Infinity,
	start
})
