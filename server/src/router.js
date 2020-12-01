const express = require('express');

const router = express.Router();

// GET ROUTES

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/pokemons', (req, res) => {
  res.sendStatus(200);
});

router.get('/pokemons/:id', (req, res) => {
  res.sendStatus(200);
});

router.get('/*', (req, res) => {
  res.sendStatus(404);
});

// POST ROUTES

router.post('/pokemons', (req, res) => {
  res.sendStatus(200);
});

router.post('/*', (req, res) => {
  res.sendStatus(404);
});

// DELETE ROUTES

router.delete('/pokemons/:id', (req, res) => {
  res.sendStatus(200);
});

router.delete('/*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
