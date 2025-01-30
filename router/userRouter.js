const { createUser, getUsers, getUser, updateUserPhoneNumber, deleteUser} = require('../controller/userController');
const userRouter = require('express').Router();

userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.post('/user', createUser);
userRouter.put('/user/:id', updateUserPhoneNumber);
userRouter.delete('/user/:id', deleteUser);


module.exports = userRouter;