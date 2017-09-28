'use strict'

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/users', (req, res, next) => {
  let thePassword = req.body.password

  bcrypt.hash(thePassword, 12)
  .then((result) => {
  return knex('users')
  .insert({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    hashed_password: result
  }, '*')
  .then((user) => {
    const newObj = {
      id: user[0].id,
      firstName: user[0].first_name,
      lastName: user[0].last_name,
      email: user[0].email,
      // hashedPassword: user[0].hashed_password
    }
    res.send(newObj)
  })
  .catch((err) => next(err))
})
})

module.exports = router
