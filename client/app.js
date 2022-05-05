(function clientApp () {
  const connectButton = document.querySelector('#connectButton')
  const loginButton = document.querySelector('#login')
  const logoutButton = document.querySelector('#logout')
  const createGameButton = document.querySelector('#createGame')
  const joinGameButton = document.querySelector('#joinGame')
  const reloadButton = document.querySelector('#reloadButton')

  const playerIdInput = document.querySelector('#playerId')
  const gameIdInput = document.querySelector('#gameId')

  const currentRound = document.querySelector('#currentRound')
  const currentTurn = document.querySelector('#currentTurn')
  const currentPlayer = document.querySelector('#currentPlayer')

  const numJoinedPlayers = document.querySelector('#numJoinedPlayers')
  const numPlayers = document.querySelector('#numPlayers')
  const numConnectedPlayers = document.querySelector('#numConnectedPlayers')
  const numConnections = document.querySelector('#numConnections')

  const gameStarted = document.querySelector('#gameStarted')

  const handCard = document.querySelector('#handCard')
  const playerHand = document.querySelector('#playerHand')
  const targetSelect = document.querySelector('#targetSelect')

  const playButton = document.querySelector('#playButton')

  function handleResponse (response) {
    return response.ok
      ? response.json()
      : Promise.reject(new Error('Unexpected response'))
  }

  function UpdateGameStatus (game) {
    gameIdInput.value = game.id

    numJoinedPlayers.innerHTML = game.players.length
    numPlayers.innerHTML = game.numPlayers
    numConnectedPlayers.innerHTML = 0 // todo
    numConnections.innerHTML = game.numPlayers

    if (!game.status) {
      return
    }

    gameStarted.style.display = 'block'

    currentRound.value = game.status.currentRound
    currentTurn.value = game.status.currentTurn
    currentPlayer.value = game.status.currentPlayer

    if (game.status.currentPlayer === playerIdInput.value) {
      document.querySelector('#notPlayerTurn').style.display = 'none'
      document.querySelector('#playerTurn').style.display = 'block'
    } else {
      document.querySelector('#notPlayerTurn').style.display = 'block'
      document.querySelector('#playerTurn').style.display = 'none'
    }

    targetSelect.innerHTML = '<option value="">Select a target player</option>'
    for (const i in game.players) {
      if (game.players[i] != playerIdInput.value) {
        targetSelect.innerHTML += ' <option value="' + game.players[i] + '">' + game.players[i] + '</option>'
      }
    }
  }

  function UpdatePlayerStatus (playerStatus) {
    handCard.value = playerStatus.hand.toString()

    playerHand.innerHTML = 'Card: '
    for (const i in playerStatus.hand) {
      playerHand.innerHTML += '<input type="radio" name="card" value="' + playerStatus.hand[i] + '" /><label>' + playerStatus.hand[i] + '</label>'
    }
  }

  function RetrieveGameInformation (ws) {
    ws.send(JSON.stringify({
      message: 'GAME STATUS',
      gameId: gameIdInput.value,
      playerId: playerIdInput.value
    }))
  }

  function RetrievePlayerStatus (ws) {
    ws.send(JSON.stringify({
      message: 'PLAYER STATUS',
      gameId: gameIdInput.value,
      playerId: playerIdInput.value
    }))
  }

  loginButton.onclick = () => {
    fetch('/api/login', { method: 'POST', credentials: 'same-origin' })
      .then(handleResponse)
      .then((data) => {
        playerIdInput.value = data.userId
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  logoutButton.onclick = () => {
    fetch('/api/logout', { method: 'DELETE', credentials: 'same-origin' })
      .then(handleResponse)
      .then((data) => {
        playerIdInput.value = 'None'
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  createGameButton.onclick = () => {
    fetch('/api/game', { method: 'POST', credentials: 'same-origin' })
      .then(handleResponse)
      .then((data) => {
        UpdateGameStatus(data)
      })
      .then(() => {
        connectButton.click()
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  joinGameButton.onclick = () => {
    fetch('/api/game/' + gameId.value + '/player', { method: 'POST', credentials: 'same-origin' })
      .then(handleResponse)
      .then((data) => {
        UpdateGameStatus(data)
      })
      .then(() => {
        connectButton.click()
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  let ws

  connectButton.onclick = () => {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null
      ws.close()
    }

    connected.checked = true

    ws = new WebSocket(`ws://${location.host}`) // @todo wss://
    ws.onerror = () => {
      console.error(err.message)
    }
    ws.onopen = () => {
      console.log('WebSocket connection established')
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed')
      ws = null
      connected.checked = false
    }
    ws.onmessage = ({ data }) => {
      let jsonData
      try {
        jsonData = JSON.parse(data)
      } catch (err) {
        console.error('Invalid JSON message: ' + err.message + ' (' + message + ')')
      };
      console.log(jsonData)
      switch (jsonData.message) {
        case 'GAME INFORMATION':
        case 'GAME STATUS':
          UpdateGameStatus(jsonData.game)
          RetrievePlayerStatus(ws)
          break
        case 'PLAYER STATUS':
          UpdatePlayerStatus(jsonData.status)
          break
        case 'PLAY':
          console.log(jsonData)
          break
      }
    }
    RetrieveGameInformation(ws)
  }

  reloadButton.onclick = () => {
    RetrieveGameInformation(ws)
  }

  playButton.onclick = () => {
    const cardElement = document.querySelector('input[name="card"]:checked')
    const card = cardElement ? cardElement.value : null
    const targetElement = targetSelect.selectedOptions[0]
    const target = targetElement ? targetElement.value : null
    const guessElement = document.querySelector('input[name="guess"]:checked')
    const guess = guessElement ? guessElement.value : null

    ws.send(JSON.stringify({
      message: 'PLAY',
      gameId: gameIdInput.value,
      playerId: playerIdInput.value,
      card,
      target,
      guess
    }))
  }
})()
