
exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.string('link');
    table.integer('category_id');
    table.integer('user_id');
    table.foreign('category_id').references('id').inTable('categories');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resources');
};
