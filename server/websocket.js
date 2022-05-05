'use strict'

import util from 'util'

import WSGameStatus from './websocket/game-status.js'
import WSPlayerStatus from './websocket/player-status.js'
import WSPlay from './websocket/play.js'

function GameInformation (ws, userId, jsonData) {
  console.log('Game information requested (' + jsonData.gameId + ')')
  const game = WSGameStatus(ws, jsonData.gameId, userId)
  console.log(util.inspect(game, false, null, true))
  ws.broadcast(JSON.stringify({ message: 'GAME INFORMATION', game }))
}

function PlayerStatus (ws, userId, jsonData) {
  console.log('Player status requested (' + userId + ')')
  const status = WSPlayerStatus(ws, jsonData.gameId, userId)
  console.log(util.inspect(status, false, null, true))
  ws.send(JSON.stringify({ message: 'PLAYER STATUS', status }))
}

function PlayCard (ws, userId, jsonData) {
  console.log('Playing a card')
  const play = WSPlay(ws, jsonData.gameId, userId, jsonData.card, jsonData.target, jsonData.guess)
  console.log(util.inspect(play, false, null, true))
  ws.send(JSON.stringify({ message: 'PLAY', result: play }))
  const gameStatus = WSGameStatus(ws, jsonData.gameId, userId)
  console.log(util.inspect(play, false, null, true))
  ws.broadcast(JSON.stringify({ message: 'GAME INFORMATION', game: gameStatus }))
}

function SetupWebSocketServer (wss, clientsMap) {
  wss.on('connection', (ws, request) => {
    const userId = request.session.userId

    clientsMap.set(userId, ws)

    ws.broadcast = (data) => {
      clientsMap.forEach((client) => {
        try {
          client.send(data)
        } catch (e) {
          console.error('Broadcast Error' + e.toString())
        }
      })
    }

    ws.on('message', (data, isBinary) => {
      if (isBinary) {
        ws.send(JSON.stringify({ error: 'Binary message are not supported. ' + data }))
        return
      }

      let jsonData
      try {
        jsonData = JSON.parse(data)
      } catch (e) {
        ws.send(JSON.stringify({ error: 'Message not valid JSON. ' + data }))
        return
      }

      switch (jsonData.message) {
        case 'GAME INFORMATION':
        case 'GAME STATUS':
          GameInformation(ws, userId, jsonData)
          break
        case 'PLAYER STATUS':
          PlayerStatus(ws, userId, jsonData)
          break
        case 'PLAY':
          PlayCard(ws, userId, jsonData)
          break
      }
    })

    ws.on('close', () => {
      clientsMap.delete(userId)
    })
  })
}

export default SetupWebSocketServer
