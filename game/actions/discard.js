'use strict'

import results from '../results.js'

function DiscardAction (game, playerId, card) {
  // Remove card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  let result
  const playerCard = game.playerCard(playerId)
  if (playerCard === '5-force' || playerCard === '7-trade') {
    result = results.discard.forced
  } else {
    result = results.discard.discarded
  }

  return {
    playerId,
    action: {
      card
    },
    result
  }
}

export default DiscardAction
