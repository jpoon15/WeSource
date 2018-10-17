
exports.up = function(knex, Promise) {
   return knex.schema.createTable('comments', function (table) {
    table.increments('id');
    table.text('comment_text');
    table.date('created_at')
    table.integer('resource_id');
    table.integer('user_id');
    table.foreign('resource_id').references('id').inTable('resources');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
