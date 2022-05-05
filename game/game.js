'use strict'

import * as uuid from 'uuid'

import standardDeck from './data/standard-deck.js'
import classicDeck from './data/classic-deck.js'
import cards from './data/cards.js'

const games = new Map()

const LoadGame = (gameId) => {
  return games[gameId] ?? null
}

const CreateGame = (numPlayersMax = 4, numPointsMax = 11, mode = 'CLASSIC') => {
  const game = new Game(numPlayersMax, numPointsMax, mode)
  games[game.id] = game
  return games[game.id]
}

class Game {
  constructor (numPlayersMax = 4, numPointsMax = 11, mode = 'CLASSIC') {
    this.id = uuid.v4()
    this.numPlayers = numPlayersMax ?? 4
    this.numPointsMax = numPointsMax ?? 11
    this.players = []
    // this.wsConnections = [];
    this.cards = cards
    this.deck = (mode === 'CLASSIC' ? classicDeck : standardDeck)
    this.status = null
    this.secrets = {
      hands: {},
      stack: [],
      burned: ''
    }
  };

  joinGame = (playerId) => {
    if (!this.players.includes(playerId)) {
      this.players.push(playerId)
      // Start the game if the number of players is reached.
      if (this.players.length >= this.numPlayers) {
        this.start()
      }
    }
  }

  isStarted = () => {
    const i = this.status != null
    return i
  }

  isJoined = (playerId) => {
    return this.players.includes(playerId)
  }

  isTurn = (playerId) => {
    return (this.status.currentPlayer === playerId)
  }

  isDead = (playerId) => {
    return this.status.dead.includes(playerId)
  }

  isProtected = (playerId) => {
    return this.status.protected.includes(playerId)
  }

  hasCard = (playerId, card) => {
    return this.secrets.hands[playerId].includes(card)
  }

  playerHand = (playerId) => {
    return this.secrets.hands[playerId]
  }

  playerCard = (playerId) => {
    if (!this.secrets.hands[playerId]) {
      return null
    }
    return [...this.secrets.hands[playerId]].pop()
  }

  start = () => {
    if (this.isStarted()) {
      return
    }

    // Initialize status
    this.status = {
      score: [],
      currentRound: 0,
      currentTurn: 0,
      currentPlayer: '',
      history: [],
      protected: [],
      dead: []
    }

    // Initialize score.
    for (const player of this.players) {
      this.status.score[player] = 0
    };

    // Initialize round and turn.
    this.nextRound()
  }

  nextRound = () => {
    this.status.currentRound++
    this.status.currentTurn = 0
    this.status.currentPlayer = ''
    this.status.history = []
    this.status.protected = []
    this.status.dead = []

    // Shuffle the deck (copy the deck array and sort it by random)
    this.secrets.stack = [...this.deck].sort(() => (Math.random() - 0.5))

    // Burn 1st card...
    this.secrets.burned = this.secrets.stack.pop()

    // ...and distribute 1 card to each players.
    for (const player of this.players) {
      this.secrets.hands[player] = [this.secrets.stack.pop()]
    };

    // Initialize first turn of the round
    this.nextTurn()
  }

  nextTurn = () => {
    if (this.status.dead.length === this.numPlayersMax - 1) {
      // Game over (only 1 player remaining - the winner).
      // @todo
      return
    }
    if (this.secrets.stack.length === 0) {
      // Game over (no card left). The winner should be the player with the highest score.
      // @todo
      return
    }

    this.status.currentTurn++

    // Give one card from the stack to the player.
    this.status.currentPlayer = this.getNextPlayer(this.currentPlayer)
    this.secrets.hands[this.status.currentPlayer].push(this.secrets.stack.pop())
  }

  getNextPlayer = (currentPlayer) => {
    if (currentPlayer === '') {
      return this.players[Math.floor(Math.random() * this.players.length)]
    } else {
      let i = this.players.indexOf(currentPlayer) + 1
      if (i >= this.players.length) {
        i = 0
      }
      if (this.isDead(this.players[i])) {
        return this.getNextPlayer(this.players[i])
      } else {
        return this.players[i]
      }
    }
  }

  play = (playerId, card, target, guess) => {

    // Put card down (remove from player's hand)
    // this.secrets.hands[playerId].splice(this.secrets.hands[playerId].indexOf(card), 1)

    // Perform the card action

    // Log the play event, both in the public game history and player's private history (with result).

    // Broadcast / add to game history @todo

    // Return the play result, or error.
  }

  discard = (playerId, card) => {
    this.secrets.hands[playerId].splice(this.secrets.hands[playerId].indexOf(card), 1)

    // Broadcast / add to game history @todo
  }

  die = (playerId) => {
    if (this.isDead(playerId)) {
      // Player is already dead error @todo
      return
    }
    const playerHand = this.playerHand(playerId)
    for (const card of playerHand) {
      this.discard(playerId, card)
    }
    this.status.dead.push(playerId)

    // Broadcast / add to game history @todo
  }
};

export default Game
export { Game, CreateGame, LoadGame }
