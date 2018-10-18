
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({category: 'Memes'}),
        knex('categories').insert({category: 'Tech'}),
        knex('categories').insert({category: 'Web-desgin'})
      ]);
    });
};
