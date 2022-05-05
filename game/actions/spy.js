'use strict'

import results from '../results.js'
import { ValidateTarget } from '../play.js'

function SpyAction (game, playerId, card, target = null) {
  const err = ValidateTarget(game, target)
  if (err !== true) {
    return { error: err, validateTarget: false }
  }

  // Remove card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  const result = results.spy.success
  result.targetCard = game.playerCard(target)

  return {
    playerId,
    action: {
      card,
      target
    },
    result
  }
}

export default SpyAction
