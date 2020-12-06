const express = require('express');
const dbWorker = require('./dbWorker');

const router = express.Router();

// GET ROUTES

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/pokemons', (req, res) => {
  dbWorker.getAll(res);
});

router.get('/pokemons/:id', (req, res) => {
  dbWorker.getPokemon(res, req.params.id);
});

router.get('/*', (req, res) => {
  res.sendStatus(404);
});

// POST ROUTES

router.post('/pokemons', (req, res) => {
  dbWorker.addPokemon(req, res);
});

router.post('/*', (req, res) => {
  res.sendStatus(404);
});

// DELETE ROUTES

router.delete('/pokemons/:id', (req, res) => {
  dbWorker.deletePokemon(res, req.params.id);
});

router.delete('/*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
