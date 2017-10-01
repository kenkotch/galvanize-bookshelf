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
router.post('/favorites', authorize, (req, res, next) => {
  const newFav = {
    user_id: req.claim.userId,
    book_id: req.body.bookId
  }

  knex('favorites')
    .insert(newFav, '*')
    .where('favorites.user_id', req.claim.userId)
    .andWhere('favorites.book_id', req.query.bookId)
    .then((fav) => {
      delete newFav.created_at
      delete newFav.updated_at
      res.send(camelizeKeys(fav[0]))
    })
})

// R
router.get('/favorites/check', authorize, (req, res, next) => {
  // console.log(req.query)
  knex('favorites')
    // from authorize above
    .where('favorites.user_id', req.claim.userId)
    // query is built in express property
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
router.delete('/favorites', authorize, (req, res, next) => {
  console.log(req.body.bookId)
  knex('favorites')
    .del()
    .where('favorites.user_id', req.claim.userId)
    .andWhere('favorites.book_id', req.body.bookId)
    .then(() => {
      const delObj = {
        user_id: req.claim.userId,
        book_id: req.body.bookId
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.send(camelizeKeys(delObj))
    })
    .catch((err) => {
      next(err)
    })
})

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

module.exports = router
