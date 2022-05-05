# LLL

# API

- Login
- Logout
- Create Game
- Join Game


## Login

`POST /api/login`

Parameters:
- username
- password

## Logout

`DELETE /api/logout`

## Create Game

`POST /api/game`

Parameters:
- userToken

## Join Game

`POST /api/game/:gameId/player`

Parameters:
- gameId (from query)
- playerId (from session)

# Web Socket messages

- Game Information
- Player Status
- Play