const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    // port: 5433,
    user: 'postgres',
    password: 'root',
    database: 'pokedex',
  },
});

const dbWorker = {};
/**
 * getting all pokemons from database and sending to client
 * @param  {import('express').Response} res
 */
dbWorker.getAll = (res) => {
  knex.select('numéro', 'nom').from('pokemons').orderBy('numéro').then((data) => {
    const response = {};
    response.code = 200;
    response.data = data;
    for (let i = 0; i < response.data.length; i += 1) {
      response.data[i].url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${response.data[i]['numéro']}.png`;
    }
    res.send(response);
  });
};

/**
 * getting the pokemon with the ID in param and send it to client
 * @param  {import('express').Response} res
 * @param  {String} id
 */
dbWorker.getPokemon = (res, id) => {
  knex.select('*').from('pokemons').where('numéro', id).then((data) => {
    const response = {};
    const pokemon = {};
    response.code = 200;
    pokemon.id = data[0]['numéro'];
    pokemon.names = {
      english: data[0].nomen,
      japanese: data[0].nomja,
      french: data[0].nom,
    };
    pokemon.type = data[0].type1;
    pokemon.base = {
      poids: data[0].poids,
      taille: data[0].taille,
    };
    response.data = pokemon;
    res.send(response);
  });
};

module.exports = dbWorker;
