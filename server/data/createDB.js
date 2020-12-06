const connection = {
  host: '127.0.0.1',
  // port: '5433',
  user: 'postgres',
  password: 'root',
};

let knex = require('knex')({
  client: 'pg',
  connection,
});

const jsonFile = require('./pokedex.json');

const keys = [];
const attacks = [];

/**
 * Check if an object is inside an array of object
 * return true if it exists
 * return false if not
 * @param  {Array<Object>} a
 * @param  {Object} b
 * @returns boolean
 */
function isInside(a, b) {
  const c = { ...b };
  if (Object.prototype.hasOwnProperty.call(c, 'id')) {
    delete c.id;
  }
  const cString = JSON.stringify(c);
  for (let i = 0; i < a.length; i += 1) {
    const aString = JSON.stringify(a[i]);
    if (aString === cString) {
      return true;
    }
  }
  return false;
}

function finishProgram() {
  knex.destroy();
  console.log('We have finished to set the database');
  process.exit(0);
}

function createJunction() {
  for (let i = 0; i < jsonFile.length; i += 1) {
    if (jsonFile[i].attaques) {
      for (let j = 0; j < attacks.length; j += 1) {
        if (isInside(jsonFile[i].attaques, attacks[j])) {
          knex.insert({
            pokemons_id: jsonFile[i].id,
            attacks_id: attacks[j].id,
          }).into('poketacks').then(() => {
            if (i + 1 === jsonFile.length && j + 1 === attacks.length) {
              finishProgram();
            }
          });
        }
      }
    }
  }
}

function insertPokemons() {
  for (let i = 0; i < jsonFile.length; i += 1) {
    const temp = {};
    for (let j = 0; j < keys.length; j += 1) {
      if (jsonFile[i][keys[j]]) {
        if (keys[j] !== 'attaques') {
          temp[keys[j]] = jsonFile[i][keys[j]];
        }
      }
    }
    knex.insert(temp).into('pokemons').returning('id').then((id) => {
      [jsonFile[i].id] = id;
      if (i + 1 === jsonFile.length) {
        createJunction();
      }
    });
  }
}

function insertAttacks() {
  for (let i = 0; i < attacks.length; i += 1) {
    knex.insert({
      niveau: attacks[i].niveau,
      nom: attacks[i].nom,
      puissance: attacks[i].puissance,
      precision: attacks[i].precision,
      pp: attacks[i].pp,
    }).into('attacks').returning('id').then((id) => {
      [attacks[i].id] = id;
      if (i + 1 === attacks.length) {
        insertPokemons();
      }
    });
  }
}

function addingPoketacks() {
  knex.schema.hasTable('poketacks').then((exists) => {
    if (!exists) {
      knex.schema.createTable('poketacks', (table) => {
        table.integer('pokemons_id').unsigned();
        table.integer('attacks_id').unsigned();
        table.foreign('pokemons_id').references('pokemons.id');
        table.foreign('attacks_id').references('attacks.id');
        table.primary(['pokemons_id', 'attacks_id']);
      }).then(() => {
        insertAttacks();
      });
    } else {
      insertAttacks();
    }
  });
}

function addingAttacks() {
  knex.schema.hasTable('attacks').then((exists) => {
    if (!exists) {
      knex.schema.createTable('attacks', (table) => {
        table.increments();
        table.string('niveau');
        table.string('nom');
        table.string('puissance');
        table.string('precision');
        table.string('pp');
      }).then(() => {
        addingPoketacks();
      });
    }
  });
}

function addingPokemons() {
  knex.schema.hasTable('pokemons').then((exists) => {
    if (!exists) {
      knex.schema.createTable('pokemons', (table) => {
        table.increments();
        for (let k = 0; k < keys.length; k += 1) {
          table.string(keys[k], 1000);
        }
      }).then(() => {
        addingAttacks();
      });
    } else {
      addingAttacks();
    }
  });
}

for (let i = 0; i < jsonFile.length; i += 1) {
  const temp = Object.keys(jsonFile[i]);
  for (let j = 0; j < temp.length; j += 1) {
    if (keys.indexOf(temp[j]) === -1) {
      keys.push(temp[j]);
    }
  }
  if (jsonFile[i].attaques) {
    for (let k = 0; k < jsonFile[i].attaques.length; k += 1) {
      if (!isInside(attacks, jsonFile[i].attaques[k])) {
        attacks.push({ ...jsonFile[i].attaques[k] });
      }
    }
  }
}

function reconnectDatabase() {
  knex.destroy().then(() => {
    connection.database = 'pokedex';
    knex = require('knex')({
      client: 'pg',
      connection,
    });
    addingPokemons();
  });
}

function createDatabase() {
  knex.raw('CREATE DATABASE pokedex').catch(() => {
    knex.destroy().then(() => {
      console.error('You need to drop the database \'pokedex\' before running this script.');
      process.exit(0);
    });
  }).then(() => {
    reconnectDatabase();
  });
}

createDatabase();
