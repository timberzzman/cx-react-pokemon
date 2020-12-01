/* const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
    },
  });
  knex.raw('create database Pokedex')
*/
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'Pokedex',
  },
});

const jsonFile = require('../data/pokedex.json');

const keys = [];
const attacks = [];

for (let i = 0; i < jsonFile.length; i += 1) {
  const temp = Object.keys(jsonFile[i]);
  for (let j = 0; j < temp.length; j += 1) {
    if (keys.indexOf(temp[j]) === -1) {
      keys.push(temp[j]);
    }
  }
  if (jsonFile[i].attaques) {
    for (let k = 0; k < jsonFile[i].attaques.length; k += 1) {
      if (attacks.indexOf(jsonFile[i].attaques[k]) === -1) {
        attacks.push(jsonFile[i].attaques[k]);
      }
    }
  }
}

console.log(attacks);

knex.schema.hasTable('pokemons').then((exists) => {
  if (!exists) {
    knex.schema.createTable('pokemons', (table) => {
      table.increments();
      for (let k = 0; k < keys.length; k += 1) {
        table.string(keys[k]);
      }
    }).then((message) => {
      console.log('Import successfully', message);
    });
  } else {
    knex.schema.table('pokemons', (table) => {
      for (let k = 0; k < keys.length; k += 1) {
        table.string(keys[k]);
      }
    });
    console.error('table is already exists');
  }
});

knex.schema.hasTable('attack').then((exists) => {
  if (!exists) {
    knex.schema.createTable('attack', (table) => {
      table.increments();
      table.string('niveau');
      table.string('nom');
      table.string('puissance');
      table.string('precision');
      table.string('pp');
    }).then((message) => {
      console.log('Import successfully', message);
      process.exit(0);
    });
  } else {
    knex.schema.table('attack', (table) => {
    });
    console.error('table is already exists');
    process.exit(0);
  }
});
