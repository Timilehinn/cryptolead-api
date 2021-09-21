const express = require('express');
const user = require('../controllers/User.controller.js')
const verifyJWT = require('../helpers/verifyJWT')

var router = require("express").Router();

router.post('/signup', user.registerUser)
router.post('/auth/signin', user.login)
router.post('/update-profile/:userId', user.updateProfileInfo)
router.post('/add-bankinfo/:userId', user.addBankInfo)
router.post('/remove-bankinfo/:userId', user.removeBankInfo)
router.get('/isuserauth', verifyJWT.verify_for_access, user.isUserAuth)

// router.post('/verify_login_token', verifyJWT.verify_for_login, user.verifyLoginToken)

module.exports = router;
