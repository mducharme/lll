'use strict'

function SetupHttpServer (httpServer, wss, port, sessionParser) {
  httpServer.on('upgrade', (request, socket, head) => {
    sessionParser(request, {}, () => {
      if (!request.session.userId) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    })
  })

  httpServer.listen(port, () => {
    console.log('Server is listening on ' + port)
  })
}

export default SetupHttpServer
