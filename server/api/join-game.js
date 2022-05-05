'use strict'

import { LoadGame } from './../../game/game.js'

function HandleJoinGame (request, response, clientsMap, sessionParser) {
  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      response.status(401).send({ error: 'Invalid user. Please login.' })
      return
    }

    const gameId = request.params.gameId
    const playerId = request.session.userId

    const game = LoadGame(gameId)

    if (game == null || !game.id || game.id !== gameId) {
      response.status(404).send({ error: 'Invalid game id.' })
      return
    }

    game.joinGame(playerId)

    if (game.status && game.status.secrets) {
      // game.status.round.secrets = '';
    }
    response.send(game)
  })
}

export default HandleJoinGame
