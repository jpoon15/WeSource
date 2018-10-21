
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.text('delete');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.dropColumn('delete');
  })
};
