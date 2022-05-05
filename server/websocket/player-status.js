'use strict'

import { LoadGame } from './../../game/game.js'

function WSPlayerStatus (ws, gameId, playerId) {
  const game = LoadGame(gameId)

  if (game == null) {
    return { error: 'Invalid game' }
  }

  if (!game.isJoined(playerId)) {
    return { error: 'Invalid game' }
  }

  if (!game.isStarted()) {
    return { error: 'Game not started.' }
  }

  let hand = []
  for (const i in game.secrets.hands) {
    if (i === playerId) {
      hand = game.secrets.hands[i]
    }
  }

  return {
    hand,
    dead: game.isDead(playerId),
    protected: game.isProtected(playerId)
  }
}

export default WSPlayerStatus
