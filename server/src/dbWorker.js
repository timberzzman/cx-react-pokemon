const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'Pokedex',
  },
});

knex.schema.createTable('attack', (table) => {
  table.increments();
  table.string('Niveau');
  table.string('Nom');
  table.string('Puissance');
  table.string('Precision');
  table.string('PP');
});
