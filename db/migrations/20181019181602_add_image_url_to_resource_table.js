
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
      table.text('imgurl');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('resources', (table) => {
        table.dropColumn('imgurl');
    });
};
