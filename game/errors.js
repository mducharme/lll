'use strict'

const errors = {

  invalidGame: {
    code: 'INVALID GAME',
    message: 'The requested game is either invalid, not started or you can not access it.'
  },

  invalidTurn: {
    code: 'INVALID TURN',
    message: 'It is currently not your turn to play a card, or you are currently dead in the current round.'
  },

  invalidCard: {
    code: 'INVALID CARD',
    message: 'You do not possess this card or it is invalid.'
  },

  invalidTarget: {
    code: 'INVALID TARGET',
    message: 'The target player is invalid.'
  },

  protectedTarget: {
    code: 'PROTECTED TARGET',
    message: 'The target player is currently protected.'
  },

  targetRequired: {
    code: 'TARGET REQUIRED',
    message: 'The target is required for this action.'
  },

  // Per action

  attack: {
    invalidGuess: {
      code: 'INVALID GUESS',
      message: 'The attack guess is invalid.'
    },
    illegalGuess: {
      code: 'ILLEGAL GUESS',
      message: 'You can not guess a "1-attack".'
    },
    guessRequired: {
      code: 'GUESS REQUIRED',
      message: 'You must guess a card when attacking a target.'
    }
  },

  spy: {

  },

  challenge: {

  },
  protect: {

  },

  force: {
    discardRequired: {
      code: 'DISCARD REQUIRED',
      message: 'You can not play this card (you must discard your "8-discard").'
    }
  },

  trade: {
    discardRequired: {
      code: 'DISCARD REQUIRED',
      message: 'You can not play this card (you must discard your "8-discard").'
    }
  },

  discard: {

  },

  die: {
    invalidPlay: {
      code: 'INVALID PLAY',
      message: 'You can not play this card: you would die.'
    }
  }

}

export default errors
