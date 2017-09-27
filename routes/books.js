'use strict'

const express = require('express')
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router()

// L
router.get('/books', (req, res, next) => {
  knex('books')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .orderBy('title', 'ASC')
    .then((items) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.send(JSON.stringify(items))
    })
    .catch((err) => next(err))
})





module.exports = router
