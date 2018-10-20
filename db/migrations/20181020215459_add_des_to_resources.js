
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.dropColumn('description');
  })
};
