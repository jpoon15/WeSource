
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: 1, category: 'Memes'}),
        knex('categories').insert({id: 2, category: 'Tech'}),
        knex('categories').insert({id: 3, category: 'Web-desgin'})
      ]);
    });
};
