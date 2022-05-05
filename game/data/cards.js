'use strict'

const cards = {
  '0-bonus': {
    action: 'BONUS',
    name: 'Bonus',
    value: 0
  },
  '1-attack': {
    action: 'ATTACK',
    value: 1,
    description: 'You can target any player and guess the card they hold. If right, the target is out for the round.',
    notes: 'You can not guess {1}. If no target is available, this is simply discarded.'
  },
  '2-spy': {
    action: 'SPY',
    value: 2,
    description: 'You can see a player card',
    notes: ' If no target is available, this is simply discarded.'
  },
  '3-challenge': {
    action: 'CHALLENGE',
    value: 3,
    description: 'You can challenge a player. The player with the lowest card is out for the round.',
    notes: 'In case of a draw, nothing happens. If no target is available, this is simply discarded.'
  },
  '4-protect': {
    action: 'PROTECT',
    value: 4,
    description: 'When playing this card, no one can target you until your next turn.'
  },
  '5-force': {
    action: 'FORCE',
    value: 5,
    description: 'Force any player to discard a card and pick a new one.',
    notes: 'The discarded card effect is not applied. If no target is available, you (the player) must discard your other card.'
  },
  '6-shuffle': {
    action: 'SHUFFLE',
    value: 6
  },
  '7-trade': {
    action: 'TRADE',
    value: 7,
    description: 'Trade your card with another player.',
    notes: ' If no target is available, this is simply discarded.'
  },
  '8-discard': {
    action: 'DISCARD',
    value: 8,
    description: 'This card MUST be discarded if your other card is a {5} or {7}.',
    notes: 'This card may also be discarded at any time.'
  },
  '9-keep': {
    action: 'DIE',
    value: 9,
    description: 'Playing or discarding this card will kill you.'
  }
}

export default cards
