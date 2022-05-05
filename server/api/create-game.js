'use strict'

import { CreateGame } from './../../game/game.js'

function HandleCreateGame (request, response, clientsMap, sessionParser) {
  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      response.status(401).send({ error: 'Invalid user. Please login.' })
      return
    }

    const game = CreateGame()
    if (!game) {
      console.log(game)
      response.status(500).send({ error: 'Invalid' })
      return
    }
    game.players = [request.session.userId]
    if (game.status && game.status.round.secrets) {
      // game.status.round.secrets = '';
    }
    response.send(game)
  })
}
export default HandleCreateGame
