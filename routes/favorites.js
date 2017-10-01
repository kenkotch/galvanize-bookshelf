'use strict'

const bcrypt = require('bcrypt')
const boom = require('boom')
const { camelizeKeys, decamelizeKeys } = require('humps')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const express = require('express')
const router = express.Router()
const JWT_KEY = process.env.JWT_KEY

// JWT authorize
const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    req.claim = payload
    next()
  })
}

// C


// R
router.get('/favorites/check', authorize, (req, res, next) => {
  knex('favorites')
    // i dont understand the next 2 lines or why router.get doesnt need /favorites/check/:id
    .where('favorites.user_id', req.claim.userId)
    .andWhere('favorites.book_id', req.query.bookId)
    .then((result) => {
      if (result.length) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
    .catch((err) => {
      next(err)
    })
})


// D


// L
router.get('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .where('favorites.user_id', req.claim.userId)
    .then((items) => {
      const favs = camelizeKeys(items)
      res.send(favs)
    })
})





// .catch((err) => {
//   next(err)
// })
// })

module.exports = router
