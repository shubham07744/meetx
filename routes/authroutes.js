const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const {register, login} = require('../controller/authcontroller')

router.post('/register',[body('email').isEmail(), body('password').isLength({min:6})],register)
router.post('/login', login)

module.exports = router;
   