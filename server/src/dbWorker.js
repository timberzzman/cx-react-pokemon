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
dbWorker.getAll = async (res) => {
  const data = await knex.select('numero', 'nom').from('pokemons').orderBy('numero');
  const response = {};
  response.code = 200;
  response.data = data;
  for (let i = 0; i < response.data.length; i += 1) {
    response.data[i].url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${response.data[i].numero}.png`;
  }
  res.send(response);
};

/**
 * getting the pokemon with the ID in param and send it to client
 * @param  {import('express').Response} res
 * @param  {String} id
 */
dbWorker.getPokemon = async (res, id) => {
  const response = {};
  const pokemon = {};
  const data = await knex.select('*').from('pokemons').where('numero', id);
  if (data.length >= 1) {
    response.code = 200;
    pokemon.id = data[0].numero;
    pokemon.names = {
      english: data[0].nomen,
      japanese: data[0].nomja,
      french: data[0].nom,
    };
    pokemon.type = data[0].type1;
    pokemon.img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`;
    pokemon.base = {
      poids: data[0].poids,
      taille: data[0].taille,
    };
    pokemon.attaques = await knex('poketacks').whereIn('pokemons_id', [data[0].id]).join('attacks', 'attacks_id', '=', 'attacks.id').select('*');
    response.data = pokemon;
    res.send(response);
  }
};

/**
 * add a pokemon to the database from the data the client sent
 * send to client the ID of the pokemon generates from the last ID
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
dbWorker.addPokemon = async (req, res) => {
  const pokemon = req.body;
  const response = {};
  let pokeID = '';
  pokemon.type1 = pokemon.type;

  if (pokemon === {}) {
    response.code = 400;
    response.message = 'You send no data';
    res.send(response);
  } else if (!pokemon.nom || !pokemon.type) {
    response.code = 400;
    response.message = 'Name or type is required';
    res.send(response);
  } else {
    const data = await knex.max('numero').from('pokemons');
    pokeID = (parseInt(data[0].max, 10) + 1).toString();
    pokemon.numero = pokeID;
    const id = await knex('pokemons').insert(pokemon).returning('id');
    response.code = 200;
    response.id = id;
    response.message = `pokemon created at ID: ${pokeID}`;
    res.send(response);
  }
};

/**
 * Delete the pokemon with the ID the client sent
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
dbWorker.deletePokemon = async (res, id) => {
  const response = {};
  await knex('poketacks').where('pokemons_id', id).del();
  const data = await knex.select('*').from('pokemons').where('numero', id);
  if (data.length < 1) {
    response.code = 400;
    response.message = 'This pokemon doesn\'t exists';
    res.send(response);
  } else {
    await knex('poketacks').where('pokemons_id', data[0].id).del();
    await knex('pokemons').where('numero', id).del();
    response.code = 200;
    response.message = 'The pokemon is deleted';
    res.send(response);
  }
};

module.exports = dbWorker;
