'use strict'

import { LoadGame } from './../../game/game.js'

function WSGameStatus (ws, gameId, playerId) {
  const game = LoadGame(gameId)
  if (game == null) {
    ws.send(JSON.stringify({ message: 'GAME INFORMATION', error: 'Invalid game ID.' }))
    return { error: 'Invalid game' }
  }
  if (!game.isJoined(playerId)) {
    ws.send(JSON.stringify({ message: 'GAME INFORMATION', error: 'Invalid game.' }))
    return { error: 'Invalid game' }
  }

  return game
}

export default WSGameStatus
