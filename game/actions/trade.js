'use strict'

import errors from '../errors.js'
import results from '../results.js'
import { ValidateTarget } from '../play.js'

function ValidateDiscard (game, playerId) {
  if (game.hasCard(playerId, '8-discard')) {
    return { error: errors.force.discardRequired }
  }
  return true
}

function TradeAction (game, playerId, card, target = null) {
  let err

  err = ValidateDiscard(game, playerId)
  if (err !== true) {
    return { error: err, validateDiscard: false }
  }

  err = ValidateTarget(game, target)
  if (err !== true) {
    return { error: err, validateTarget: false }
  }

  // Remove card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  const playerCard = game.secrets.hands[playerId].pop()
  const targetCard = game.secrets.hands[target].pop()

  game.secrets.hands[target].push(playerCard)
  game.secrets.hands[playerId].push(targetCard)

  const result = results.trade.success
  result.targetCard = targetCard
  result.playerCard = playerCard

  return {
    playerId,
    action: {
      card,
      target
    },
    result
  }
}

export default TradeAction
