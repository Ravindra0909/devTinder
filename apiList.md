# DEVTINDER

## authRouter
- POST/signup
- POST/login
- POST/logout

## profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/change-password
- DELETE/profile/delete

## connectionRequestRouter
- POST/request/send/:status/:userId     //interested
- POST/request/send/:status/:userId     //ignored

- POST/request/review/:status/:requestId   //accepted
- POST/request/review/:status/:requestId   //rejected

## userRouter
- GET/users/feed
- GET/users/connections
- GET/user/request/recieved



Status : ignored, interested, accepted, rejected

