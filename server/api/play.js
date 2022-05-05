'use strict'

function HandlePlay (request, response, clientsMap, sessionParser) {
  response.status(501).send({ error: 'Not implemented.' })
}

export default HandlePlay
