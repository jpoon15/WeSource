
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
    table.text('aboutme');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
    table.dropColumn('aboutme');
  })
};
