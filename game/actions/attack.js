'use strict'

import errors from '../errors.js'
import results from '../results.js'
import { ValidateTarget } from '../play.js'

function ValidateGuess (guess) {
  if (guess === '1-attack') {
    return errors.attack.illegalGuess
  }
  return true
}

function AttackAction (game, playerId, card, target = null, guess = null) {
  let err

  console.log('Player ' + playerId + ' is attacking ' + target + '. Guess is ' + guess)

  err = ValidateTarget(game, target)
  if (err !== true) {
    return { error: err, validateTarget: false }
  }
  err = ValidateGuess(game, target, guess)
  if (err !== true) {
    return { error: err, validateGuess: false }
  }

  // Remove played card from game status
  game.secrets.hands[playerId].splice(game.secrets.hands[playerId].indexOf(card), 1)

  const action = {
    card,
    target,
    guess
  }

  let result = {}
  if (game.hasCard(target, guess)) {
    game.die(target)
    result = results.attack.success
    result.targetCard = guess
    result.death = target
  } else {
    result = results.attack.failure
  }

  return {
    playerId,
    action,
    result
  }
}

export default AttackAction
