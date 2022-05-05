'use strict'

import HandleLogin from './api/login.js'
import HandleLogout from './api/logout.js'
import HandleCreateGame from './api/create-game.js'
import HandleJoinGame from './api/join-game.js'
import HandleGameStatus from './api/game-status.js'
import HandlePlayerStatus from './api/player-status.js'
import HandlePlay from './api/play.js'

function SetupAPI (app, clientsMap, sessionParser) {
  // Login
  app.post('/api/login', (request, response) => {
    HandleLogin(request, response, clientsMap, sessionParser)
  })

  // Logout
  app.delete('/api/logout', (request, response) => {
    HandleLogout(request, response, clientsMap, sessionParser)
  })

  // Create game
  app.post('/api/game', (request, response) => {
    HandleCreateGame(request, response, clientsMap, sessionParser)
  })

  // Join game
  app.post('/api/game/:gameId/player', (request, response) => {
    HandleJoinGame(request, response, clientsMap, sessionParser)
  })

  // Game status
  app.get('/api/game/:gameId', (request, response) => {
    HandleGameStatus(request, response, clientsMap, sessionParser)
  })

  // Player status
  app.get('/api/game/:gameId/player', (request, response) => {
    HandlePlayerStatus(request, response, clientsMap, sessionParser)
  })

  // Play a card
  app.post('/api/game/:gameId/play', (request, response) => {
    HandlePlay(request, response, clientsMap, sessionParser)
  })
}

export default SetupAPI
