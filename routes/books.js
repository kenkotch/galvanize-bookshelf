'use strict'

const express = require('express')
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router()

// C
router.post('/books', (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl,
  }, '*')
  .then((book) => {
    const newObj = {
      id: book[0].id,
      title: book[0].title,
      author: book[0].author,
      genre: book[0].genre,
      description: book[0].description,
      coverUrl: book[0].cover_url
    }
    res.send(newObj)
  })
  .catch((err) => next(err))
})
// })


// R
router.get('/books/:id', (req, res, next) => {
  const id = req.params.id

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
  .orderBy('id')
  .where('id', id)
  .then((items) => {
    if (items.length < 1) {
      return res.sendStatus(404)
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(items[0]))
  })
})

// U


// D


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
