'use strict'

import errors from './errors.js'

function ValidateGame (game) {
  if (!game || !game.id) {
    return errors.invalidGame
  }
  if (!game.isStarted()) {
    return errors.invalidGame
  }

  return true
}

function ValidatePlayer (game, playerId) {
  if (!game.isJoined(playerId)) {
    return errors.invalidGame
  }
  if (!game.isTurn(playerId)) {
    return errors.invalidTurn
  }
  return true
}

function ValidateCard (game, playerId, card) {
  if (!game.hasCard(playerId, card)) {
    return errors.invalidCard
  }
  const cardInfo = game.cards[card]
  if (!cardInfo) {
    return errors.invalidCard
  }
  return true
}

function ValidateTarget (game, target) {
  if (target == null) {
    return errors.targetRequired
  }
  if (!game.isJoined(target)) {
    return errors.invalidTarget
  }
  if (game.isDead(target)) {
    return errors.invalidTarget
  }
  if (game.isProtected(target)) {
    return errors.protectedTarget
  }
  return true
}

export default ValidateGame
export { ValidateGame, ValidatePlayer, ValidateCard, ValidateTarget }
