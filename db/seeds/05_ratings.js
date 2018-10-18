
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('ratings').insert({rating: 3, resource_id: 1, user_id: 1}),
        knex('ratings').insert({rating: 5, resource_id: 2, user_id: 2}),
        knex('ratings').insert({rating: 2, resource_id: 3, user_id: 3})
      ]);
    });
};
