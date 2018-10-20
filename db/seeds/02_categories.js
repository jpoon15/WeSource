
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('categories').insert({id: 1, category: 'Accessibility'}),
    knex('categories').insert({id: 2, category: 'Animation'}),
    knex('categories').insert({id: 3, category: 'CSS'}),
    knex('categories').insert({id: 4, category: 'HTML'}),
    knex('categories').insert({id: 5, category: 'Inspiration'}),
    knex('categories').insert({id: 6, category: 'Javascript'}),
    knex('categories').insert({id: 7, category: 'Plugins'}),
    knex('categories').insert({id: 8, category: 'UX'}),
    knex('categories').insert({id: 9, category: 'Web Design'})
  ])
  .then(() => {
    return knex.raw("SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id)+1 FROM categories), 1), false);")
  })
  ;
};
