
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({comment_text: 'Funny stuff', created_at: 2018-10-17, resource_id: 1, user_id: 1}),
        knex('comments').insert({comment_text: 'Useful information, thank you', created_at: 2018-05-15, resource_id: 2, user_id: 3}),
        knex('comments').insert({comment_text: 'Well written!', created_at: 2018-03-14, resource_id: 2, user_id: 3})
      ]);
    });
};
