'use strict'

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const router = express.Router()
const JWT_KEY = process.env.JWT_KEY

// JWT authorize


// C


// R


// D


// L
router.get('/favorites', (req, res, next) => {
  jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err) {
      next(boom.create(401, 'Unauthorized'))
      return
    } // else {
    knex('favorites')
      .select(
        'id',
        'book_id AS bookId',
        'user_id AS userId',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      )
      // .orderBy('id', 'ASC')
      .then((items) => {
        // res.status(200)
        res.json(items)
      })
    // }
  })
})





// .catch((err) => {
//   next(err)
// })
// })

module.exports = router
