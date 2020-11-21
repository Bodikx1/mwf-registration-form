const serverless = require('serverless-http')
const express = require('express')
const app = express()
const { Router } = require('express')

const mainRouter = Router()

mainRouter.get('/users', function (req, res) {
    res.send('Hello World!')
})

app.use('/v1', mainRouter)

module.exports.handler = serverless(app)