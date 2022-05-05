'use strict'

import results from '../results.js'

function ProtectAction (game, playerId, card) {
  // Remove card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  game.status.protected.push(playerId)

  return {
    playerId,
    action: {
      card
    },
    result: results.protect.success
  }
}
export default ProtectAction
