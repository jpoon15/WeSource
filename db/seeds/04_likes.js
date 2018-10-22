
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('likes').insert({resource_id: 1, user_id: 3}),
    knex('likes').insert({resource_id: 2, user_id: 2}),
    knex('likes').insert({resource_id: 3, user_id: 1}),
  ]);
};
