
exports.up = function(knex, Promise) {
   return knex.schema.createTable('ratings', function (table) {
    table.increments('id');
    table.integer('rating')
    table.integer('resource_id');
    table.integer('user_id');
    table.foreign('resource_id').references('id').inTable('resources');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
