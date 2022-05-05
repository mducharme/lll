'use strict'

import { v4 as uuid } from 'uuid'

function HandleLogin (request, response, clientsMap, sessionParser) {
  sessionParser(request, {}, () => {
    const id = request.session.userId ?? uuid()
    request.session.userId = id
    response.send({ userId: id })
  })
}

export default HandleLogin
