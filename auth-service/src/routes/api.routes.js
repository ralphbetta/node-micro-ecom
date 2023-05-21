const express = require('express');
router = express.Router();

/* ------------------------------- CONTROLLERS ------------------------------------ */
const UserController = require('../controller/user.controller');

/* ------------------------------- REQUEST VALIDATOR ------------------------------ */


/* ------------------------------- TOKEN VALIDATOR -------------------------------- */
const tokenMiddleware  = require('../middleware/jwt.middleware');


/* ------------------------------- ACCOUNT ROUTERS ------------------------------- */
router.get('/auth/get-user', tokenMiddleware.verifyToken, UserController.getAllUsers);
router.post('/auth/register', UserController.createUser);
router.post('/account/login', UserController.login);



module.exports = router;

