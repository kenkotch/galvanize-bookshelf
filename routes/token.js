'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')

const JWT = process.env.JWT_KEY
const router = express.Router()
require('dotenv').config()

router.get('/token', (req, res, next) => {
  jwt.verify(req.cookies.token, JWT, (err, payload) => {
    if (err) {
      res.status(200)
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

router.post('/token', (req, res, next) => {
// if password
// bcrypt.compare (async)
  // .then(result)
  // if true(200, return obj) set cookie-
  // user = {name: "Bootsy", visits: 0}
  //   }
  //
  //   user.visits++
  //   let token = jwt.sign(user, SECRET);
  //
  //
  //   // set a cookie
  //   res.cookie("token", token)





  // else (400)

  // verified, so create token in cookie   .then - return stuff

})




// require:
//  -dont forget to require the thing you need
//
// router.GET{
//
// //verify the token that is sent from the browser( in a cookie)
// // "request assumes a token was created by the previous POST /token request" - readme.md
// takes 2 params-
//
// if there is an err, no or bad token
// response is false
//
// else if there is a token that is verified
// response is true
// }
//
// router.POST{
//
// // verify the req.body is valid
// is there an email?
// is there a password?
//
// // if the req.body was valid then use the email to find the user in the DB
//
// //verify the user's password is correct, if so...
//
// // create a token that contains the user.id
//
// // set a cookie that contains the token
//
// // send the user's information in the response to the POST
// - do not send back password of the user.
// }
//
// router.DELETE{
//
// delete the cookie
// }






module.exports = router
