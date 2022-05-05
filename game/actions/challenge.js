'use strict'

import results from '../results.js'
import { ValidateTarget } from '../play.js'

function ChallengeAction (game, playerId, card, target = null) {
  const err = ValidateTarget(game, target)
  if (err !== true) {
    return { error: err, validateTarget: false }
  }

  // Remove played card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  const playerCard = game.playerCard(playerId)
  const playerCardInfo = game.cards[playerCard]
  const targetCard = game.playerCard(target)
  const targetCardInfo = game.cards[targetCard]

  console.log(playerCardInfo)
  console.log(targetCardInfo)

  let result
  if (playerCardInfo.value === targetCardInfo.value) {
    result = results.challenge.equals
  } else if (playerCardInfo.value > targetCardInfo.value) {
    result = results.challenge.success
    result.death = target
    game.die(targetCard)
  } else if (playerCardInfo.value < targetCardInfo.value) {
    result = results.challenge.failure
    result.death = playerId
    game.die(playerId)
  }

  result.playerCard = playerCard
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

export default ChallengeAction
