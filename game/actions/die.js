'use strict'

import errors from '../errors.js'

function DieAction (game, playerId, card) {
  return {
    playerId,
    action: {
      card
    },
    result: errors.die.invalidPlay
  }
}

export default DieAction
