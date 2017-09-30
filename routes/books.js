'use strict'

const express = require('express')
const knex = require('../knex')
const router = express.Router()

// C
router.post('/books', (req, res, next) => {
  knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
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
    .catch((err) => {
      next(err)
    })
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
        res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      // res.send(JSON.stringify(items[0]))
      res.json(items[0])
    })
})

// U
router.patch('/books/:id', (req, res, next) => {
  const id = +req.params.id
  let newObj

  knex('books')
    .update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
    .where('id', id)
    .then((book) => {
      newObj = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.send(newObj)
    })
    .catch((err) => {
      next(err)
    })
})

// D
router.delete('/books/:id', (req, res, next) => {
  const id = req.params.id
  let newObj

  knex('books')
    .del()
    .where('id', id)
    .first()
    .then((book) => {
      newObj = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        coverUrl: book.cover_url
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.send(newObj)
    })
    .catch((err) => {
      next(err)
    })
})


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
      res.json(items)
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router
