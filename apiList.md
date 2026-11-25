Skillora - APIs

## AuthRouter

- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionRequestRouter

- POST /request/send/interseted/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## UserRouter

- GET /user/connections
- GET /user/requested
- GET /user/feed
