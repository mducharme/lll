'use strict'

const results = {

  attack: {
    success: {
      code: 'ATTACK SUCCESSFULL',
      message: 'Attack successful. {action.target}\'s {action.guess} is killed.',
      targetCard: '{targetCard}',
      death: '{action.target}'
    },
    failure: {
      code: 'ATTACK FAILED',
      message: 'Attack failed. {action.target} was not {action.guess}.'
    },
    impossible: {
      code: 'ATTACK IMPOSSIBLE',
      message: 'There was no available target to attack. "1-attack" discarded.'
    }
  },

  spy: {
    success: {
      code: 'SPY SUCCESSFULL',
      message: 'Spy successful. {action.target}\'s current card is {result.targetCard}.',
      targetCard: '{targetCard}'
    },
    impossible: {
      code: 'SPY IMPOSSIBLE',
      message: 'There was no available target to attack. "2-spy" discarded.'
    }
  },

  challenge: {
    success: {
      code: 'CHALLENGE SUCCESSFULL',
      message: 'Challenge successful. {action.target} has a lower card ({result.targetCard}) than your {result.playerCard}. You killed {action.target}.',
      playerCard: '{playerCard}',
      targetCard: '{targetCard}',
      death: '{action.target}'
    },
    failure: {
      code: 'CHALLENGE FAILED',
      message: 'Challenge failed. {action.target} has a higher card ({result.targetCard}) than your {rresult.playerCard}. You died.',
      playerCard: '{playerCard}',
      targetCard: '{targetCard}',
      death: '{playerId}'
    },
    equals: {
      code: 'CHALLENGE EQUALS',
      message: 'Both cards were {result.card}. Nothing happens.',
      playerCard: '{playerCard}',
      targetCard: '{targetCard}'
    },
    impossible: {
      code: 'CHALLENGE IMPOSSIBLE',
      message: 'There was no available target to attack. "3-challenge" discarded.'
    }
  },

  protect: {
    success: {
      code: 'PROTECT SUCCESSFULL',
      message: 'You are protected until it is your turn to play again.'
    }
  },

  force: {
    killed: {
      code: 'FORCE DISCARD KILLED',
      message: 'The target {action.target} had a "9-keep". The target is killed.',
      targetCard: 'targetCard}',
      death: '{action.target}'
    },
    success: {
      code: 'FORCE DISCARD SUCCESSFULL',
      message: 'Force discard successful. {action.target} has discarded {result.targetCard}.',
      targetCard: 'targetCard}'
    },
    self: {
      code: 'FORCE DISCARD SELF',
      message: 'You have chosen yourself as target. Discarded {result.targetCard}.',
      targetCard: 'targetCard}'
    }
  },

  trade: {
    success: {
      code: 'TRADE SUCCESSFULL',
      message: 'You successfully trade your {result.playerCard} with {action.target}. You received a {result.targetCard}.',
      playerCard: '{playerCard}',
      targetCard: '{targetCard}'
    },
    impossible: {
      code: 'TRADE IMPOSSIBLE',
      message: 'There was no target to trade with. "7-trade"" discarded.'
    }
  },

  discard: {
    forced: {
      code: 'DISCARD FORCED',
      message: 'You discarded your "8-discard" because you had no choice.'
    },
    discarded: {
      code: 'DISCARD DISCARDED',
      message: 'You discarded your "8-discard". (You did not have to.)'
    }
  },

  die: {
    impossible: {
      code: 'DIE IMPOSSIBLE',
      message: 'You can not play this card; you would automatically lose this round.'
    }
  }

}

export default results
