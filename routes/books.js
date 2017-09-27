'use strict'

const express = require('express')
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router()

// C
router.post('/books', (req, res, next) => {

  knex('books')
  .insert({
    id: req.body.id,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at
   }, 'id')
  .then((items) => {
    if (!req.body.id || !req.body.title || !req.body.author || !req.body.genre || !req.body.description || !req.body.cover_url || !req.body.created_at || !req.body.updated_at) {
      res.sendStatus(400)
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(items[0]))
  })
  .catch((err) => next(err))
})

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
