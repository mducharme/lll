'use strict'

import dotenv from 'dotenv'

import session from 'express-session'
import express from 'express'

import http from 'http'
import { WebSocketServer } from 'ws'

import SetupAPI from './api.js'
import SetupWebSocketServer from './websocket.js'
import SetupHttpServer from './http.js'

// Init .env
dotenv.config()

const clientsMap = new Map()

const port = process.env.PORT || 8484

const sessionParser = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false
})

const app = express()

// Session parser middleware
app.use(sessionParser)

// Frontend (serve static client)
app.use('/', express.static('client'))

// API configuration
SetupAPI(app, clientsMap, sessionParser)

// Websocket
const wss = new WebSocketServer({ clientTracking: false, noServer: true })
SetupWebSocketServer(wss, clientsMap)

// HTTP server
const httpServer = http.createServer(app)
SetupHttpServer(httpServer, wss, port, sessionParser)
