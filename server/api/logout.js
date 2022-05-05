
function HandleLogout (request, response, clientsMap, sessionParser) {
  const ws = clientsMap.get(request.session.userId)

  request.session.destroy(() => {
    if (ws) {
      ws.close()
      clientsMap.destroy(request.session.userId)
    }
    response.send({ message: 'User session destroyed.' })
  })
}

export default HandleLogout
