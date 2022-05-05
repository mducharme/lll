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

function ForceAction (game, playerId, card, target = null) {
  let err

  err = ValidateDiscard(game, playerId)
  if (err !== true) {
    return { error: err, validateDiscard: false }
  }

  err = ValidateTarget(game, target)
  if (err !== true) {
    return { error: err, validateTarget: false }
  }

  // Remove played card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  let result
  const targetCard = game.playerCard(target)
  if (playerId === target) {
    result = results.force.self
  } else {
    if (targetCard === '9-keep') {
      result = results.force.killed
      result.death = target
    } else {
      result = results.force.discard
    }
  }
  game.discard(target, targetCard)

  // Target pick a new card
  game.secrets.hands[target].push(game.secrets.stack.pop())

  result.targetCard = targetCard

  return {
    playerId,
    action: {
      card,
      target
    },
    result
  }
}

export default ForceAction
