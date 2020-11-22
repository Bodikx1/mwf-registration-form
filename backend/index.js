const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const bcrypt = require('bcryptjs')

const app = express()
const { Router } = require('express')

const mainRouter = Router()

const USERS_TABLE = process.env.USERS_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const serverErrorResponse = { error: 'Internal server error' }

mainRouter.use(bodyParser.json({ strict: false }))

// Get User endpoint
mainRouter.get('/users/:userId', async function (req, res) {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        },
    }

    let user = null
    try {
        user = await dynamoDb.get(params).promise()
    } catch (error) {
        console.log(error)
        res.status(500).json(serverErrorResponse)
    }

    if (user.Item) {
        const { userId, name } = user.Item
        res.json({ userId, name })
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

// Create User endpoint
mainRouter.post('/users', async function (req, res) {
    const { userId, name, password } = req.body

    if (typeof userId !== 'string') {
        res.status(400).json({ error: '"userId" must be a string' })
    } else if (typeof name !== 'string') {
        res.status(400).json({ error: '"name" must be a string' })
    } else if (typeof password !== 'string') {
        res.status(400).json({ error: '"password" must be a string' })
    }

    // check if such user exists already
    const getParams = {
        TableName: USERS_TABLE,
        Key: {
            userId: userId,
        },
    }

    let user = null
    try {
        user = await dynamoDb.get(getParams).promise()
    } catch (error) {
        console.log(error)
        res.status(500).json(serverErrorResponse)
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const putParams = {
        TableName: USERS_TABLE,
        Item: {
            userId: userId,
            name: name,
            password: hashedPassword,
        },
    }

    // put into db if no such user
    if (!user.Item) {
        try {
            await dynamoDb.put(putParams).promise()
        } catch (error) {
            console.log(error)
            res.status(500).json(serverErrorResponse)
        }
        res.json({ userId, name })
    } else {
        res.status(409).json({ error: 'Such user exists already' })
    }
})

app.use('/v1', mainRouter)

module.exports.handler = serverless(app)