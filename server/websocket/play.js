'use strict'

import { LoadGame } from './../../game/game.js'
import { ValidateGame, ValidatePlayer, ValidateCard } from './../../game/play.js'

import AttackAction from './../../game/actions/attack.js'
import SpyAction from './../../game/actions/spy.js'
import ChallengeAction from './../../game/actions/challenge.js'
import ProtectAction from './../../game/actions/protect.js'
import ForceAction from './../../game/actions/force.js'
import TradeAction from './../../game/actions/trade.js'
import DiscardAction from './../../game/actions/discard.js'
import DieAction from './../../game/actions/die.js'

function WSPlay (ws, gameId, playerId, card, target = null, guess = null) {
  const game = LoadGame(gameId)

  let err
  err = ValidateGame(game)
  if (err !== true) {
    ws.send(JSON.stringify({ message: 'PLAY', error: err }))
    return
  }
  err = ValidatePlayer(game, playerId)
  if (err !== true) {
    ws.send(JSON.stringify({ message: 'PLAY', error: err }))
    return
  }
  err = ValidateCard(game, playerId, card)
  if (err !== true) {
    ws.send(JSON.stringify({ message: 'PLAY', error: err }))
    return
  }

  const cardInfo = game.cards[card]

  let ret
  switch (cardInfo.action) {
    case 'BONUS':
      break
    case 'ATTACK':
      ret = AttackAction(game, playerId, card, target, guess)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'SPY':
      ret = SpyAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'CHALLENGE':
      ret = ChallengeAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'PROTECT':
      ret = ProtectAction(game, playerId, card)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'FORCE':
      ret = ForceAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'TRADE':
      ret = TradeAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'DISCARD':
      ret = DiscardAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
    case 'DIE':
      ret = DieAction(game, playerId, card, target)
      ws.send(JSON.stringify({ message: 'PLAY', result: ret }))
      break
  }

  // Add play to round's history // @todo wait for results
  game.status.history.push({
    type: 'TURN',
    ret
  }
  )

  console.log('Play return:')
  console.log(ret)

  // if (!ret.error) {
  game.nextTurn()
  // }

  return ret
}

export default WSPlay
