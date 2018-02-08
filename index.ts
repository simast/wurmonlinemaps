import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()
	.disable('x-powered-by')

app.get('/', (req, res) => {
	res.send('NODE_ENV: ' + process.env.NODE_ENV)
})

app.listen(PORT)
